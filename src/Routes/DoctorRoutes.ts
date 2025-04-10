import express from 'express';
import DoctorController from '../Controllers/doctorController';

const doctorRouter = express.Router();

doctorRouter.post('/register', DoctorController.registerDoctor);
doctorRouter.post('/login', DoctorController.loginDoctor);

export default doctorRouter;