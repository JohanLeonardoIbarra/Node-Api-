import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    user: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    }
}, {
    versionKey: false,
    timestamps: true
})

export default model("User", userSchema);