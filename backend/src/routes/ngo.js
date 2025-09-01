const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/users.model');
const Ngo = require('../models/ngo.model');
const { auth, requireRole } = require('../middleware/auth.middleware');
const { route } = require('./auth');
const upload = require('../config/multer.config');
const itemsModel = require('../models/items.model');
const router = express.Router();

router.get('/all', async (req, res) => {
    const { q } = req.query;
    const filter = q ? { name: { $regex: String(q), $options: 'i' } } : {};
    const ngos = await Ngo.find(filter).select('-__v').populate('owner', 'name email');
    res.json({ count: ngos.length, ngos });
});

router.post('/items', auth, requireRole('VOLUNTEER'), upload.array('images', 5), async (req, res) => {
    try {
        const { title, description, quantity = 1, category } = req.body;
        if (!title) return res.status(400).json({ message: 'title required' });
        const images = (req.files || []).map((f) => `/uploads/${f.filename}`);
        const item = await itemsModel.create({ title, description, quantity, category, images, owner: req.user._id });
        res.status(201).json({ message: 'Item created', item });
    } catch (e) {
        res.status(500).json({ message: 'Create item failed', error: e.message });
    }
});


router.get('/items', async (req, res) => {
    const { status = 'available', owner, claimedBy } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (owner) filter.owner = owner;
    if (claimedBy) filter.claimedBy = claimedBy;
    const items = await itemsModel.find(filter).sort({ createdAt: -1 })
    res.json({ count: items.length, items });
});


module.exports = router;