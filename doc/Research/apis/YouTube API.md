# YouTube APIs
There are three APIs that might be of interest to us:
1. [YouTube Analytics & Reporting API](https://developers.google.com/youtube/analytics)
   * Is separated into Channel Owners vs Content Owners.
     * Channel owner = Not in the partner program.
     * Content owner = Users in the partner program
       * Possibly tied to our personas
       * Content owners can have multiple channels linked to their account
         * This part of the API gets reports for all their channels without doing multiple API calls
   * Can get statistics related to user activity:
     * Watch time metrics
     * Activity by US states
     * Demographics; age group + gender
     * Traffic sources (Where the viewer found the video; YouTube search vs direct link etc)
   * NOTE: There is a `combined` option that might make it possible to fetch all this information in 1 API call.
2. [YouTube Data API v3](https://developers.google.com/youtube/v3)
   * This is the main focus for sprint0. [Docs Here](https://developers.google.com/youtube/v3/docs/)
   * Can retrieve the following:
     * [Comments](https://developers.google.com/youtube/v3/docs/comments/list): `GET https://www.googleapis.com/youtube/v3/comments`
     * [Comment Threads](https://developers.google.com/youtube/v3/docs/commentThreads/list): `GET https://www.googleapis.com/youtube/v3/commentThreads`
       * Max amount per API call is 100.

## YouTube Data API v3
### Basics
[VIDEO: Getting started with YouTube Data API](https://www.youtube.com/watch?v=TE66McLMMEw)
1. You need one of the following to make requests:
   * API Key
     * Go to the [Datalytic dev console](https://console.cloud.google.com/apis/dashboard?project=datalytic)
       * Note: You need to be logged into our Google account
         * Email: `c01datalytic@gmail.com`
         * Pass: `mmeDLyta2ZfwLzx`
   * OAuth 2.0 Token
2. There is a [Node.js client library](https://developers.google.com/api-client-library) for YouTube Data API v3
   * **IMPORTANT:** [VIDEO: Setup Node.js client library](https://www.youtube.com/watch?v=QZ4BXGgmATU)

### Overview
These are the steps involved in scraping comments on all videos of a channel:
1. Obtaining a channel id
2. Obtaining video ids
3. Obtaining comments and replies on each video

### Obtaining channel id
There are two approaches to obtaining the channel ID:
1. Ask our users for their **channel ID** in the front end and save it to our DB
   * Worse user experience
     * It's not difficult to find channel id, it just requires several clicks to find
   * Easier to implement
2. Allow our users to query their channel name directly on our Datalytic web app
   * Better user experience
     * Clients will simply search and have a few autocompleted results which they can choose from 
   * Harder to implement
     * Requires figuring out how to implement autocompletion on our app (more work for us)

### Scraping videos given a channel id
Now that we have a channel ID, we are able to fetch all video ids
* [VIDEO: Getting a channels uploads]()

### Scraping comments given a video id
* [VIDEO: Scraping comments & replies for any video](https://www.youtube.com/watch?v=Mzj3_FjuDuI)

### Rate Limiting
* **Quota**: 10,000 units per day
    * Most of the `list` methods are worth 1 unit.
* Depending on our implementation our quotas might look like this:
  * At least 1 unit for getting video ids
    * Should store video ids into our db to possibly prevent over-use
  * If channel has x number of videos, then we use at least x units for getting comments/threads

### DB Design:
You can find the DB design [HERE](https://docs.google.com/document/d/1IYXgbMud2iL0dtSkpKg996P5UphQb_af0f8U5hCWJD0/edit?usp=sharing)