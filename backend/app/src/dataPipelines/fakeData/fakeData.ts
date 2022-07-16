import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';
import FacebookApi from '../../models/facebook/api';
import FacebookComment from '../../models/facebook/comment';
import FacebookPost from '../../models/facebook/post';
import GoogleReviewsAccount from '../../models/googleReviews/account';
import GoogleReviewsLocation from '../../models/googleReviews/location';
import GoogleReviewsReview from '../../models/googleReviews/review';
import InstagramApi from '../../models/instagram/api';
import InstagramComment from '../../models/instagram/comment';
import InstagramMedia from '../../models/instagram/media';
import InstagramTag from '../../models/instagram/tag';
import RedditComment from '../../models/reddit/comment';
import RedditListing from '../../models/reddit/listing';
import RedditSubreddit from '../../models/reddit/subreddit';
import TwitterConversation from '../../models/twitter/conversation';
import TwitterTweet from '../../models/twitter/tweet';
import TwitterUser from '../../models/twitter/user';
import User from '../../models/user/user';
import YouTubeChannel from '../../models/youtube/channel';
import YouTubeComment from '../../models/youtube/comment';
import YouTubeVideo from '../../models/youtube/video';

const fakeData = require('./fakeDataJSON.json');

type RegisteredUser = {
  userId: number;
  youtubeChannelId: number;
  facebookApiId: number;
  instagramApiId: number;
  redditSubredditId: number;
  twitterUserId: number;
  googleReviewsAccountId: number;
};

const startDate: string = '2022-06-15T00:00:00.000Z';
const endDate: string = '2022-07-15T23:59:59.999Z';
const numberOfPosts = 30;
const numberOfComments = 50;
const numberOfLocations = 10;
const numberOfReviews = 30;

/**
 * Random index between 0 to number
 * @param {number} number - Maximum index; deafults to length of fakeData
 */
function randomIndex(number: number = fakeData.length): number {
  return Math.floor(Math.random() * number);
}

function randomRating(): number | null {
  const i = randomIndex(6);
  if (i == 0) return null;
  return i;
}

/**
 * Returns a random subjectivity analysis
 * @return {string} subjective or objective
 */
function randomSubjectivity(): string {
  let i = randomIndex(2);
  if (i === 0) return 'subjective';
  else return 'objective';
}

/**
 * Returns a random topic classification in correspondence with the topics available in datumbox
 * @return {string}
 */
function randomTopicClassification(): string {
  let i = randomIndex(11);
  switch (i) {
    case 0:
      return 'Arts';
    case 1:
      return 'Business & Economy';
    case 2:
      return 'Computers &Technology';
    case 3:
      return 'Home & Domestic Life';
    case 4:
      return 'Recreation & Activities';
    case 5:
      return 'News';
    case 6:
      return 'Reference & Education';
    case 7:
      return 'Society';
    case 8:
      return 'Shopping';
    case 9:
      return 'Science';
    default:
      return 'Sports';
  }
}

/**
 * Deletes all the data in the database
 * @return {Promise<void>}
 */
async function deleteAllData(): Promise<void> {
  await YouTubeComment.destroy({ where: {} });
  await YouTubeVideo.destroy({ where: {} });
  await YouTubeChannel.destroy({ where: {} });

  await InstagramTag.destroy({ where: {} });
  await InstagramComment.destroy({ where: {} });
  await InstagramMedia.destroy({ where: {} });
  await InstagramApi.destroy({ where: {} });

  await FacebookComment.destroy({ where: {} });
  await FacebookPost.destroy({ where: {} });
  await FacebookApi.destroy({ where: {} });

  await TwitterConversation.destroy({ where: {} });
  await TwitterTweet.destroy({ where: {} });
  await TwitterUser.destroy({ where: {} });

  await RedditComment.destroy({ where: {} });
  await RedditListing.destroy({ where: {} });
  await RedditSubreddit.destroy({ where: {} });

  await GoogleReviewsReview.destroy({ where: {} });
  await GoogleReviewsLocation.destroy({ where: {} });
  await GoogleReviewsAccount.destroy({ where: {} });

  await User.destroy({ where: {} });
}

/**
 * Adds the user and their APIs to the database
 * @return {Promise<RegisteredUser>} Object that has the database IDs of the user and their APIs
 */
