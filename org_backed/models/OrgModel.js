import mongoose from "mongoose";

const orgSchema = mongoose.Schema({
    orgID : {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        minlength: 4,
        trim: true,
        maxlength: 255,
    },
    name: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        minlength: 2,
        trim: true,
        maxlength: 255,
    },

    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
})

export default mongoose.model('orgs', orgSchema)