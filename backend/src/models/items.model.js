const mongoose = require('mongoose')
const { Schema } = mongoose

const ItemSchema = new Schema(
    {
        title: { type: String, required: true },
        description: String,
        quantity: { type: Number, default: 1 },
        images: [String],
        category: { type: String, default: 'handcrafted' },
        status: { type: String, enum: ['available', 'claimed', 'received'], default: 'available' },
        owner: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // volunteer
        claimedBy: { type: Schema.Types.ObjectId, ref: 'Ngo' }, // NGO
    },
    { timestamps: true }
);
module.exports = mongoose.model('item', ItemSchema)
