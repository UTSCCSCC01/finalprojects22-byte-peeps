import fetch from 'node-fetch';
import { parallelCalls } from './datumConstant';
import {
  DatumAPICallResult,
  DatumCallResult,
  DatumServices,
} from './datumTypes';

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

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
      return response.json().then((data) => {
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
 * Makes the call for the ML API with jitter and exponential backoff retry strategy
 * @param {string} text
 * @return {[string, string, string]} Returns the sentiment, topic and subjectivity of the text
 * @credits https://advancedweb.hu/how-to-implement-an-exponential-backoff-retry-strategy-in-javascript/
 * @credits https://aws.amazon.com/blogs/architecture/exponential-backoff-and-jitter/
 */
async function datumAPICall(
  text: string,
  depth: number = 0
): Promise<DatumAPICallResult> {
  let jitter = Math.random() * Math.min(...[2000, 1000 * Math.pow(2, depth)]);

  try {
    return await parallelDatumCall(text);
  } catch (e) {
    if (depth > 3) throw e;

    await sleep(2 ** depth * jitter);
    return await datumAPICall(text, depth + 1);
  }
}

async function DatumAPICall(text: string): Promise<DatumAPICallResult> {
  return await datumAPICall(text);
}

export default DatumAPICall;