async function userAndAPIs(): Promise<RegisteredUser> {
  const saltRounds = 10;
  let username = 'data';
  let password = 'data';

  let hash = await bcrypt.hash(password, saltRounds).then((hash) => {
    return hash;
  });

  let userId: number = await User.create({
    username: username,
    password: hash,
  }).then((user) => {
    return user.id;
  });

  // add youtube channel
  let youtubeChannelId: number = await YouTubeChannel.create({
    channelId: 'UC5uqd7fgT5zoFDGCrUvYdAg', // actual channel id
    name: 'Mohamed Tayeh',
    isActive: true,
    userId,
    oauth: '',
  }).then((channel) => {
    return channel.id;
  });

  // add facebook page
  let facebookApiId = await FacebookApi.create({
    token:
      'EAAKSwnYPfTEBAMyFaCCSj0ZBfqcZAZABRDVCDobCQWhNycT3NGVZB9ZAZCnzJZAxYtbjgvwtU2yGXM5KFcewmBs5m9qoy18ujoUjmzn2vABrcHeofH71W5qlEW78ovaofaOxGzjD3Xs2Ab3uO79LO0YgRHmvu3sRKNtDzUYuFijbTc5ZAFEyAgkC',
    isActive: true,
    pageId: '112533588141071',
    userId,
  }).then((api) => {
    if (api) return api.id;
    return 1;
  });

  // add instagram api
  let instagramApiId = await InstagramApi.create({
    facebookApiId,
    userId,
    nodeId: '17841418399853871',
  }).then((api) => {
    if (api) return api.id;
    return 1;
  });

  // add twitter user
  let twitterUserId = await TwitterUser.create({
    twitterId: faker.datatype.uuid(),
    username: faker.internet.userName(),
    userId,
  }).then((user) => {
    if (user) return user.id;
    return 1;
  });

  // add reddit subreddit
  let redditSubredditId = await RedditSubreddit.create({
    name: 'utsc',
    userId,
  }).then((api) => {
    if (api) return api.id;
    return 1;
  });

  // Add Google Reviews user
  const googleReviewsAccountId = await GoogleReviewsAccount.create({
    token: 'xxxxxx',
    accountId: 'xxxxxx',
    isActive: true,
    userId,
  }).then((account) => {
    if (account) return account.id;
    return 1;
  });

  return {
    userId,
    youtubeChannelId,
    facebookApiId,
    instagramApiId,
    twitterUserId,
    redditSubredditId,
    googleReviewsAccountId,
  };
}

/**
 * Adds fake youtube data to the database
 * @param {RegisteredUser} registeredUser - Object that has the database IDs of the user and their APIs
 * @return {Promise<void>}
 */
async function addYouTubeData(registeredUser: RegisteredUser): Promise<void> {
  Array.from({ length: numberOfPosts }).forEach(async () => {
    let date = faker.date.betweens(startDate, endDate, 1)[0];

    // Create a youtube vide
    let youtubeVideoId = await YouTubeVideo.create({
      channelId: registeredUser.youtubeChannelId,
      resourceId: faker.datatype.uuid(),
      date,
      views: parseInt(faker.random.numeric(4, { bannedDigits: ['0'] })),
      likes: parseInt(faker.random.numeric(2, { bannedDigits: ['0'] })),
      title: faker.random.words(
        parseInt(
          faker.random.numeric(1, { bannedDigits: ['0', '7', '8', '9'] })
        )
      ),
    }).then((video) => {
      return video.id;
    });

    // create comments for each video
    Array.from({ length: numberOfComments }).forEach(async () => {
      let randomSentimentData = fakeData[randomIndex()];

      YouTubeComment.create({
        resourceId: faker.datatype.uuid(),
        videoId: youtubeVideoId,
        date: faker.date.between(date, endDate),
        likes: parseInt(faker.random.numeric(2, { bannedDigits: ['0'] })),
        userName: faker.internet.userName(),
        message: randomSentimentData.review,
        sentimentAnalysis: randomSentimentData.sentiment,
        subjectivityAnalysis: randomSubjectivity(),
        topicClassification: randomTopicClassification(),
      });
    });
  });
}

/**
 * Adds fake facebook data to the database
 * @param {RegisteredUser} registeredUser - Object that has the database IDs of the user and their APIs
 * @return {Promise<void>}
 */
