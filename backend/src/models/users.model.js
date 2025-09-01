const mongoose = require('mongoose')
const { Schema } = mongoose

const UserSchema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true, lowercase: true },
        passwordHash: { type: String, required: true },
        role: { type: String, enum: ['NGO', 'VOLUNTEER', 'ADMIN'], default: 'VOLUNTEER' },
        // Optional volunteer profile fields
        phone: String,
        city: String,
        // If NGO user, link to Ngo document
        ngo: { type: Schema.Types.ObjectId, ref: 'Ngo' },
    },
    { timestamps: true }
);
module.exports = mongoose.model('user', UserSchema)