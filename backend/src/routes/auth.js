const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/users.model');
const Ngo = require('../models/ngo.model');
const { auth } = require('../middleware/auth.middleware');
const router = express.Router();

const issueToken = (user) =>
    jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });

router.post('/register', async (req, res) => {
    try {
        const { name, email, password, role = 'VOLUNTEER', phone, city, type, ngoName, ngoRegNo, ngoAddress } = req.body;
        if (!name || !email || !password) return res.status(400).json({ message: 'name, email, password required' });


        const exists = await User.findOne({ email });
        if (exists) return res.status(409).json({ message: 'Email already in use' });


        const passwordHash = await bcrypt.hash(password, 10);
        const user = new User({ name, email, passwordHash, role, phone, city });
        if (role === 'NGO') {
            const ngo = await Ngo.create({ name: ngoName || `${name}'s NGO`, regNo: ngoRegNo, type: type, address: ngoAddress, owner: user._id });
            user.ngo = ngo._id;
        }
        await user.save();

        const token = issueToken(user);
        res.status(201).json({ message: 'Registered', token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
    } catch (e) {
        console.log(e);

        res.status(500).json({ message: 'Register failed', error: e.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).populate('ngo');
        console.log(user);

        if (!user) return res.status(401).json({ message: 'Invalid credentials' });
        const ok = await bcrypt.compare(password, user.passwordHash);
        if (!ok) return res.status(401).json({ message: 'Invalid credentials' });
        const token = issueToken(user);
        res.json({ message: 'Logged in', token, user: { id: user._id, name: user.name, email: user.email, role: user.role, ngo: user.ngo } });
    } catch (e) {
        res.status(500).json({ message: 'Login failed', error: e.message });
    }
});


router.get('/me', auth, async (req, res) => {
    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.slice(7) : null;
    res.json({ token: token, user: { id: req.user._id, name: req.user.name, email: req.user.email, role: req.user.role, ngo: req.user.ngo } });
});

module.exports = router;