async function addFacebookData(registeredUser: RegisteredUser): Promise<void> {
  Array.from({ length: numberOfPosts }).forEach(async () => {
    let date = faker.date.betweens(startDate, endDate, 1)[0];

    // Create a facebook post
    let facebookPostId = await FacebookPost.create({
      message: faker.lorem.paragraph(),
      date,
      likes: parseInt(faker.random.numeric(1, { bannedDigits: ['0'] })),
      loves: parseInt(faker.random.numeric(1, { bannedDigits: ['0'] })),
      cares: parseInt(faker.random.numeric(1, { bannedDigits: ['0'] })),
      hahas: parseInt(faker.random.numeric(1, { bannedDigits: ['0'] })),
      wows: parseInt(faker.random.numeric(1, { bannedDigits: ['0'] })),
      sads: parseInt(faker.random.numeric(1, { bannedDigits: ['0'] })),
      angrys: parseInt(faker.random.numeric(1, { bannedDigits: ['0'] })),
      dataId: faker.datatype.uuid(),
      apiId: registeredUser.facebookApiId,
    }).then((video) => {
      return video.id;
    });

    // create comments for each post
    Array.from({ length: numberOfComments }).forEach(async () => {
      let randomSentimentData = fakeData[randomIndex()];

      FacebookComment.create({
        dataId: faker.datatype.uuid(),
        userName: faker.internet.userName(),
        message: randomSentimentData.review,
        date: faker.date.between(date, endDate),
        likes: parseInt(faker.random.numeric(1, { bannedDigits: ['0'] })),
        sentimentAnalysis: randomSentimentData.sentiment,
        subjectivityAnalysis: randomSubjectivity(),
        topicClassification: randomTopicClassification(),
        postId: facebookPostId,
      });
    });
  });
}

/**
 * Adds fake instagram data to the database
 * @param {RegisteredUser} registeredUser - Object that has the database IDs of the user and their APIs
 * @return {Promise<void>}
 */
async function addInstagramData(registeredUser: RegisteredUser): Promise<void> {
  Array.from({ length: numberOfPosts }).forEach(async () => {
    let date = faker.date.betweens(startDate, endDate, 1)[0];

    // Create a instagram post
    let instagramMediaId = await InstagramMedia.create({
      dataId: faker.datatype.uuid(),
      caption: faker.lorem.paragraph(),
      date,
      likes: parseInt(faker.random.numeric(1, { bannedDigits: ['0'] })),
      apiId: registeredUser.instagramApiId,
    }).then((media) => {
      return media.id;
    });

    // create comments for each post
    Array.from({ length: numberOfComments }).forEach(async () => {
      let randomSentimentData = fakeData[randomIndex()];

      InstagramComment.create({
        dataId: faker.datatype.uuid(),
        userName: faker.internet.userName(),
        message: randomSentimentData.review,
        date: faker.date.between(date, endDate),
        likes: parseInt(faker.random.numeric(1, { bannedDigits: ['0'] })),
        sentimentAnalysis: randomSentimentData.sentiment,
        subjectivityAnalysis: randomSubjectivity(),
        topicClassification: randomTopicClassification(),
        mediaId: instagramMediaId,
      });
    });
  });

  Array.from({ length: numberOfPosts }).forEach(async () => {
    let date = faker.date.betweens(startDate, endDate, 1)[0];
    let randomSentimentData = fakeData[randomIndex()];

    // add data for instagram tags
    InstagramTag.create({
      dataId: faker.datatype.uuid(),
      username: faker.internet.userName(),
      caption: randomSentimentData.review,
      date: faker.date.between(date, endDate),
      sentimentAnalysis: randomSentimentData.sentiment,
      subjectivityAnalysis: randomSubjectivity(),
      topicClassification: randomTopicClassification(),
      likes: parseInt(faker.random.numeric(1, { bannedDigits: ['0'] })),
      apiId: registeredUser.instagramApiId,
    });
  });
}

/**
 * Adds fake twitter data to the database
 * @param {RegisteredUser} registeredUser - Object that has the database IDs of the user and their APIs
 * @return {Promise<void>}
 */
