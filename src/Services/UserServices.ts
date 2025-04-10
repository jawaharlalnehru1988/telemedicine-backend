import bcrypt from 'bcrypt-ts';
import Patient, {IPatient} from '../Schema/PatientSchema';
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();

const secret = process.env.JWT_SECRET;

class UserService {
  async register(userData: any): Promise<any> {
    try {
      const { password, ...rest } = userData;
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new Patient({ ...rest, password: hashedPassword });
      return await newUser.save();
    } catch (error: any) {
      if (error.code === 11000) {
        throw new Error('Email or UserId already exists');
      }
      throw new Error(`Registration failed: ${error.message}`);
    }
  }

  async login(loginData: any): Promise<string> {
    try {
      const { email, password } = loginData;
      const user = await Patient.findOne({ email }).select('+password'); // Explicitly select password

      if (!user || !(await bcrypt.compare(password, user.password!))) {
        throw new Error('Invalid email or password');
      }

      if (!secret) {
        throw new Error('JWT_SECRET is not defined in environment variables');
      }
      const token = jwt.sign({ user }, secret, { expiresIn: '1h' });
      return token;
    } catch (error: any) {
      throw new Error(`Login failed: ${error.message}`);
    }
  }
}

export default new UserService();