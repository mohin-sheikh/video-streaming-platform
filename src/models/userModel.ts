import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

interface User extends Document {
    username: string;
    email: string;
    password: string;
    generateAuthToken(): string;
}

const userSchema = new Schema<User>({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

userSchema.pre<User>('save', async function (next) {
    const user = this;

    if (!user.isModified('password')) {
        return next();
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    next();
});

userSchema.methods.generateAuthToken = function (): string {
    const user = this;
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY || ''); // Replace with a secure secret key
    return token;
};

const User = mongoose.model<User>('User', userSchema);

export default User;
