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

### Machine Learning - Keyword Extraction

- The Datum API has keyword extraction however it doesn't remove [stopwords](https://en.wikipedia.org/wiki/Stop_word). Therefore, a separate API/algorithm is used to extract keywords.
- The library that uses the library was achieved from [node-rake](https://www.npmjs.com/package/node-rake) based on the popular NLP [RAKE](https://www.researchgate.net/publication/227988510_Automatic_Keyword_Extraction_from_Individual_Documents) algorithm with a node wrapper.
- The stopwords used were obtained from the [stopwords-en](https://github.com/stopwords-iso/stopwords-en)
- In this manner, we will not have a limit on the number of API calls and have a decent proof of concept.
- Unfortunately the library introduced doesn't return the score for each keyword, therefore we assign them scores based on ordering to ensure a decent proof of concept.
- Later this can be replaced by a paid for API
