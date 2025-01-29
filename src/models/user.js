import { Schema, model } from "mongoose";

const userSchema = new Schema({
    firstName: {
        type: String,
        trim: true,
        required: true
    },

    lastName: {
        type: String,
        trim: true,
        required: true
    },

    email: {
        type: String,
        trim: true,
        required: true
    },

    password: {
        type: String,
        trim: true,
        required: true
    },

    phoneNumber: {
        type: String,
        trim: true,
    },

    role: {
        type: String,
        enum: [ "BASIC", "ADMIN" ],
        default: "BASIC"
    }
})

export const User = model("User", userSchema)
