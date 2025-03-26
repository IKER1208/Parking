const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const secret = process.env.JWT_SECRET_KEY;

const authenticateJWT = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Access denied. No token provided.' });
        }

        const token = authHeader.split(' ')[1];
        console.log('Token recibido:', token);
        const decoded = jwt.verify(token, secret);

        req.user = decoded;
        next();
    } catch (error) {
        const errorMessage = error.name === 'TokenExpiredError'
            ? 'Token expired. Please login again.'
            : 'Invalid token.56';

        return res.status(401).json({ message: errorMessage });
    }
};

const IsAdmin = (req, res, next) => {
    if (!req.user) {
        return res.status(403).json({ message: 'Access denied.' });
    }

    if (req.user.role !== 'Admin') {
        return res.status(403).json({ message: 'Insufficient permissions.' });
    }

    next();
};

const isClientOrAdmin = (req, res, next) => {
    if (!req.user) {
        return res.status(403).json({ message: 'Access denied.' });
    }

    if (req.user.role !== 'Admin' && req.user.role !== 'Client')  {
        return res.status(403).json({ message: 'Insufficient permissions.' });
    }

    next();
};

module.exports = { authenticateJWT, IsAdmin, isClientOrAdmin };
