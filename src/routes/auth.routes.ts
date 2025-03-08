import express from 'express';
import { registerUser,loginUser } from 'controllers/auth.controller';

const router = express.Router();

// Define routes
router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);

export default router;