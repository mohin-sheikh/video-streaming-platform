// videoModel.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface Video extends Document {
    title: string;
    url: string;
    description: string;
    duration: number;
    createdAt: Date;
    tags: string[];
    likes: number;
    comments: Comment[];
    uploader: string;
    views: number;
    resolution: string;
    isPublished: boolean;
}

export interface Comment {
    user: string;
    text: string;
    timestamp: Date;
}

const videoSchema = new Schema<Video>({
    title: { type: String, required: true },
    url: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
    tags: { type: [String], default: [] },
    likes: { type: Number, default: 0 },
    comments: { type: [{ user: String, text: String, timestamp: Date }], default: [] },
    uploader: { type: String, required: true },
    views: { type: Number, default: 0 },
    resolution: { type: String },
    isPublished: { type: Boolean, default: false },
});

const VideoModel = mongoose.model<Video>('Video', videoSchema);

export default VideoModel;
