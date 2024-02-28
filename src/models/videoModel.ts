import mongoose, { Document } from 'mongoose';

interface Video extends Document {
    title: string;
    url: string;
}

const videoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    url: { type: String, required: true },
});

const Video = mongoose.model<Video>('Video', videoSchema);

export default Video;
