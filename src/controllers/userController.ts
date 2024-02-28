import { Request, Response } from 'express';
import User from '../models/userModel';

const userController = {
    getAllUsers: async (req: Request, res: Response) => {
        const users = await User.find();
        res.json(users);
    },

    getUserById: async (req: Request, res: Response) => {
        const { id } = req.params;
        const user = await User.findById(id);
        res.json(user);
    },

    createUser: async (req: Request, res: Response) => {
        const { username, email } = req.body;
        const user = new User({ username, email });
        await user.save();
        res.status(201).json(user);
    },

    updateUser: async (req: Request, res: Response) => {
        const { id } = req.params;
        const { username, email } = req.body;
        const user = await User.findByIdAndUpdate(id, { username, email }, { new: true });
        res.json(user);
    },

    deleteUser: async (req: Request, res: Response) => {
        const { id } = req.params;
        await User.findByIdAndDelete(id);
        res.sendStatus(204);
    },
};

export default userController;
