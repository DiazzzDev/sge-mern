import paymentModel from "../models/payments.js"

const controllerPayment = {}

controllerPayment.get = async (req, res) => {
    try {
        const payments = await paymentModel.find()
        res.json(payments)
    } catch (error) {
        console.log("Error: " + error)
        return res.status(500).json({message: "Internal server error"})
    }
}

controllerPayment.delete = async (req, res) => {
    try {
        await paymentModel.findByIdAndDelete(req.params.id)
        return res.status(200).json({message: "Payments deleted"})
    } catch (error) {
        console.log("Error: " + error)
        return res.status(500).json({message: "Internal server error"})
    }
}

controllerPayment.put = async (req, res) => {
    try {
        const paymentsExists = await paymentModel.findById(req.params.id)
        const {
            student_id, 
            amount, 
            paymentDate,
            status,
            referenceNumber
        } =  req.body
        if(!paymentsExists) {
            return res.status(404).json("Payment not found")
        }

        await paymentModel.findByIdAndUpdate(
            req.params.id,
            {
            student_id, 
            amount, 
            paymentDate,
            status,
            referenceNumber
        }, {new: true})

        return res.status(200).json({message:"Payment updated succesfully"})
    } catch (error) {
        console.log("Error: " + error)
        return res.status(500).json({message: "Internal server error"})
    }    
}

controllerPayment.post = async (req, res) => {
    try {
        const {
            student_id, 
            amount, 
            paymentDate,
            status,
            referenceNumber 
        } =  req.body

        const newPayment = new paymentModel({
            student_id, 
            amount, 
            paymentDate,
            status,
            referenceNumber
        })

        await newPayment.save()

        return res.status(200).json({message:"Payment created succesfully"})
    } catch (error) {
        console.log("Error: " + error)
        return res.status(500).json({message: "Internal server error"})
    }    
}

export default controllerPayment