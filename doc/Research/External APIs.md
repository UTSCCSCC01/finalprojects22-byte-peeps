## External APIs

### Machine Learning - DatumBox

- Our Datum NodeJS library using DatumBox API:

  - Was created because the [old library](https://github.com/ArkeologeN/node-datumbox) is outdated, based on void return callbacks only and using critically vulnerable dependencies
  - Only used for Sentiment Analysis, Topic Classification and Subjectivity Analysis
  - Example usage:
    ```
    let text = 'Omg I love this!';
    let response = await MLCallWithRetry(text);
    console.log(response);
    ```
  - Example response:
    ```
    {
      SentimentAnalysis: 'negative',
      TopicClassification: 'Home & Domestic Life',
      SubjectivityAnalysis: 'subjective'
    }
    ```
  - Multiple texts example:
    ```
    for (let i = 0; i < list.length; i++) {
      const result = await MLCallWithRetry(list[i]);
      console.log(result);
    }
    ```
  - **Note:** An await inside a for loop is a code smell but it is because API call rate is limited
  - **Note:** It implements Jitter and Exponential backoff as a its retry policy when it fails

- External API Research:

  - Base:

    - Average length of comments: 300 characters (rouding of tweet length)

- Google API

  - Quota:

    - per month
    - calls of 1000 characters max (otherwise counts as two calls)
    - Sentiment Analysis: 5000 comments
    - Content Classification: 30000 comments

  - Has:

    - Sentiment analysis
    - Content classification
    - Students have free credits

    - Drawbacks:
    - Needs credit card registration
    - No keyword extraction

- Microsoft API

  - Quota:

    - per month
    - Calls of 1000 characters max (otherwise counts as two calls)
    - 5000 comments everything combined

  - Has:

    - Sentiment analysis
    - Content classification
    - Keyword extraction

  - Drawbacks:

    - Needs credit card registration

- Amazon API

  - Quota:

    - per month
    - 100 characters === 1 unit
    - 50k units allowed per month
    - 5000 comments everything combined

  - Has:

    - Sentiment analysis
    - Content classification
    - Keyword extraction

  - Drawbacks:

    - Needs credit card registration

- Datumbox

  - Quota:

    - per day
    - 1,000 calls

  - Has:

    - Sentiment analysis
    - Content classification
    - Keyword extraction

  - Drawbacks:
    - Old wrapper implementation that depends on vulnerable versions of helper libraries (Made our own wrapper library)

- Stopped the research here since this wins by miles due to having quota per day rather than per month and doesn't require credit card registration)
