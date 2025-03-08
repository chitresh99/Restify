import { Router } from 'express';
import { register } from '../controllers/authentication'; // Ensure correct path

const router = Router();

router.post('/auth/register', register);

export default router;
