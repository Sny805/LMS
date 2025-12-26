import mongoose, { Schema } from "mongoose";


const courseSchema = new Schema({
    courseTitle: {
        type: String,
        required: true
    },
    subTitle: {
        type: String,
    },
    description: {
        type: String
    },
    category: {
        type: String,
        required: true
    },
    courseLevel: {
        type: String,
        enum: ["Beginner", "Medium", "Advance"]
    },
    coursePrice: {
        type: Number
    },
    enrolledStudents: [
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    lectures: [
        {
            type: Schema.Types.ObjectId,
            ref: "Lecture"
        }
    ],
    creator: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    isPublihsed: {
        type: Boolean,
        default: false
    }


}, { timestamps: true })


export const Course = mongoose.model("Course", courseSchema);

