import { Request, Response } from 'express';
import Video from '../models/videoModel';

const videoController = {
    getAllVideos: async (req: Request, res: Response) => {
        const videos = await Video.find();
        res.json(videos);
    },

    getVideoById: async (req: Request, res: Response) => {
        const { id } = req.params;
        const video = await Video.findById(id);
        res.json(video);
    },

    createVideo: async (req: Request, res: Response) => {
        const { title, url } = req.body;
        const video = new Video({ title, url });
        await video.save();
        res.status(201).json(video);
    },

    updateVideo: async (req: Request, res: Response) => {
        const { id } = req.params;
        const { title, url } = req.body;
        const video = await Video.findByIdAndUpdate(id, { title, url }, { new: true });
        res.json(video);
    },

    deleteVideo: async (req: Request, res: Response) => {
        const { id } = req.params;
        await Video.findByIdAndDelete(id);
        res.sendStatus(204);
    },
};

export default videoController;