async function addTwitterData(registeredUser: RegisteredUser): Promise<void> {
  Array.from({ length: numberOfPosts }).forEach(async () => {
    let date = faker.date.betweens(startDate, endDate, 1)[0];

    // Create a tweet
    let tweetId = await TwitterTweet.create({
      twitterId: faker.datatype.uuid(),
      conversationId: faker.datatype.uuid(),
      text: faker.lorem.paragraph(),
      date,
      retweets: parseInt(faker.random.numeric(1, { bannedDigits: ['0'] })),
      replies: numberOfComments,
      likes: parseInt(faker.random.numeric(1, { bannedDigits: ['0'] })),
      twitterUserId: registeredUser.twitterUserId,
    }).then((tweet) => {
      return tweet.id;
    });

    // create comments for each post
    Array.from({ length: numberOfComments }).forEach(async () => {
      let randomSentimentData = fakeData[randomIndex()];

      TwitterConversation.create({
        twitterId: faker.datatype.uuid(),
        text: randomSentimentData.review,
        date: faker.date.between(date, endDate),
        likes: parseInt(faker.random.numeric(1, { bannedDigits: ['0'] })),
        retweets: parseInt(faker.random.numeric(1, { bannedDigits: ['0'] })),
        replies: parseInt(faker.random.numeric(1, { bannedDigits: ['0'] })),
        sentimentAnalysis: randomSentimentData.sentiment,
        subjectivityAnalysis: randomSubjectivity(),
        topicClassification: randomTopicClassification(),
        tweetId,
      });
    });
  });
}

/**
 * Adds fake reddit data to the database
 * @param {RegisteredUser} registeredUser - Object that has the database IDs of the user and their APIs
 * @return {Promise<void>}
 */
async function addRedditData(registeredUser: RegisteredUser): Promise<void> {
  Array.from({ length: numberOfPosts }).forEach(async () => {
    let date = faker.date.betweens(startDate, endDate, 1)[0];

    // Create a listing
    let redditListingId = await RedditListing.create({
      dataId: faker.datatype.uuid(),
      title: faker.lorem.sentence(),
      text: faker.lorem.paragraph(),
      date,
      score: parseInt(faker.random.numeric(1, { bannedDigits: ['0'] })),
      numComments: numberOfComments,
      permalink: faker.internet.url(),
      subredditId: registeredUser.redditSubredditId,
    }).then((listing) => {
      return listing.id;
    });

    // create comments on the listing
    Array.from({ length: numberOfComments }).forEach(async () => {
      let randomSentimentData = fakeData[randomIndex()];

      RedditComment.create({
        dataId: faker.datatype.uuid(),
        userName: faker.internet.userName(),
        text: randomSentimentData.review,
        date: faker.date.between(date, endDate),
        score: parseInt(faker.random.numeric(1, { bannedDigits: ['0'] })),
        replies: parseInt(faker.random.numeric(1, { bannedDigits: ['0'] })),
        sentimentAnalysis: randomSentimentData.sentiment,
        subjectivityAnalysis: randomSubjectivity(),
        topicClassification: randomTopicClassification(),
        listingId: redditListingId,
      });
    });
  });
}

/**
 * Adds fake Google Reviews data to the database
 * @param {RegisteredUser} registeredUser - Object that has the database IDs of the user and their APIs
 * @return {Promise<void>}
 */
async function addGoogleReviewsData(
  registeredUser: RegisteredUser
): Promise<void> {
  Array.from({ length: numberOfLocations }).forEach(async () => {
    // Create a location
    const googleReviewsLocation = await GoogleReviewsLocation.create({
      locationId: faker.company.companyName(),
      accountId: registeredUser.googleReviewsAccountId,
    });

    // create comments on the listing
    Array.from({ length: numberOfReviews }).forEach(async () => {
      const date = faker.date.betweens(startDate, endDate, 1)[0];
      const randomSentimentData = fakeData[randomIndex()];

      GoogleReviewsReview.create({
        title: faker.lorem.sentence(),
        review: randomSentimentData.review,
        reviewer: faker.internet.userName(),
        rating: randomRating(),
        response: faker.lorem.paragraph(),
        date: faker.date.between(date, endDate),
        reviewId: faker.datatype.uuid(),
        sentimentAnalysis: randomSentimentData.sentiment,
        subjectivityAnalysis: randomSubjectivity(),
        topicClassification: randomTopicClassification(),
        locationId: googleReviewsLocation.id,
      });
    });
  });
}

/**
 * Wrapper to add the data in order
 * @summary deletes all the data in the database and adds new data
 * @return {Promise<void>}
 */
async function addFakeData(): Promise<void> {
  console.log('Adding fake data...');
  await deleteAllData();
  let registeredUser = await userAndAPIs();
  await addYouTubeData(registeredUser);
  await addFacebookData(registeredUser);
  await addInstagramData(registeredUser);
  await addTwitterData(registeredUser);
  await addRedditData(registeredUser);
  await addGoogleReviewsData(registeredUser);
  console.log('Fake data added.');
}

export default addFakeData;
