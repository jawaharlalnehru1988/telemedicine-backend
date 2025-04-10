import express from 'express';
import UserController from '../Controllers/userController';

const router = express.Router();

router.post('/patient-register', UserController.registerUser);
router.post('/login', UserController.loginUser);

export default router;