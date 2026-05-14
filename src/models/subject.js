import mongoose, {Schema, model} from "mongoose";

const subjectSchema = new Schema({
    subjectName: {type:String, required: true},
    teacher_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Teachers",
    },
    isAvaliable: {type: Boolean}
},
{
    timestamps: true,
    strict: false
})

export default model("Subjects", subjectSchema)