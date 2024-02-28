import { Request, Response, NextFunction } from 'express';

const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.error(`[ERROR] ${err.message}`);
    res.status(500).json({ error: 'Internal Server Error' });
};

export default errorHandler;
