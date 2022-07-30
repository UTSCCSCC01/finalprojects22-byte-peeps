const rake = require('node-rake');
const stopwords = require('stopwords-en');

const opts = { stopwords: stopwords };

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
    .replace(/\s+/g, ' ');
}

/**
 * Extracts keywords from a string of text
 * @param {string} text
 * @return {{value: string, count: number}[]} keyword and its score list
 */
export function keywordExtraction(
  text: string
): { value: string; count: number }[] {
  const keywords = rake.generate(removeAllPunctuation(text), opts);

  let result: { value: string; count: number }[] = [];

  keywords.slice(0, 8).forEach((keyword: string, index: number) => {
    result.push({ value: keyword, count: 8 - index });
  });

  return result;
}
