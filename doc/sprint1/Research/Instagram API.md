# Instragram API

## Overview
Using Facebook Graph API discussed in the other document, we can request additional permissions to retrieve the data we need from an Instagram page. With the granted permissions, you can do the following:
1. Access the `/me?fields=accounts{connected_instagram_account}` api to retrieve the Instagram account ID
2. Access the `/<instagram_account_id>?fields=media` to retrieve all media (posts)
3. Access the `/<media_id>?fields=comments` to retrieve all comments of media

## Permissions
- `instagram_basic`

## Prerequisites
- Instagram professional account, connected to a Facebook page, with the user being an admin on
- App review is required


## References
- [Instagram API](https://developers.facebook.com/docs/instagram-api/overview)