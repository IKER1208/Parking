const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const secret = process.env.JWT_SECRET_KEY;

if (!secret) {
    throw new Error('JWT_SECRET_KEY must be defined in environment variables');
}

const authenticateJWT = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Access denied. No token provided.' });
        }

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, secret);

        req.user = decoded;
        next();
    } catch (error) {
        let errorMessage;
        switch(error.name) {
            case 'TokenExpiredError':
                errorMessage = 'Token expired. Please login again.';
                break;
            case 'JsonWebTokenError':
                errorMessage = 'Invalid token format.';
                break;
            case 'NotBeforeError':
                errorMessage = 'Token not yet active.';
                break;
            default:
                errorMessage = 'Invalid token.';
        }
        return res.status(401).json({ message: errorMessage });
    }
};

const checkUserAuthenticated = (req, res, next) => {
    if (!req.user) {
        return res.status(403).json({ message: 'Access denied.' });
    }
    next();
};

const isAdmin = (req, res, next) => {
    checkUserAuthenticated(req, res, () => {
        if (req.user.role !== 'Admin') {
            return res.status(403).json({ message: 'Insufficient permissions.' });
        }
        next();
    });
};

const isClientOrAdmin = (req, res, next) => {
    checkUserAuthenticated(req, res, () => {
        if (req.user.role !== 'Admin' && req.user.role !== 'Client') {
            return res.status(403).json({ message: 'Insufficient permissions.' });
        }
        next();
    });
};

module.exports = { authenticateJWT, isAdmin, isClientOrAdmin };
