import User from '../../models/user/user';
import bcrypt from 'bcrypt';
import YouTubeChannel from '../../models/youtube/channel';
import YouTubeVideo from '../../models/youtube/video';
import YouTubeComment from '../../models/youtube/comment';
import { faker } from '@faker-js/faker';
import { convertCompilerOptionsFromJson } from 'typescript';
import FacebookApi from '../../models/facebook/api';
import FacebookPost from '../../models/facebook/post';
import FacebookComment from '../../models/facebook/comment';
const fakeData = require('./fakeDataJSON.json');

type RegisteredUser = {
  userId: number;
  youtubeChannelId: number;
  facebookApiId: number;
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

function randomSubjectivity(): string {
  let i = randomIndex(2);
  if (i === 0) return 'subjective';
  else return 'objective';
}

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

async function deleteAllData(): Promise<void> {
  await User.destroy({ where: {} });
  await YouTubeChannel.destroy({ where: {} });
  await YouTubeVideo.destroy({ where: {} });
  await YouTubeComment.destroy({ where: {} });
}

/**
 * Brief description of the function here.
 * @summary If the description is long, write your summary here. Otherwise, feel free to remove this.
 * @param {ParamDataTypeHere} parameterNameHere - Brief description of the parameter here. Note: For other notations of data types, please refer to JSDocs: DataTypes command.
 * @return {ReturnValueDataTypeHere} Brief description of the returning value here.
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
    name: username,
    isActive: true,
    userId,
    oauth: '',
  }).then((channel) => {
    return channel.id;
  });

  // add facebook page
  let facebookApiId = await FacebookApi.create({
    token: faker.datatype.uuid(),
    isActive: true,
    pageId: faker.datatype.uuid(),
    userId,
  }).then((api) => {
    if (api) return api.id;
    return 1;
  });

  // add instagram api
  // add twitter user
  // add reddit subreddit

  return {
    userId,
    youtubeChannelId,
    facebookApiId,
  };
}

/**
 * Adds fake youtube data to the database
 * @param {RegisteredUser} registeredUser - Brief description of the parameter here. Note: For other notations of data types, please refer to JSDocs: DataTypes command.
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

async function addInstagramData(
  registeredUser: RegisteredUser
): Promise<void> {}

async function addRedditData(registeredUser: RegisteredUser): Promise<void> {}

async function addTwitterData(registeredUser: RegisteredUser): Promise<void> {}

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
