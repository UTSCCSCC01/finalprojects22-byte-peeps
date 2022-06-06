import Todos from "./todos";
import User from "./user/user";
import FacebookApi from "./facebook/api";
import FacebookPost from "./facebook/post";
import FacebookComment from "./facebook/comment";
import InstagramApi from "./instagram/api";
import InstagramComment from "./instagram/comment";
import InstagramMedia from "./instagram/media";

const models = [Todos, User, FacebookApi, FacebookPost, FacebookComment, InstagramApi, InstagramMedia, InstagramComment];

export default models;
