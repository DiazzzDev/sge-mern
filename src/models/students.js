import mongoose, {Schema, model} from "mongoose";

const studentSchema = new Schema({
    name: {type:String},
    lastName: {type:String},
    email: {type:String, unique: true, required: true},
    password: {type:String},
    birthdate: {type:Date},
    speciality_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Speciality",
    },
    carnet:{type: String},
    phone:{type: String},
    isVerified:{type: Boolean},
    loginAttempts:{type: Number},
    timeOut: {type: Date}
},
{
    timestamps: true,
    strict: false
})

export default model("Students", studentSchema)