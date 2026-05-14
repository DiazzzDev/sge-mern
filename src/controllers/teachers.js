import teachersModel from "../models/teachers.js"

const controllerTeachers = {}

controllerTeachers.get = async (req, res) => {
    try {
        const teachers = await teachersModel.find()
        res.json(teachers)   
    } catch (error) {
        console.log("Error: " + error)
        return res.status(500).json({message: "Internal server error"})
    }
}

controllerTeachers.delete = async (req, res) => {
    try {
        await teachersModel.findByIdAndDelete(req.params.id)
        return res.status(200).json({message: "Teacher deleted"})
    } catch (error) {
        console.log("Error: " + error)
        return res.status(500).json({message: "Internal server error"})
    }
}

controllerTeachers.put = async (req, res) => {
    try {
        const teacherExists = await teachersModel.findById(req.params.id)
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
        if(!teacherExists) {
            return res.status(404).json("Teacher not found")
        }

        await teachersModel.findByIdAndUpdate(
            req.params.id,
            {
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
        }, {new: true})

        return res.status(200).json({message:"Teacher updated succesfully"})
    } catch (error) {
        console.log("Error: " + error)
        return res.status(500).json({message: "Internal server error"})
    }    
}

export default controllerTeachers