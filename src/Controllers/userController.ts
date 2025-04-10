import { Request, Response } from 'express';
import UserService from '../Services/UserServices';

class UserController {
  async registerUser(req: Request, res: Response): Promise<void> {
    try {
      const newUser = await UserService.register(req.body);
      res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async loginUser(req: Request, res: Response): Promise<void> {
    try {
      const token = await UserService.login(req.body);
      res.status(200).json({ message: 'Login successful', token });
    } catch (error: any) {
      res.status(401).json({ error: error.message });
    }
  }
}

export default new UserController();