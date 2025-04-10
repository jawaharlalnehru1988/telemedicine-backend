import { Request, Response } from "express";
import DoctorService from "../Services/DoctorService";


class DoctorController{
    async registerDoctor(req:Request, res: Response):Promise<void>{
        try {
            const newUser = await DoctorService.registerDoctor(req.body);
            res.status(201).json({message: "Doctor registered successfully", user: newUser});
        } catch (error:any) {
            res.status(400).json({error: error.message});
        }
    }

    async loginDoctor(req:Request, res: Response): Promise<void>{
        try {
            const token = await DoctorService.login(req.body);
            res.status(200).json({message: "Login successful", token});
        } catch (error:any) {
            res.status(401).json({error: error.message})
        }
    }
}

export default new DoctorController();