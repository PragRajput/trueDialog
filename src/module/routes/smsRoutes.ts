import express, { Router } from 'express';
import smsController from '../controllers/smsController';

const router: Router = express.Router();

router.post('/send', smsController.sendSingle);
router.post('/send-bulk', smsController.sendBulk);

export default router;
