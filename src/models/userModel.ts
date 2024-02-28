import mongoose, { Document } from 'mongoose';

interface User extends Document {
    username: string;
    email: string;
}

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
});

const User = mongoose.model<User>('User', userSchema);

export default User;
