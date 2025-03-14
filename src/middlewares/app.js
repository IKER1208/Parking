import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const secret = process.env.JWT_SECRET_KEY;

export const authenticateJWT = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, secret);
        req.user = decoded;
        console.log(req.user);
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

export const authorizeOnlyAdmin = (req, res, next) => {
    if (req.user?.role !== 'Admin') {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    next();
};

export const authorizeClientAndAdmin = (req, res, next) => {
    if (req.user?.role !== 'Admin' && req.user?.role !== 'Client') {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    next();
};
