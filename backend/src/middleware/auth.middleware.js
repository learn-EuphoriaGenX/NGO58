
const jwt = require('jsonwebtoken');
const usersModel = require('../models/users.model');
const auth = async (req, res, next) => {
    try {
        const header = req.headers.authorization || '';


        const token = header.startsWith('Bearer ') ? header.slice(7) : null;



        if (!token) return res.status(401).json({ message: 'No token provided' });
        const payload = jwt.verify(token, process.env.JWT_SECRET);

        let us = await usersModel.findById(payload.id).populate('ngo');
        req.user = us;

        if (!req.user) return res.status(401).json({ message: 'Invalid token user' });

        next();
    } catch (e) {
        console.log(e);

        return res.status(401).json({ message: 'Unauthorized', error: e.message });
    }
};


const requireRole = (...roles) => (req, res, next) => {
    if (!req.user) return res.status(401).json({ message: 'Unauthorized NGO' });
    if (!roles.includes(req.user.role)) return res.status(403).json({ message: 'Forbidden' });
    next();
};
module.exports = { auth, requireRole }