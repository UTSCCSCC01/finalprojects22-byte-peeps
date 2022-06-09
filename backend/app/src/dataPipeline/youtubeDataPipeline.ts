import {google} from "googleapis";
import { CronJob } from "cron";

/**
 * Updates the database as follows:
 *      1. Fetches all channel ids from db
 *      2. Fetches all video data for all the retrieved channel ids from (1)
 *      then updates db with any new video since the last run of this function.
 *          - Uses YouTube Data API v3
 *      3. Fetches all video ids from db and retrieves all comments and threads
 *      for each video to update the db.
 */
async function startPipeline() {
    updateVideos();
    updateComments();
}

/**
 * Uses the YouTube Data API to fetch and store information relating
 * to all the videos belonging to all channels within the db
 */
function updateVideos() {
    
}

/**
 * Uses the YouTube Data API to fetch and store information relating
 * to all comments under every video within the db
 */
function updateComments() {

}

const job = new CronJob(
    '0 0 * * *',  // Daily
    startPipeline,
    null,
    false,
    'America/Toronto',
);

job.start();