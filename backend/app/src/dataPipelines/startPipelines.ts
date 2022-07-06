import { facebookScheduledJob } from './facebook';
import { instagramScheduledJob } from './instagram';
import { redditScheduledJob } from './reddit';
import { youtubeScheduledJob } from './youtube';

/**
 * Begins the data pipelines
 * @return {void}
 */
function startPipelines(): void {
  instagramScheduledJob.start();
  facebookScheduledJob.start();
  youtubeScheduledJob.start();
  redditScheduledJob.start();
}

export default startPipelines;
