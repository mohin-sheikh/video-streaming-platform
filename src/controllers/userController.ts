import { Request, Response } from 'express';
import User from '../models/userModel';
import bcrypt from 'bcrypt';

const userController = {
    getAllUsers: async (req: Request, res: Response) => {
        const users = await User.find({ role: 'user' }).select('-password -__v');
        res.json(users);
    },

    getUserById: async (req: Request, res: Response) => {
        const { id } = req.params;
        const user = await User.findById(id);
        res.json(user);
    },

    registerUser: async (req: Request, res: Response) => {
        try {
            const { username, email, password } = req.body;

            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ error: 'User with this email already exists' });
            }

            const user = new User({ username, email, password });
            await user.save();

            const token = user.generateAuthToken();

            res.status(201).json({ user, token });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    registerAdminUser: async (req: Request, res: Response) => {
        try {
            const { username, email, password } = req.body;

            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ error: 'User with this email already exists' });
            }

            const user = new User({ username, email, password, role: 'admin' });
            await user.save();

            const token = user.generateAuthToken();

            res.status(201).json({ user, token });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    loginUser: async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body;

            const user = await User.findOne({ email });
            if (!user) {
                return res.status(401).json({ error: 'Invalid email or password' });
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ error: 'Invalid email or password' });
            }

            const token = user.generateAuthToken();

            res.json({ user, token });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    getUserProfile: async (req: any, res: Response) => {
        try {
            const user = await User.findOne({ _id: req.user._id }).select('-password -__v');
            if (!user) {
                return res.status(401).json({ error: 'Invalid email or password' });
            }

            res.json(user);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
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
