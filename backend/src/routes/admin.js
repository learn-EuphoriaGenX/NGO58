const express = require('express');
const router = express.Router()
const { auth, requireRole } = require('../middleware/auth.middleware');
const ngoModel = require('../models/ngo.model');

// Admin: verify an NGO (optional starter)
router.patch('/ngos/:id/verify', auth, requireRole('ADMIN'), async (req, res) => {
    const ngo = await ngoModel.findByIdAndUpdate(req.params.id, { verified: true }, { new: true });
    if (!ngo) return res.status(404).json({ message: 'NGO not found' });
    res.json({ message: 'NGO verified', ngo });
});


module.exports = router;