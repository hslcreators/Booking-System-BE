import { Schema, model } from "mongoose";

const spaceSchema = new Schema({
    name:{
        type: String,
        trim: true,
        required: true
    },
    location:{
        type: String,
        required: true
    },
    capacity:{
        type: Number,
    },
    description:{
        type: String,
        trim: true,
    }
})

export const Space = model("Space", spaceSchema)