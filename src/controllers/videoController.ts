// videoController.ts
import { Request, Response } from 'express';
import VideoModel, { Video, Comment } from '../models/videoModel';

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
        const videoData: Video = req.body;

        try {
            const newVideo = await VideoModel.create(videoData);
            res.json(newVideo);
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
