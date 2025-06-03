import express, { Request, Response } from 'express';
import { sendProgress } from '../../utils/sendProgress';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  res.send('✅ Azure Event Hub Test Server is running.');
});

router.get('/status-stream', (req: Request, res: Response) => {
  res.set({
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive',
  });
  res.flushHeaders();

  const intervalId = setInterval(() => {
    res.write(`data: ${JSON.stringify(sendProgress)}\n\n`);
  }, 500);

  req.on('close', () => {
    clearInterval(intervalId);
    res.end();
  });
});

export default router;
