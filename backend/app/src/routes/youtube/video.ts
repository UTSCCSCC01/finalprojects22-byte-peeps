import { Router } from "express";
import {createVideo, deleteVideo, getAllVideos, getVideoById} from "../../controllers/youtube/video";

const videoRouter = Router();

videoRouter.post('/create', createVideo);

videoRouter.get('/', getAllVideos);

videoRouter.get('/:id', getVideoById);

videoRouter.delete('/:id', deleteVideo);

export default videoRouter;