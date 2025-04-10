import mongoose, { Schema, Document } from 'mongoose';

export interface IDoctor extends Document {
  doctorId: string; 
  drFirstName: string;
  drLastName: string;
  dremail: string;
  drpassword: string;
  phone: string;
  specialization: string;
  experience: number;
  profileImage?: string; 
}

const DoctorSchema: Schema = new Schema(
  {
    doctorId: { type: String, required: true },
    drFirstName: { type: String, required: true },
    drLastName: { type: String, required: true },
    dremail: { type: String, required: true, unique: true },
    drpassword: { type: String, required:true },
    phone: { type: String },
    specialization: { type: String },
    experience: { type: Number },
    profileImage: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model<IDoctor>('Doctor', DoctorSchema);