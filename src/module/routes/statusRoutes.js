const express = require('express');
const router = express.Router();
const { sendProgress } = require('../../utils/sendProgress');

router.get('/', (req, res) => {
  res.send('✅ Azure Event Hub Test Server is running.');
});

router.get('/status-stream', (req, res) => {
  res.set({
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive',
  });
  res.flushHeaders();

  const intervalId = setInterval(() => {
    res.write(`data: ${JSON.stringify(sendProgress)}\n\n`);
  }, 1000);

  req.on('close', () => {
    clearInterval(intervalId);
    res.end();
  });
});

module.exports = router;
