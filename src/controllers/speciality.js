import specialityModel from "../models/speciality.js"

const controllerSpeciality = {}

controllerSpeciality.get = async (req, res) => {
    try {
        const specialities = await specialityModel.find()
        res.json(specialities)   
    } catch (error) {
        console.log("Error: " + error)
        return res.status(500).json({message: "Internal server error"})
    }
}
controllerSpeciality.delete = async (req, res) => {
    try {
        await specialityModel.findByIdAndDelete(req.params.id)
        return res.status(200).json({message: "Speciality deleted"})
    } catch (error) {
        console.log("Error: " + error)
        return res.status(500).json({message: "Internal server error"})
    }
}

controllerSpeciality.put = async (req, res) => {
    try {
        const specialityExists = await specialityModel.findById(req.params.id)
        const {
            specialityName, 
            isAvaliable, 
        } =  req.body
        if(!specialityExists) {
            return res.status(404).json("Speciality not found")
        }

        await specialityModel.findByIdAndUpdate(
            req.params.id,
            {
            specialityName, 
            isAvaliable
        }, {new: true})

        return res.status(200).json({message:"Speciality updated succesfully"})
    } catch (error) {
        console.log("Error: " + error)
        return res.status(500).json({message: "Internal server error"})
    }    
}

controllerSpeciality.post = async (req, res) => {
    try {
        const {
            specialityName, 
            isAvaliable, 
        } =  req.body

        const newSpeciality = new specialityModel({
            specialityName, 
            isAvaliable
        })

        await newSpeciality.save()

        return res.status(200).json({message:"Speciality created succesfully"})
    } catch (error) {
        console.log("Error: " + error)
        return res.status(500).json({message: "Internal server error"})
    }    
}

export default controllerSpeciality