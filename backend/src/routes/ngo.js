const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/users.model');
const Ngo = require('../models/ngo.model');
const { auth, requireRole } = require('../middleware/auth.middleware');
const { route } = require('./auth');
const upload = require('../config/multer.config');
const itemsModel = require('../models/items.model');
const ngoModel = require('../models/ngo.model');
const router = express.Router();

// show all ngos    
router.get('/all', async (req, res) => {
    const { q } = req.query;
    const filter = q ? { name: { $regex: String(q), $options: 'i' } } : {};
    const ngos = await Ngo.find(filter).select('-__v').populate('owner', 'name email');
    res.json({ count: ngos.length, ngos });
});

// post new Items
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

// get all items
router.get('/items', async (req, res) => {
    const { status = 'available', owner, claimedBy } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (owner) filter.owner = owner;
    if (claimedBy) filter.claimedBy = claimedBy;
    const items = await itemsModel.find(filter).populate('owner', 'name email role').sort({ createdAt: -1 })
    res.json({ count: items.length, items });
});

// mark as claimed
router.patch('/items/:id/claim', auth, requireRole('NGO'), async (req, res) => {
    try {
        const item = await itemsModel.findById(req.params.id);
        if (!item) return res.status(404).json({ message: 'Item not found' });
        if (item.status !== 'available') return res.status(400).json({ message: 'Item not available' });
        if (!req.user.ngo) return res.status(400).json({ message: 'NGO profile missing' });
        let NgoDetails = await ngoModel.findById(req.user.ngo._id)
        if (!NgoDetails || !NgoDetails.verified) {
            return res.status(400).json({ message: 'Ngo is Not verified' });
        }
        item.claimedBy = req.user.ngo._id;
        item.status = 'claimed';
        await item.save();
        res.json({ message: 'Item claimed', item });
    } catch (e) {
        console.log(e);

        res.status(500).json({ message: 'Claim failed', error: e.message });
    }
});

// NGO marks as received
router.patch('/items/:id/mark-received', auth, requireRole('NGO'), async (req, res) => {
    try {
        const item = await itemsModel.findById(req.params.id);
        if (!item) return res.status(404).json({ message: 'Item not found' });
        if (!req.user.ngo || !item.claimedBy || String(item.claimedBy) !== String(req.user.ngo._id)) {
            return res.status(403).json({ message: 'Only the claiming NGO can mark as received' });
        }

        let NgoDetails = await ngoModel.findById(req.user.ngo._id)
        if (!NgoDetails || !NgoDetails.verified) {
            return res.status(400).json({ message: 'Ngo is Not verified' });
        }

        item.status = 'received';
        await item.save();
        res.json({ message: 'Item marked as received', item });
    } catch (e) {
        res.status(500).json({ message: 'Update failed', error: e.message });
    }
});

// Volunteer or Admin can delete own item if still available
router.delete('/items/:id', auth, requireRole('VOLUNTEER', 'ADMIN'), async (req, res) => {
    try {
        const item = await itemsModel.findById(req.params.id);
        if (!item) return res.status(404).json({ message: 'Item not found' });
        if (req.user.role !== 'ADMIN' && String(item.owner) !== String(req.user._id)) {
            return res.status(403).json({ message: 'Not your item' });
        }
        if (item.status !== 'available') {
            return res.status(400).json({ message: 'Cannot delete after claim' });
        }
        await item.deleteOne();
        res.json({ message: 'Item deleted' });
    } catch (e) {
        res.status(500).json({ message: 'Delete failed', error: e.message });
    }
});

module.exports = router;