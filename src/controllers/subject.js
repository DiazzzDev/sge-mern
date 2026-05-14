import subjectModel from "../models/subject.js"

const controllerSubjects = {}

controllerSubjects.get = async (req, res) => {
    try {
        const subjects = await subjectModel.find()
        res.json(subjects)   
    } catch (error) {
        console.log("Error: " + error)
        return res.status(500).json({message: "Internal server error"})
    }
}
controllerSubjects.delete = async (req, res) => {
    try {
        await subjectModel.findByIdAndDelete(req.params.id)
        return res.status(200).json({message: "Subject deleted"})
    } catch (error) {
        console.log("Error: " + error)
        return res.status(500).json({message: "Internal server error"})
    }
}

controllerSubjects.put = async (req, res) => {
    try {
        const subjectExists = await subjectModel.findById(req.params.id)
        const {
            subjectName, 
            teacher_id, 
            isAvaliable, 
        } =  req.body
        if(!subjectExists) {
            return res.status(404).json("Subject not found")
        }

        await subjectModel.findByIdAndUpdate(
            req.params.id,
            {
            subjectName, 
            teacher_id, 
            isAvaliable
        }, {new: true})

        return res.status(200).json({message:"Subject updated succesfully"})
    } catch (error) {
        console.log("Error: " + error)
        return res.status(500).json({message: "Internal server error"})
    }    
}

controllerSubjects.post = async (req, res) => {
    try {
        const {
            subjectName, 
            teacher_id, 
            isAvaliable, 
        } =  req.body

        const newSubject = new subjectModel({
            subjectName, 
            teacher_id, 
            isAvaliable
        })

        await newSubject.save()

        return res.status(200).json({message:"Subject created succesfully"})
    } catch (error) {
        console.log("Error: " + error)
        return res.status(500).json({message: "Internal server error"})
    }    
}

export default controllerSubjects