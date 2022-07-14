import FeedIcon from '@mui/icons-material/Feed';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import ChatTwoToneIcon from '@mui/icons-material/ChatTwoTone';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import TwitterIcon from '@mui/icons-material/Twitter';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VideocamIcon from '@mui/icons-material/Videocam';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRetweet, faUserTag } from '@fortawesome/free-solid-svg-icons';
import { MUITheme } from '../../utils/enums';

const FacebookCardIcons = {
  totalPosts: <FeedIcon color="primary" />,
  totalReactions: <AddReactionIcon color="primary" />,
  totalComments: <ChatTwoToneIcon color="primary" />,
};

const InstagramCardIcons = {
  totalPosts: <FeedIcon color="primary" />,
  totalLikes: <FavoriteBorderIcon color="primary" />,
  totalComments: <ChatTwoToneIcon color="primary" />,
  totalTags: (
    <FontAwesomeIcon icon={faUserTag} style={{ color: MUITheme.main }} />
  ),
};

const TwitterCardIcons = {
  totalTweets: <TwitterIcon color="primary" />,
  totalLikes: <FavoriteBorderIcon color="primary" />,
  totalReplies: <ChatTwoToneIcon color="primary" />,
  totalRetweets: (
    <FontAwesomeIcon icon={faRetweet} style={{ color: MUITheme.main }} />
  ),
};

const YouTubeCardIcons = {
  totalVideos: <VideocamIcon color="primary" />,
  totalViews: <VisibilityIcon color="primary" />,
  totalLikes: <ThumbUpIcon color="primary" />,
  totalComments: <ChatTwoToneIcon color="primary" />,
};

const RedditCardIcons = {
  totalListings: <FeedIcon color="primary" />,
  avgScore: <SwapVertIcon color="primary" />,
  totalComments: <ChatTwoToneIcon color="primary" />,
};

const CardHeaderIcons = {
  FacebookCardIcons,
  InstagramCardIcons,
  TwitterCardIcons,
  YouTubeCardIcons,
  RedditCardIcons,
};

export default CardHeaderIcons;
