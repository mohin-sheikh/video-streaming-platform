import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface AuthRequest extends Request {
    user?: any; // Replace 'any' with the actual type of your user object
}

const authMiddleware = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.header('x-auth-token');

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized. Token not provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY || '') as { _id: string }; // Replace with your secret key and adjust the decoded type
        req.user = decoded;
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ error: 'Unauthorized. Invalid token.' });
    }
};

export default authMiddleware;
