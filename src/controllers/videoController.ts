import 'dotenv/config'
import { Request, Response } from 'express';
import VideoModel, { Video, Comment } from '../models/videoModel';
import expressFileUpload from 'express-fileupload';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const s3Client = new S3Client({
    credentials: {
        accessKeyId: process.env.ACCESS_KEY_ID_AWS || '',
        secretAccessKey: process.env.SECRET_ACCESS_KEY_AWS || '',
    },
});

const S3_BUCKET = process.env.S3_BUCKET_AWS ?? '';

export const videoController = {
    getAllVideos: async (req: Request, res: Response) => {
        try {
            const videos = await VideoModel.find();
            res.json(videos);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    getVideoById: async (req: Request, res: Response) => {
        const { id } = req.params;

        try {
            const video = await VideoModel.findById(id);
            if (!video) {
                return res.status(404).json({ error: 'Video not found' });
            }

            res.json(video);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    createVideo: async (req: Request, res: Response) => {
        try {
            const videoData: Video = req.body;

            if (!req.files || Object.keys(req.files).length === 0) {
                return res.status(400).json({ error: 'No file uploaded' });
            }

            const videoFile = req.files.video as expressFileUpload.UploadedFile;

            const timestamp = new Date().toISOString().replace(/[-:T.]/g, '');

            const params = {
                Bucket: S3_BUCKET,
                Key: `${timestamp}_${videoFile.name}`,
                Body: videoFile.data,
            };

            if (Array.isArray(videoData.tags)) {
                videoData.tags = [videoData.tags.join(',')];
            }
            videoData.tags = videoData.tags.toLocaleString().split(',');

            const uploadCommand = new PutObjectCommand(params);
            await s3Client.send(uploadCommand);

            const s3Url = `https://${S3_BUCKET}.s3.${process.env.S3_BUCKET_AWS_REGION}.amazonaws.com/${params.Key}`;

            videoData.url = s3Url;

            const newVideo = await VideoModel.create(videoData);

            res.json({
                message: 'Video uploaded and details saved successfully',
                video: newVideo,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    updateVideo: async (req: Request, res: Response) => {
        const { id } = req.params;
        const updatedVideoData: Video = req.body;

        try {
            const updatedVideo = await VideoModel.findByIdAndUpdate(id, updatedVideoData, { new: true });
            if (!updatedVideo) {
                return res.status(404).json({ error: 'Video not found' });
            }

            res.json(updatedVideo);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    deleteVideo: async (req: Request, res: Response) => {
        const { id } = req.params;

        try {
            const deletedVideo = await VideoModel.findByIdAndDelete(id);
            if (!deletedVideo) {
                return res.status(404).json({ error: 'Video not found' });
            }

            res.json(deletedVideo);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    addComment: async (req: Request, res: Response) => {
        const { id } = req.params;
        const newComment: Comment = req.body;

        try {
            const video = await VideoModel.findById(id);
            if (!video) {
                return res.status(404).json({ error: 'Video not found' });
            }

            video.comments.push(newComment);
            const updatedVideo = await video.save();

            res.json(updatedVideo);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    likeVideo: async (req: Request, res: Response) => {
        const { id } = req.params;

        try {
            const video = await VideoModel.findById(id);
            if (!video) {
                return res.status(404).json({ error: 'Video not found' });
            }

            video.likes += 1;
            const updatedVideo = await video.save();

            res.json(updatedVideo);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
};
