import dotenv from 'dotenv';
dotenv.config();
import express, { Application } from 'express';
import smsRoutes from '../module/routes/smsRoutes';
import statusRoutes from '../module/routes/statusRoutes';

const app: Application = express();
const port: number = parseInt(process.env.PORT || '3000', 10);

app.use(express.json());

app.use('/', statusRoutes);
app.use(smsRoutes);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
