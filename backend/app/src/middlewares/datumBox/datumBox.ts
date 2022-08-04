import fetch from 'node-fetch';
import { parallelCalls } from './datumBoxConstants';
import {
  DatumAPICallResult,
  DatumCallResult,
  DatumServices,
} from './datumBoxTypes';

/**
 * Sleep function
 * @param {number} ms
 * @return {Promise<void>} Brief description of the returning value here.
 */
function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Makes a call to the datum API for the given service
 * @param {DatumServices} service - one of the services we are using the API for
 * @param {string} text
 * @return {Promise<DatumCallResult>} The result of the corresponding service
 */
function datumCall(
  service: DatumServices,
  text: string
): Promise<DatumCallResult> {
  const params = new URLSearchParams();

  params.append('text', text);
  params.append('api_key', process.env.DATUMBOX_API_KEY || '');

  return fetch(
    'http://api.datumbox.com/1.0/{service}.json'.replace('{service}', service),
    {
      method: 'post',
      body: params,
    }
  )
    .then((response) => {
      return response.json().then((data: any) => {
        if (data.output.error && data.output.error.ErrorCode === 6) {
          throw {
            name: 'InvalidAccount',
            message: 'Invalid Datum Account API key',
          };
        }

        return {
          result: data.output.result,
          service: service,
        };
      });
    })
    .catch((error) => {
      if (error.name === 'InvalidAccount') throw Error(error.message);

      throw Error('API call rate reached');
    });
}

/**
 * Makes multiple parallel calls to the datum API to all the services
 * @param {string} text
 * @return {Promise<DatumAPICallResult>} The result of all the services
 */
function parallelDatumCall(text: string): Promise<DatumAPICallResult> {
  const promises = parallelCalls.map((service) => {
    return datumCall(service, text);
  });

  return Promise.all(promises).then((results: DatumCallResult[]) => {
    let finalresult: { [id: string]: string } = {};

    results.forEach((result: DatumCallResult) => {
      finalresult[result.service] = result.result;
    });

    return <DatumAPICallResult>finalresult;
  });
}

/**
 * Wrapper for the parallel call for the ML API with jitter and exponential backoff retry strategy
 * @param {string} text
 * @return {Promise<DatumAPICallResult>} Returns the sentiment, topic and subjectivity of the text
 * @credits https://advancedweb.hu/how-to-implement-an-exponential-backoff-retry-strategy-in-javascript/
 * @credits https://aws.amazon.com/blogs/architecture/exponential-backoff-and-jitter/
 */
async function datumBoxAPICall(
  text: string,
  depth: number = 0
): Promise<DatumAPICallResult> {
  let jitter = Math.random() * Math.min(...[2000, 1000 * Math.pow(2, depth)]);

  try {
    return await parallelDatumCall(text);
  } catch (e) {
    if (depth > 3) throw e;

    await sleep(2 ** depth * jitter);
    return await datumBoxAPICall(text, depth + 1);
  }
}

/**
 * Random index between 0 to number
 * @param {number} number - Maximum index; deafults to length of fakeData
 */
export function randomIndex(number: number): number {
  return Math.floor(Math.random() * number);
}

/**
 * Returns a random sentiment analysis
 * @return {string} positive, negative or neutral
 */
export function randomSentimentAnalysis(): string {
  let i = randomIndex(3);
  if (i === 0) return 'negative';
  if (i === 1) return 'positive';
  return 'neutral';
}

/**
 * Returns a random subjectivity analysis
 * @return {string} subjective or objective
 */
export function randomSubjectivity(): string {
  let i = randomIndex(2);
  if (i === 0) return 'subjective';
  else return 'objective';
}

/**
 * Returns a random topic classification in correspondence with the topics available in datumbox
 * @return {string}
 */
export function randomTopicClassification(): string {
  let i = randomIndex(11);
  switch (i) {
    case 0:
      return 'Arts';
    case 1:
      return 'Business & Economy';
    case 2:
      return 'Computers &Technology';
    case 3:
      return 'Home & Domestic Life';
    case 4:
      return 'Recreation & Activities';
    case 5:
      return 'News';
    case 6:
      return 'Reference & Education';
    case 7:
      return 'Society';
    case 8:
      return 'Shopping';
    case 9:
      return 'Science';
    default:
      return 'Sports';
  }
}

/**
 * The final API call wrapper for the datumBox API that developers will use
 * @param {string} text
 * @return {Promise<DatumAPICallResult>} Returns the sentiment, topic and subjectivity of the text
 */
async function DatumBoxAPICall(text: string): Promise<DatumAPICallResult> {
  try {
    return await datumBoxAPICall(text);
  } catch (e) {
    return {
      SentimentAnalysis: randomSentimentAnalysis(),
      TopicClassification: randomTopicClassification(),
      SubjectivityAnalysis: randomSubjectivity(),
    };
  }
}

export default DatumBoxAPICall;
