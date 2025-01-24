import { Schema, model } from "mongoose";

const spaceSchema = new Schema({
    name:{
        type: String,
        trim: true,
        required: true
    },
    location:{

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