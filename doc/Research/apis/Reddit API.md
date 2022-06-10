# Reddit API

## Overview
Turns we don't need to use Reddit's API. They simply provide a `.json` extension in the URL that allows us to retrieve data in JSON.

## Prerequisites
- Nothing :D

## Useful Endpoints
- Retrieve reddit listings: `https://www.reddit.com/r/utsc/new.json?sort=new`
- Retrieve next page listings: `http://www.reddit.com/r/utsc/new.json?sort=new&after=<AFTER_FIELD_PROVIDED_IN_LAST_RESPONSE>`
- Listing responses: `https://www.reddit.com/r/UTSC/comments/v8t4jx/asking_for_friends_here_is_weird_asf.json` (this can be retrieved from the listing. Each listing response has a `replies` field that contains all of it's replies recursively)

## References
- [Finding next page](https://www.reddit.com/r/redditdev/comments/d7egb/how_to_get_more_json_results_i_get_only_30/)