const { EventHubProducerClient } = require('@azure/event-hubs');
const { sendProgress } = require('../utils/sendProgress');
const connectionString = process.env.EVENT_HUB_CONNECTION_STRING;
const eventHubName = process.env.EVENT_HUB_NAME;

exports.sendSingle = async (req, res) => {
  const message = req.body;
  if (!message) return res.status(400).send({ error: 'Missing JSON body in request' });

  try {
    const producer = new EventHubProducerClient(connectionString, eventHubName);
    const batch = await producer.createBatch();
    if (!batch.tryAdd({ body: message })) {
      return res.status(400).send({ error: 'Message too large to fit in batch' });
    }

    await producer.sendBatch(batch);
    await producer.close();
    console.log('Message sent:', message);
    res.status(200).send({ status: 'Message sent successfully' });
  } catch (err) {
    console.error('Error sending message:', err);
    res.status(500).send({ error: 'Failed to send message' });
  }
};

exports.sendBulk = async (req, res) => {
  const TOTAL_MESSAGES = parseInt(req.query.count) || 100_000;
  const MESSAGES_PER_BATCH = 500;
  const PARALLEL_BATCHES = 50;

  const producer = new EventHubProducerClient(connectionString, eventHubName);
  let currentId = 1;

  sendProgress.isRunning = true;
  sendProgress.totalMessages = TOTAL_MESSAGES;
  sendProgress.sentMessages = 0;
  sendProgress.startTime = new Date().toISOString();
  sendProgress.lastUpdated = new Date().toISOString();

  console.time('🔁 Bulk Send Time');

  try {
    async function sendBatch(startId, count) {
      let batch = await producer.createBatch({
        partitionKey: `user-${startId % 6}`,
      });

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

        if (!batch.tryAdd(event)) {
          await producer.sendBatch(batch);
          batch = await producer.createBatch({ partitionKey: event.partitionKey });
          batch.tryAdd(event);
        }

        sendProgress.sentMessages++;
        sendProgress.lastUpdated = new Date().toISOString();
      }

      if (batch.count > 0) await producer.sendBatch(batch);
    }

    while (currentId <= TOTAL_MESSAGES) {
      const tasks = [];
      for (let i = 0; i < PARALLEL_BATCHES && currentId <= TOTAL_MESSAGES; i++) {
        const count = Math.min(MESSAGES_PER_BATCH, TOTAL_MESSAGES - currentId + 1);
        tasks.push(sendBatch(currentId, count));
        currentId += count;
      }
      await Promise.all(tasks);
    }

    await producer.close();
    console.timeEnd('🔁 Bulk Send Time');

    sendProgress.isRunning = false;
    sendProgress.endTime = new Date().toISOString();
    sendProgress.durationSeconds =
      (new Date(sendProgress.endTime) - new Date(sendProgress.startTime)) / 1000;

    res.status(200).send({
      status: '✅ Bulk message send completed',
      totalMessages: TOTAL_MESSAGES,
      durationSeconds: sendProgress.durationSeconds,
    });
  } catch (err) {
    console.error('❌ Error in bulk send:', err);
    sendProgress.isRunning = false;
    res.status(500).send({ error: 'Failed to send bulk messages' });
  }
};
