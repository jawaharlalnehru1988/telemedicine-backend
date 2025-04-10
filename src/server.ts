import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import userRoutes from './Routes/userRoutes';
import doctorRouter from './Routes/DoctorRoutes';



const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json()); // For parsing application/json

// MongoDB Connection (replace with your connection string)
const mongoUri = 'mongodb://localhost:27017/TMCP';

mongoose.connect(mongoUri)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('MongoDB connection error:', err));

// Basic route
app.get('/', (req: Request, res: Response) => {
  res.send('Express server with TypeScript!');
});
app.use('/api/users', userRoutes);
app.use('/api/doctor', doctorRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});