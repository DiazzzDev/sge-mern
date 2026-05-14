import mongoose, {Schema, model} from "mongoose";

const paymentsSchema = new Schema({
    student_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Students",
    },
    amount: {type:Number, required: true},
    paymentDate: {type:Date},
    status:{
        type: String,
        enum: ["IN_PROGRESS", "CANCELED", "COMPLETED"],
        default: "IN_PROGRESS"
    },
    referenceNumber: {type: Number}
},
{
    timestamps: true,
    strict: false
})

export default model("Payments", paymentsSchema)