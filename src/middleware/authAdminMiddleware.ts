import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/userModel';

interface AuthRequest extends Request {
    user?: any;
}

const authAdminMiddleware = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.header('x-auth-token');

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized. Token not provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY || '') as { _id: string };
        req.user = decoded;
        const user = await User.findOne({ _id: req.user._id }).select('-password -__v');
        if (user?.role === 'admin') {
            next();
        } else {
            res.status(401).json({ error: 'Unauthorized' });
        }
    } catch (error) {
        console.error(error);
        res.status(401).json({ error: 'Unauthorized. Invalid token.' });
    }
};

export default authAdminMiddleware;
