import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    orgID : {
        type: String,
        required: true,
        lowercase: true,
        minlength: 4,
        trim: true,
        maxlength: 255,
    },
    username: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        minlength: 4,
        trim: true,
        maxlength: 255,
    },
    password:{
        type: String,
        required: true,
        trim: true,
        maxlength: 500
    },
    fullname:{
        type: String,
        required: true,
        lowercase: true,
        minlength: 3,
        trim: true,
        maxlength: 255,
    },
    image:{
        required: true,
        type: String,
        lowercase: true,
        minlength: 3,
        trim: true,
        maxlength: 255,
    },
    orgname:{
        required: true,
        type: String,
        lowercase: true,
        minlength: 3,
        trim: true,
        maxlength: 255,
    },
    deptID:{
        type: String,
        required: true,
        lowercase: true,
        minlength: 2,
        trim: true,
        maxlength: 255,
    },
    role:{
        type: String,
        required: true,
        lowercase: true,
        minlength: 3,
        trim: true,
        maxlength: 255,
    },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
})

export default  mongoose.model('users', userSchema)