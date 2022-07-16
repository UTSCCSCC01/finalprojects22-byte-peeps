import { facebookScheduledJob } from './facebook';
import { instagramScheduledJob } from './instagram';
import { redditScheduledJob } from './reddit';
import { youtubeScheduledJob } from './youtube';
import { twitterScheduledJob } from './twitter';
import { googleReviewsScheduledJob } from './googleReviews';

/**
 * Begins the data pipelines
 * @return {void}
 */
function startPipelines(): void {
  /* Social Media pipelines */
  instagramScheduledJob.start();
  facebookScheduledJob.start();
  twitterScheduledJob.start();
  youtubeScheduledJob.start();
  redditScheduledJob.start();

  /* Review Apps pipelines */
  googleReviewsScheduledJob.start();
}

export default startPipelines;
