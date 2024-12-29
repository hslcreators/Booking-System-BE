import { Schema, Model } from "mongoose";

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
    }
},
{
    versionKey: false,
    timestamps: true
})

const model = Model("users", userSchema)

export default model;