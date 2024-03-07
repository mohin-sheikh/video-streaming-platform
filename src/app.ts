import express from 'express';
import 'dotenv/config'
import mongoose from 'mongoose';
import fileUpload from 'express-fileupload'

import videoRoutes from './routes/videoRoutes';
import userRoutes from './routes/userRoutes';
import errorHandler from './utils/errorHandler';

const app = express();

app.use(fileUpload())

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
