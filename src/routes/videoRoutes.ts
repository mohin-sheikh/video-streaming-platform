import express from 'express';
import { videoController } from '../controllers/videoController';

const router = express.Router();

// Public routes
router.get('/videos', videoController.getAllVideos);
router.get('/videos/:id', videoController.getVideoById);

// Protected routes (requires authentication)
router.post('/videos', videoController.createVideo);
router.put('/videos/:id', videoController.updateVideo);
router.delete('/videos/:id', videoController.deleteVideo);

// Additional video actions
router.post('/videos/:id/comments', videoController.addComment);
router.post('/videos/:id/like', videoController.likeVideo);

export default router;
