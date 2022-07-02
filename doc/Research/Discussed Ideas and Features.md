# Features

To aggregate data and present it in one platform

## Specific features

Surveys:

- Create a survey (interact with the google froms API)
- Upload list of emails of users to send it to
- Send it to customers
- Provide the survey answers (to open ended questions)
- Analysis on the survey answers (implementation of general features)

Customer Reviews:

- Google business reviews and yelp:
  - Num. of stars (pie chart of 1,2,3,4,5 stars)
  - Content of review

Interviews and emails:

- Form submission: can submit the important highlights of the interview and email content

Social Media:

- Facebook:

  - Posts (and stats on them)
  - Comments on their page
  - Mentions of their page

- Instagram:

  - Posts (and stats on them)
  - Comments on their posts (and stats on them)
  - Tags of their page (and stats on them)

- Twitter:

  - Tweets (and stats on them)
  - Replies of their tweets (and stats on them)
  - Tweets that mention them (and stats on them)
  - Hashtags in tweets (and stats on them)

- YouTube:
  - Posts (and stats on them)
  - Comments (and stats on them)

Overall score

- Like [Page Speed](https://pagespeed.web.dev/)
- Generic things that they can improve:
  1. Overall Sentiment Analysis
  2. Most positive platform
  3. Most negative platform
  4. Posts posted on monday have the worst feedback

Website performance software (lowest priority):

- Google Analytics - need to do further research on the data/metrics we can pull

## General features (Text Analysis and Text Mining)

1. Word Clusters
2. Content Classification - Classify the comments together into different groups (machine learning)
3. Sentiment analysis - Positive, negative or neutral
4. Pie charts for scale based answers, e.g. 1,2,3,4,5 stars
5. Aggregating all data together and doing analysis
6. Filtering to only see certain data, by date and platform

## Foregone Features

Hashtags on Facebook and Instagram have been foregone due to not being possible to implement for the following reasons:

1. You can only pull up to 30 hashtags every 7 days

2. The Instagram APIs related to hashtags are not very helpful for our purpose:

   - One gives you information about a hashtag given its id
   - The other gives you the recent hashtag searches by the user. Hence there's no direct way to get used/recommended hashtags other than recommending them ourselves based on comments/tags/posts

Mentions on Facebook and Instagram for the following reasons:

- Mentions refer to comments/posts in which the company @ was mentioned. Unfortunately, Instagram Graph API doesn't have an endpoint to get your company's mentions, you can only respond to them but you must know the id in advance.
- The only way to get mentions data is through a webhook, but this may be a little complex to configure for the user.
- Therefore, I instead focused on tags, which are posts in which you 'appear' or in which people tag you (different from a mention in the caption). These do have a GET endpoint in the Graph API and will be much simpler to fetch. So I think it's better to focus on tags instead of mentions.
