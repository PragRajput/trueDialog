const express = require('express');
const router = express.Router();
const smsController = require('../controllers/smsController');

router.post('/send', smsController.sendSingle);
router.post('/send-bulk', smsController.sendBulk);

module.exports = router;
