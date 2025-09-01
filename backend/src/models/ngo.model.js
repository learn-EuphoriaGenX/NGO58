const mongoose = require('mongoose')
const { Schema } = mongoose

const NgoSchema = new Schema(
    {
        name: { type: String, required: true },
        regNo: { type: String },
        address: { type: String },
        verified: { type: Boolean, default: false },
        type: { type: String, enum: ['Charity', 'Non-Profit', 'Foundation', 'Trust'], required: true },
        owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    },
    { timestamps: true }
);

module.exports = mongoose.model('ngo', NgoSchema)