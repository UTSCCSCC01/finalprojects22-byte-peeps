import userModels from "./user/models";
import facebookModels from "./facebook/models";
import instagramModels from "./instagram/models";
import youtubeModels from "./youtube/models";

const models = [...userModels, ...facebookModels, ...instagramModels, ...youtubeModels];

export default models;
