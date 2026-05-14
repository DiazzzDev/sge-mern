import {Schema, model} from "mongoose";

const specialitySchema = new Schema({
    specialityName: {type:String, required: true},
    isAvaliable: {type:Boolean, required: true},
},
{
    timestamps: true,
    strict: false
})



export default model("Speciality", specialitySchema)