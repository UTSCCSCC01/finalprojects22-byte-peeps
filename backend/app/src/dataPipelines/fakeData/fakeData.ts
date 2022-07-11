import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';
import FacebookApi from '../../models/facebook/api';
import FacebookComment from '../../models/facebook/comment';
import FacebookPost from '../../models/facebook/post';
import InstagramApi from '../../models/instagram/api';
import InstagramComment from '../../models/instagram/comment';
import InstagramMedia from '../../models/instagram/media';
import RedditSubreddit from '../../models/reddit/subreddit';
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
};

const startDate: string = '2022-06-15T00:00:00.000Z';
const endDate: string = '2022-07-15T23:59:59.999Z';
const numberOfPosts = 30;
const numberOfComments = 50;

/**
 * Random index between 0 to number
 * @param {number} number - Maximum index; deafults to length of fakeData
 */
function randomIndex(number: number = fakeData.length): number {
  return Math.floor(Math.random() * number);
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
  await User.destroy({ where: {} });
  await YouTubeChannel.destroy({ where: {} });
  await YouTubeVideo.destroy({ where: {} });
  await YouTubeComment.destroy({ where: {} });
  await FacebookApi.destroy({ where: {} });
  await FacebookPost.destroy({ where: {} });
  await FacebookComment.destroy({ where: {} });
  await InstagramApi.destroy({ where: {} });
  await InstagramMedia.destroy({ where: {} });
  await InstagramComment.destroy({ where: {} });
  await RedditSubreddit.destroy({ where: {} });
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

  // add reddit subreddit
  let redditSubredditId = await RedditSubreddit.create({
    name: 'utsc',
    userId,
  }).then((api) => {
    if (api) return api.id;
    return 1;
  });

  // add twitter user

  return {
    userId,
    youtubeChannelId,
    facebookApiId,
    instagramApiId,
    redditSubredditId,
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

    // Create a facebook post
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
}

/**
 * Adds fake reddit data to the database
 * @param {RegisteredUser} registeredUser - Object that has the database IDs of the user and their APIs
 * @return {Promise<void>}
 */
async function addRedditData(registeredUser: RegisteredUser): Promise<void> {}

/**
 * Adds fake twitter data to the database
 * @param {RegisteredUser} registeredUser - Object that has the database IDs of the user and their APIs
 * @return {Promise<void>}
 */
async function addTwitterData(registeredUser: RegisteredUser): Promise<void> {}

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
  await addRedditData(registeredUser);
  await addTwitterData(registeredUser);
  console.log('Fake data added.');
}

export default addFakeData;
