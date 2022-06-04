# Facebook API

## Overview

I have found two ways to do this, both ways require a Facebook App created on our end.

1. The first requires the user to generate a "short-lived user access token" and provide it to us. We will use it to create a "long-lived user access token", which we will use to create a "long-lived page access token". Once that is done, we only need to store the last token and it will never expire

2. The second is the normal way to do it. We create a login feature with our Facebook App. Through this, we will ask for permissions to manage the user's pages. This will give us a user access token that is accessible no longer than 90 days

## Graph API

Once we have a token, we can use the Graph API to retrieve data

### Retrieving posts with comments

Perform a get request:

```
https://graph.facebook.com/v14.0/me?access_token=<ACCESS_TOKEN>&fields=posts{comments}
```

The end result will include:

```
{
  "posts": {
    "data": [
      {
        "comments": {
          "data": [
            {
              "created_time": "2022-06-02T19:26:22+0000",
              "from": {
                "name": "Xperience",
                "id": "112533588141071"
              },
              "message": "Test comment",
              "id": "112544528139977_712696229940206"
            }
          ]
        },
        "id": "112533588141071_112544528139977"
      }
    ]
  },
  "id": "112533588141071"
}
```

## Prerequisites

- Facebook App

## References

- [Creating a Facebook app](https://developers.facebook.com/apps)
- [Retrieving tokens manually](https://developers.facebook.com/docs/marketing-apis/overview/authentication/)
- [Retrieving long-lives-access tokens](https://developers.facebook.com/docs/facebook-login/guides/access-tokens/get-long-lived)
- [Permission scopes](https://developers.facebook.com/docs/permissions/reference/)
- [Facebook login with App expiry](https://developers.facebook.com/docs/facebook-login/auth-vs-data/)
- [Graph API](https://developers.facebook.com/tools/explorer/)
