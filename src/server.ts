import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import userRoutes from './Routes/userRoutes';
import doctorRouter from './Routes/DoctorRoutes';
import dotenv from 'dotenv';

const app = express();
dotenv.config();
const port = process.env.PORT || 3000;
const DB:string| undefined = process.env.MONGO_URI;

app.use(cors());
app.use(helmet());
app.use(express.json()); 

if (DB) {
  mongoose.connect(DB)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log('MongoDB connection error:', err));
} else {
  console.error('MongoDB connection string is not defined in the environment variables.');
  process.exit(1);
}

app.get('/', (req: Request, res: Response) => {
  res.send('Express server with TypeScript!');
});
app.use('/api/users', userRoutes);
app.use('/api/doctor', doctorRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});