# Instragram API

## Overview
The Facebook Graph API (discussed in Facebook API.md), can be configured with additional permissions to enable the retrieval of data related to an Instagram page. 

The Instagram page must be connected to the Facebook account, so that there's a shared access token with which you can use to authenticate and pull data from both platforms.

## Prerequisites
- The user must have an Instagram professional account that is connected to a Facebook page
- We must either:
    - Be granted with permissions by a user that has a role in the Facebook page, or
    - Be granted with permissions through the App Review process

## Permissions
- `instagram_basic`

## Endpoints
1. Access the `/me?fields=connected_instagram_account` api to retrieve the Instagram account ID
2. Access the `/<instagram_account_id>/media` to retrieve all media (posts)
3. Access the `/<media_id>/comments` to retrieve all comments of a media instance (post)
4. Access the `/<instagram_account_id>/tags` to retrieve all media (posts) in which the account was tagged

## Limitations
- Comment mentions can't be fetched in bulk, they can only be retrieved by passing a comment id, hence we won't be able to pull them as desired
- Hashtags do not have any endpoint that aligns with our needs, hence we wont be able to pull them as desired

## References
- [Instagram API](https://developers.facebook.com/docs/instagram-api/overview)
- [Media Endpoint](https://developers.facebook.com/docs/instagram-api/reference/ig-user/media)
- [Comments Endpoint](https://developers.facebook.com/docs/instagram-api/reference/ig-media/comments)
- [Tags Endpoints](https://developers.facebook.com/docs/instagram-api/reference/ig-user/tags)