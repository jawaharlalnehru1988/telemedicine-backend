import  jwt  from 'jsonwebtoken';
import Doctor, { IDoctor } from './../Schema/DoctorSchema';
import  bcrypt  from 'bcrypt-ts';
import { logger } from '../Utils/Logger'; 
import dotenv from 'dotenv';
dotenv.config();


class DoctorService {
   secret: string = process.env.JWT_SECRET || (() => { throw new Error("JWT_SECRET is not defined in environment variables"); })();

    async registerDoctor(doctorData: IDoctor): Promise<any> {
        logger.info('Attempting to register a new doctor');
        try {
          const { drpassword, ...rest } = doctorData;
          const hashedPassword = await bcrypt.hash(drpassword, 10);
          const newDoctor = new Doctor({ ...rest, drpassword: hashedPassword }); // Fixed field name
          const savedDoctor = await newDoctor.save();
          logger.info(`Doctor registered successfully with doctorId: ${savedDoctor.doctorId}`);
          return savedDoctor;
        } catch (error: any) {
          logger.error('Error during doctor registration:', error);
          if (error.code === 11000) {
            logger.warn('Registration failed due to duplicate email or doctorId');
            throw new Error("Email or DoctorId already exists");
          }
          logger.error(`Registration failed with error: ${error.message}`);
          throw new Error(`Registration failed: ${error.message}`);
        }
    }
  
    async login(loginData:any):Promise<string>{
        try {
            const { email, password } = loginData;
          
            const user = await Doctor.findOne({dremail:email}).select("+password");

            if (!user || !(await bcrypt.compare(password, user.drpassword))) {
            throw new Error("Invalid email or password");
            
            }
            const token = jwt.sign({user}, this.secret, {expiresIn: "1h"});
            return token;
        } catch (error:any) {
            throw new Error(`Login failed: ${error.message}`)
        }
    }
}

export default new DoctorService();