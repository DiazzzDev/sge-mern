import teachersModel from "../models/teachers.js"
import bcrypt from "bcryptjs"
import crypto from "crypto"
import nodemailer from "nodemailer"
import jsonwebtoken from "jsonwebtoken"
import {config} from "../../config.js"

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
        } = req.body

        const existsTeacher = await teachersModel.findOne({email})

        if(existsTeacher){
            return res.status(409).json({message: "Maestro ya existe"})
        }

        const passwordHash = await bcrypt.hash(password, 10)

        const verificationCode = crypto.randomBytes(3).toString("hex")
        const tokenCode = jsonwebtoken.sign({
            name, 
            lastName, 
            email, 
            passwordHash, 
            phone, 
            hireDate, 
            isActive,
            isVerified,
            loginAttempts,
            timeOut,
            verificationCode
        },
        config.JWT.secret,
        {expiresIn: "15m"}
        );

        res.cookie("verificationToken", tokenCode, {
            maxAge: 15*60*1000,
            httpOnly: true,
            secure:true
        })
    
        //Send email

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth:{
                user: config.email.user_email,
                pass: config.email.user_password
            },
        })

        const mailOptions = {
            from: config.email.user_email,
            to: email,
            subject: "Verificación de cuenta",
            text: 
            "Para verificar tu cuenta utiliza este código: " + verificationCode
        }

        transporter.sendMail(mailOptions, (error, info) => {
            if(error){
                console.log("Error: " + error)
                return res.status(500).json({message: "Internal server error"})
            }
        })

        return res.status(200).json({message:"Teacher registered, verify your email"})
    } catch (error) {
        console.log("Error before: " + error)
        return res.status(500).json({message: "Internal server error"})
    }    
}

controllerRegisterTeachers.verifyCode = async (req, res) => {
    try {
        const { code } = req.body    
        const token = req.cookies.verificationToken
        const decoded = jsonwebtoken.verify(token, config.JWT.secret)

        const {
            name, 
            lastName, 
            email, 
            passwordHash, 
            phone, 
            hireDate, 
            isActive,
            isVerified,
            loginAttempts,
            timeOut,
            verificationCode: storedCode
        } = decoded

        if(code !== storedCode) {
            return res.status(400).json({message: "Invalid code"})
        }

        const newTeacher = new teachersModel({
            name, 
            lastName, 
            email, 
            password: passwordHash, 
            phone, 
            hireDate, 
            isActive,
            isVerified,
            loginAttempts,
            timeOut
        })

        await newTeacher.save()

        const teacher = await teachersModel.findOne({email})
        teacher.isVerified=true
        await teacher.save()
        res.clearCookie("verificationToken")
        res.status(200).json({message: "Email verificado"})

    } catch (error) {
        console.log("Error: " + error)
        return res.status(500).json({message: "Internal server error"})
    }
}

export default controllerRegisterTeachers