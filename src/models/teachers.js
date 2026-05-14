import {Schema, model} from "mongoose";

const teacherSchema = new Schema({
    name: {type:String},
    lastName: {type:String},
    email: {type:String, unique: true, required: true},
    password: {type:String},
    phone: {type:String},
    hireDate: {type:Date},
    isActive:{type: Boolean},
    isVerified:{type: Boolean},
    loginAttempts:{type: Number},
    timeOut: {type: Date}
},
{
    timestamps: true,
    strict: false
})

export default model("Teachers", teacherSchema)