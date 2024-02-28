import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import mongoose from 'mongoose';

import videoRoutes from './routes/videoRoutes';
import userRoutes from './routes/userRoutes';
import errorHandler from './utils/errorHandler';

dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(morgan('combined'));

// Routes
app.use('/videos', videoRoutes);
app.use('/users', userRoutes);

// Global Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error: Error | any) {
    console.error('Error starting the server:', error.message);
  }
};

startServer();
