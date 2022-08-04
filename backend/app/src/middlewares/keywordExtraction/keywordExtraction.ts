import { spawn } from 'child_process';

export type KeywordExtractionResult = {
  value: string;
  count: number;
}[];

export type KeywordExtractionPython = [value: string, count: number][];

/**
 * Extracts keywords from a string of text
 * @param {string} text
 * @return {{value: string, count: number}[]} keyword and its score list
 */
export async function keywordExtraction(
  text: string
): Promise<KeywordExtractionResult> {
  let keywords: KeywordExtractionResult = [];
  let error: string = '';

  const process = spawn('python3', [
    `${__dirname}/keywordExtraction.py`,
    removeAllPunctuation(text),
  ]);

  process.stdout.on('data', (data: JSON) => {
    let pythonResult: KeywordExtractionPython = JSON.parse(data.toString());

    keywords = pythonResult.map((item) => {
      return {
        value: item[0],
        count: item[1],
      };
    });
  });

  process.stderr.on('data', (data) => {
    error = data.toString();
  });

  const exitCode = await new Promise((resolve, reject) => {
    process.on('close', resolve);
  });

  if (exitCode)
    throw new Error(`Keyword extraction error exit ${exitCode}, ${error}`);

  return keywords;
}

/**
 * Removes all all puncuations from a string of text
 * @param {String} text
 * @return {Text} String removed of all punctuations
 * @note regex obtained from https://stackoverflow.com/questions/4328500/how-can-i-strip-all-punctuation-from-a-string-in-javascript-using-regex/4328546#4328546
 */
function removeAllPunctuation(text: string): string {
  return text
    .replace('\n', ' ')
    .replace(/[^\w\s\']|_/g, '')
    .replace(
      /[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,\-.\/:;<=>?@\[\]^_`{|}~]/g,
      ''
    )
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?[]]/g, '')
    .replace(/\s+/g, ' ')
    .slice(0, 10000); // ! limit to 10000 characters for now
}

// let text = `Thanks man, i watched your videos on the subway every day, and it helped me
// to spend that time studying. I appreciate it and I passed the tests for google, now in team matching!
// i almost committed a crime trying to solve this problem by myself thanks for helping me not become a felon leftMin and leftMax is our possibility range where leftMin is decrease choice, leftMax is increase choice. Since we only care if our leftMin can reach 0, if leftMin < 0, we reset it to 0 to eliminate other invalid possibilities.
// I was really conflicted about why we reset leftMin whenever we fall below 0, but then convinced myself with this argument:
// Hey man, thanks for all your effort and congrats on your recent job! I was wondering if you could make a video for Leetcode problem 2115. Find all Possible Recipes? I'm having a hard time trying to understand it. Thanks
// Try to understand the greedy idea for hours but it does not work for me intuitively. So I come back to the 2 stacks solution. Thanks for the explanation. I have been using your Neetcode 150 every day since a month ago. Thanks a lot!
// please make a video on Find the Closest Palindrome
// An easier solution would be to use two stacks.
// You have already uploaded a video of this problem (same kind)
// Pls solve the 3rd problem from today's contest.
// i fails to understand why one single counter is not enough for this problem,
// traverse through the string,
// increment counter for open parenthesis and decrement it for closed parenthesis,
// if counter goes negative at any time, means invalid, and if counter didn't reach 0 at the end, invalid,
// isn't this very simple logic enough for this problem?
// someone please correct me.
// Some questions are not meant to start your day with
// i love you daddy neetcode
// For the first time, i didn't understand your explanation`;

// (async () => {
//   let result = await keywordExtraction(text);
//   console.log('finalresult', result);
// })();
