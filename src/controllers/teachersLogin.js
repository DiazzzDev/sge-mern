import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken"
import teacherModel from "../models/teachers.js";
import {config} from "../../config.js"

const controllerLogin = {}

controllerLogin.login = async (req, res) => {
    try {
        const {email, password} = req.body
        const userFound = await teacherModel.findOne({email})

        if(!userFound){
            return res.status(404).json({message: "User not found"})
        }
        if(userFound.timeOut && userFound.timeOut > Date.now()){
            return res.status(403)
        }

        const isMatch = await bcrypt.compare(password, userFound.password)

        if(!isMatch){
            userFound.loginAttempts = (userFound.loginAttempts || 0) + 1
            await userFound.save()
            return res.status(401).json({message: "Incorrect credentials"})
        }

        userFound.loginAttempts = 0
        userFound.timeOut = null
        await userFound.save()
        const token = jsonwebtoken.sign(
            {id: userFound._id, email: userFound.email},
            config.JWT.secret,
            {expiresIn: "30d"}
        )

        res.cookie("authCookie", token)
        return res.status(200).json({message: "Successful login"})

    } catch (error) {
        console.log("Error: " + error)
        return res.status(500).json({message: "Internal server error"})
    }
}

export default controllerLogin