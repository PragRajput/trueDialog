// require('dotenv').config();
// const express = require('express');
// const { EventHubProducerClient } = require('@azure/event-hubs');

// const connectionString = process.env.EVENT_HUB_CONNECTION_STRING;
// const eventHubName = process.env.EVENT_HUB_NAME;

// app.use(express.json());

// let sendProgress = {
//   isRunning: false,
//   totalMessages: 0,
//   sentMessages: 0,
//   startTime: null,
//   endTime: null,
//   durationSeconds: null,
//   lastUpdated: null,
// };


// app.get('/', (req, res) => {
//   res.send('✅ Azure Event Hub Test Server is running.');
// });

// // Live status updates via SSE
// app.get('/status-stream', (req, res) => {
//   res.set({
//     'Content-Type': 'text/event-stream',
//     'Cache-Control': 'no-cache',
//     Connection: 'keep-alive',
//   });
//   res.flushHeaders();

//   const intervalId = setInterval(() => {
//     res.write(`data: ${JSON.stringify(sendProgress)}\n\n`);
//   }, 1000);
//   req.on('close', () => {
//     clearInterval(intervalId);
//     res.end();
//   });
// });



// // Send a single message
// app.post('/send', async (req, res) => {
//   const message = req.body;

//   if (!message) {
//     return res.status(400).send({ error: 'Missing JSON body in request' });
//   }

//   try {
//     const producer = new EventHubProducerClient(connectionString, eventHubName);
//     const batch = await producer.createBatch();

//     if (!batch.tryAdd({ body: message })) {
//       return res.status(400).send({ error: 'Message too large to fit in batch' });
//     }

//     await producer.sendBatch(batch);
//     await producer.close();

//     console.log('Message sent:', message);
//     res.status(200).send({ status: 'Message sent successfully' });
//   } catch (err) {
//     console.error('Error sending message:', err);
//     res.status(500).send({ error: 'Failed to send message' });
//   }
// });

// // Send 100,000 messages in bulk using sequential async/await
// app.post('/send-bulk', async (req, res) => {
//   const TOTAL_MESSAGES = parseInt(req.query.count) || 100_000;
//   const MESSAGES_PER_BATCH = 500;
//   const PARALLEL_BATCHES = 50;

//   const producer = new EventHubProducerClient(connectionString, eventHubName);
//   let currentId = 1;

//   sendProgress = {
//     isRunning: true,
//     totalMessages: TOTAL_MESSAGES,
//     sentMessages: 0,
//     startTime: new Date().toISOString(),
//     endTime: null,
//     durationSeconds: null,
//     lastUpdated: new Date().toISOString(),
//   };

//   console.time("🔁 Bulk Send Time");

//   try {
//     async function sendBatch(startId, count) {
//       let batch = await producer.createBatch({
//         partitionKey: `user-${startId % 6}`, // Spread over 6 partitions
//       });

//       for (let i = 0; i < count; i++) {
//         const id = startId + i;
//         const event = {
//           body: {
//             id,
//             user: `user-${id}`,
//             action: 'bulk_send',
//             timestamp: new Date().toISOString(),
//           },
//           partitionKey: `user-${id % 6}`,
//         };

//         if (!batch.tryAdd(event)) {
//           await producer.sendBatch(batch); // Send full batch
//           batch = await producer.createBatch({
//             partitionKey: event.partitionKey,
//           });
//           batch.tryAdd(event); // Add event to new batch
//         }

//         sendProgress.sentMessages++;
//         sendProgress.lastUpdated = new Date().toISOString();
//       }

//       if (batch.count > 0) {
//         await producer.sendBatch(batch);
//       }
//     }

//     while (currentId <= TOTAL_MESSAGES) {
//       const tasks = [];

//       for (let i = 0; i < PARALLEL_BATCHES && currentId <= TOTAL_MESSAGES; i++) {
//         const count = Math.min(MESSAGES_PER_BATCH, TOTAL_MESSAGES - currentId + 1);
//         tasks.push(sendBatch(currentId, count));
//         currentId += count;
//       }

//       await Promise.all(tasks);
//     }

//     await producer.close();
//     console.timeEnd("🔁 Bulk Send Time");
//     console.log(`TOTAL_MESSAGES(${TOTAL_MESSAGES})`);

//     sendProgress.isRunning = false;
//     sendProgress.endTime = new Date().toISOString();
//     sendProgress.durationSeconds =
//       (new Date(sendProgress.endTime) - new Date(sendProgress.startTime)) / 1000;

//     res.status(200).send({
//       status: '✅ Bulk message send completed',
//       totalMessages: TOTAL_MESSAGES,
//       durationSeconds: sendProgress.durationSeconds,
//     });
//   } catch (error) {
//     console.error('❌ Error in bulk send:', error);
//     sendProgress.isRunning = false;
//     res.status(500).send({ error: 'Failed to send bulk messages' });
//   }
// });




// app.listen(port, () => {
//   console.log(`🚀 Server listening at http://localhost:${port}`);
// });




// src/config/server.js
require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const smsRoutes = require('../routes/smsRoutes');
const statusRoutes = require('../routes/statusRoutes.js');

app.use('/', statusRoutes);
app.use(smsRoutes); 

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
