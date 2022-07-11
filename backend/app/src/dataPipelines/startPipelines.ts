import { facebookScheduledJob } from './facebook';
import { instagramScheduledJob } from './instagram';
import { redditScheduledJob } from './reddit';
import { youtubeScheduledJob } from './youtube';
import { twitterScheduledJob } from './twitter';

/**
 * Begins the data pipelines
 * @return {void}
 */
function startPipelines(): void {
  instagramScheduledJob.start();
  facebookScheduledJob.start();
  twitterScheduledJob.start();
  youtubeScheduledJob.start();
  redditScheduledJob.start();
}

export default startPipelines;
