# Twitter API

## Overview
With Twitter API (v2), you can simply create an `Essential` account that has free and intermediate access. In order to use the API, you may use the bearer token provided.

## Prerequisites
- Twitter App

## Limitations
- 500k 
- Paging is required with some requests such as retrieving tweets

## Useful Endpoints
- Retrieve user ID by username: `https://api.twitter.com/2/users/by/username/:username`
  > 300 requests / 15 mins
- Retrieve user tweets by user ID: `https://api.twitter.com/2/users/:id/tweets?tweet.fields=created_at,conversation_id,public_metrics`
  > By default, the most recent ten Tweets are returned per request. Using pagination, the most recent 3,200 Tweets can be retrieved.
- Retrieve tweet by ID: `https://api.twitter.com/2/tweets/:id?tweet.fields=created_at,public_metrics`
- Retrieve tweet conversations: `https://api.twitter.com/2/tweets/search/recent?query=conversation_id:<CONVERDATION_ID>&tweet.fields=created_at,public_metrics`

## References

- [Sign Up for Twitter API](https://developer.twitter.com/en/docs/twitter-api)
- [Developer Portal](https://developer.twitter.com/en/portal)
- [Postman Endpoints](https://t.co/twitter-api-postman)
- [Conversations](https://developer.twitter.com/en/docs/twitter-api/conversation-id)
