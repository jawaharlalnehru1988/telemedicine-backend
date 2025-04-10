import  jwt  from 'jsonwebtoken';
import Doctor, { IDoctor } from './../Schema/DoctorSchema';
import  bcrypt  from 'bcrypt-ts';
import { Environment } from '../Config/Environment';
import { logger } from '../Utils/Logger'; // Import logger as named export

class DoctorService {
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
            const token = jwt.sign({user}, Environment.JWT_SECRET, {expiresIn: "1h"});
            return token;
        } catch (error:any) {
            throw new Error(`Login failed: ${error.message}`)
        }
    }
}

export default new DoctorService();