# Facebook API

## Overview
Facebook provides an API called Facebook Graph API which facilitates the retrieval of data related to a Facebook page.

To be able to use Facebook Graph API, we must first register as a Facebook Developer and create a Facebook App. This will allow us to authenticate and solicit permissions of our users' Facebook pages. 

## Prerequisites
- We must register an account as Facebook Developer
- We must create a Facebook App
- We must either:
  - Ask the user to provide us with a "short-lived user access token", so that we can create a "long-lived user access token" and consequently be able to generate a "long-lived page access token" that will work as our permanent access token, or
  - Create a login feature with our Facebook App. Through this, we will ask for permissions to manage the user's pages. This will give us a user access token that is accessible no longer than 90 days

## Permissions
- Page Public Content Access

### Endpoints
1. Access the `/me` api to retrieve the Facebook account ID
2. Access the `/med/posts` to retrieve all posts
3. Access the `/<post_id>/comments` to retrieve all comments of a post

## References
- [Creating a Facebook app](https://developers.facebook.com/apps)
- [Retrieving tokens manually](https://developers.facebook.com/docs/marketing-apis/overview/authentication/)
- [Retrieving long-lives-access tokens](https://developers.facebook.com/docs/facebook-login/guides/access-tokens/get-long-lived)
- [Permission scopes](https://developers.facebook.com/docs/permissions/reference/)
- [Facebook login with App expiry](https://developers.facebook.com/docs/facebook-login/auth-vs-data/)
- [Graph API](https://developers.facebook.com/tools/explorer/)
