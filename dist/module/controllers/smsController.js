"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const event_hubs_1 = require("@azure/event-hubs");
const sendProgress_1 = require("../../utils/sendProgress");
const connectionString = process.env.EVENT_HUB_CONNECTION_STRING || '';
const eventHubName = process.env.EVENT_HUB_NAME || '';
if (!connectionString || !eventHubName) {
    throw new Error('Missing EVENT_HUB_CONNECTION_STRING or EVENT_HUB_NAME in environment variables.');
}
class SmsController {
    static async sendSingle(req, res) {
        const message = req.body;
        if (!message) {
            res.status(400).send({ error: 'Missing JSON body in request' });
            return;
        }
        try {
            const producer = new event_hubs_1.EventHubProducerClient(connectionString, eventHubName);
            const batch = await producer.createBatch();
            if (!batch.tryAdd({ body: message })) {
                res.status(400).send({ error: 'Message too large to fit in batch' });
                return;
            }
            await producer.sendBatch(batch);
            await producer.close();
            console.log('Message sent:', message);
            res.status(200).send({ status: 'Message sent successfully' });
        }
        catch (err) {
            console.error('Error sending message:', err);
            res.status(500).send({ error: 'Failed to send message' });
        }
    }
    static async sendBulk(req, res) {
        const TOTAL_MESSAGES = parseInt(req.query.count) || 100000;
        const PARALLEL_BATCHES = 50;
        const MESSAGES_PER_BATCH = 500;
        const producer = new event_hubs_1.EventHubProducerClient(connectionString, eventHubName);
        let currentId = 1;
        sendProgress_1.sendProgress.isRunning = true;
        sendProgress_1.sendProgress.totalMessages = TOTAL_MESSAGES;
        sendProgress_1.sendProgress.sentMessages = 0;
        sendProgress_1.sendProgress.startTime = new Date().toISOString();
        sendProgress_1.sendProgress.lastUpdated = new Date().toISOString();
        console.time('🔁 Bulk Send Time');
        try {
            async function sendDynamicBatch(startId, count) {
                let batch = await producer.createBatch();
                for (let i = 0; i < count; i++) {
                    const id = startId + i;
                    const event = {
                        body: {
                            id,
                            user: `user-${id}`,
                            action: 'bulk_send',
                            timestamp: new Date().toISOString(),
                        },
                        partitionKey: `user-${id % 6}`,
                    };
                    console.log("✅ Events in batch 1:", batch.count);
                    if (!batch.tryAdd(event)) {
                        console.log("✅ Events in batch 2:", batch.count);
                        await producer.sendBatch(batch);
                        batch = await producer.createBatch({ partitionKey: event.partitionKey });
                        batch.tryAdd(event);
                    }
                    sendProgress_1.sendProgress.sentMessages++;
                    sendProgress_1.sendProgress.lastUpdated = new Date().toISOString();
                }
                if (batch.count > 0) {
                    await producer.sendBatch(batch);
                }
            }
            while (currentId <= TOTAL_MESSAGES) {
                const tasks = [];
                for (let i = 0; i < PARALLEL_BATCHES && currentId <= TOTAL_MESSAGES; i++) {
                    const remaining = TOTAL_MESSAGES - currentId + 1;
                    const messagesInThisChunk = Math.min(MESSAGES_PER_BATCH, remaining);
                    tasks.push(sendDynamicBatch(currentId, messagesInThisChunk));
                    currentId += messagesInThisChunk;
                }
                await Promise.all(tasks);
            }
            await producer.close();
            console.timeEnd('🔁 Bulk Send Time');
            sendProgress_1.sendProgress.isRunning = false;
            sendProgress_1.sendProgress.endTime = new Date().toISOString();
            sendProgress_1.sendProgress.durationSeconds =
                (new Date(sendProgress_1.sendProgress.endTime).getTime() - new Date(sendProgress_1.sendProgress.startTime).getTime()) / 1000;
            res.status(200).send({
                status: '✅ Bulk message send completed',
                totalMessages: TOTAL_MESSAGES,
                durationSeconds: sendProgress_1.sendProgress.durationSeconds,
            });
        }
        catch (err) {
            console.error('❌ Error in bulk send:', err);
            sendProgress_1.sendProgress.isRunning = false;
            res.status(500).send({ error: 'Failed to send bulk messages' });
        }
    }
}
exports.default = SmsController;
