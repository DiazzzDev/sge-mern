import studentModel from "../models/students.js"

const controllerStudent = {}

controllerStudent.get = async (req, res) => {
    try {
        const students = await studentModel.find()
        res.json(students)   
    } catch (error) {
        console.log("Error: " + error)
        return res.status(500).json({message: "Internal server error"})
    }
}

controllerStudent.delete = async (req, res) => {
    try {
        await studentModel.findByIdAndDelete(req.params.id)
        return res.status(200).json({message: "Student deleted"})
    } catch (error) {
        console.log("Error: " + error)
        return res.status(500).json({message: "Internal server error"})
    }
}

controllerStudent.put = async (req, res) => {
    try {
        const studentsExists = await studentModel.findById(req.params.id)
        const {
            name,
            lastName,
            email,
            password,
            birthdate,
            speciality_id,
            carnet,
            phone,
            isVerified,
            loginAttempts,
            timeOut
        } =  req.body
        if(!studentsExists) {
            return res.status(404).json("Student not found")
        }

        await studentModel.findByIdAndUpdate(
            req.params.id,
            {
            name,
            lastName,
            email,
            password,
            birthdate,
            speciality_id,
            carnet,
            phone,
            isVerified,
            loginAttempts,
            timeOut
        }, {new: true})

        return res.status(200).json({message:"Student updated succesfully"})
    } catch (error) {
        console.log("Error: " + error)
        return res.status(500).json({message: "Internal server error"})
    }    
}

export default controllerStudent