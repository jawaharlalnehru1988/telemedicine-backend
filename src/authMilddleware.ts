import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { Environment } from '../src/Config/Environment';
import  Patient from '../src/Schema/PatientSchema';

interface AuthRequest extends Request {
  userId?: string;
}

const authMiddleware = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Authentication failed: No token provided' });
    }

    const token = authHeader.split(' ')[1];

    try {
      const decoded: any = jwt.verify(token, Environment.JWT_SECRET);
      req.userId = decoded.userId; // Attach userId to the request object
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Authentication failed: Invalid token' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Authentication failed: Internal server error' });
  }
};

export default authMiddleware;