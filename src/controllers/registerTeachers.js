import teachersModel from "../models/teachers.js"
import bcrypt from "bcryptjs"
import crypto from "crypto"
import nodemailer from "nodemailer"

const controllerRegisterTeachers = {}

controllerRegisterTeachers.post = async (req, res) => {
    try {
        const {
            name, 
            lastName, 
            email, 
            password, 
            phone, 
            hireDate, 
            isActive,
            isVerified,
            loginAttempts,
            timeOut
        } =  req.body

        await teachersModel.save({
            name, 
            lastName, 
            email, 
            password, 
            phone, 
            hireDate, 
            isActive,
            isVerified,
            loginAttempts,
            timeOut
        }, req.params.id)

        return res.status(200).json({message:"Teacher registered"})
    } catch (error) {
        console.log("Error: " + error)
        return res.status(500).json({message: "Internal server error"})
    }    
}

controllerRegisterTeachers.verifyCode = async (req, res) => {
    try {
        
    } catch (error) {
        console.log("Error: " + error)
        return res.status(500).json({message: "Internal server error"})
    }
}

export default controllerTeachers