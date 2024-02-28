import express from 'express';
import userController from '../controllers/userController';
import authMiddleware from '../middleware/authMiddleware';

const router = express.Router();

// Public routes
router.post('/register', userController.registerUser);
router.post('/register/admin', userController.registerAdminUser);
router.post('/login', userController.loginUser);

// Protected route (requires authentication)
router.get('/profile', authMiddleware, userController.getUserProfile);

// Other routes (similar to previous examples)
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

export default router;
