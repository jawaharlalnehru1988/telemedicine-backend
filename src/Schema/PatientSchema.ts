import mongoose, { Schema, Document } from 'mongoose';

export interface IPatient extends Document {
  userId: string; 
  name: {
    firstName: string;
    lastName: string;
  };
  email: string;
  password?: string; 
  phone: string;
  dateOfBirth?: Date;
  gender?: string;
  address?: string;
  medicalHistory: {
    allergies?: string[];
    ongoingTreatments?: string[];
    previousConditions?: string[];
    otherNotes?: string;
  };
  profileImage?: string; // URL or path to profile image
  registrationDate: Date;
  updatedAt: Date;
}

const PatientSchema: Schema = new Schema(
  {
    userId: { type: String, required: true, unique: true },
    name: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
    },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String }, 
    phone: { type: String },
    dateOfBirth: { type: Date },
    gender: { type: String, enum: ['male', 'female', 'other'] },
    address: { type: String },
    medicalHistory: {
      allergies: [{ type: String }],
      ongoingTreatments: [{ type: String }],
      previousConditions: [{ type: String }],
      otherNotes: { type: String },
    },
    profileImage: { type: String },
    registrationDate: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true } 
);

export default mongoose.model<IPatient>('Patient', PatientSchema);