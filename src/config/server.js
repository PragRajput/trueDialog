// src/config/server.js
require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const smsRoutes = require('../module/routes/smsRoutes.js');
const statusRoutes = require('../module/routes/statusRoutes.js');

app.use('/', statusRoutes);
app.use(smsRoutes);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
