import keyword_extractor from 'keyword-extractor';

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
  let keywordsExtracted = keyword_extractor.extract(
    removeAllPunctuation(text),
    {
      language: 'english',
      remove_digits: true,
      return_changed_case: true,
      remove_duplicates: false,
    }
  );

  let keywordsCount: { [key: string]: number } = {};

  for (const keyword of keywordsExtracted) {
    if (keywordsCount[keyword]) {
      keywordsCount[keyword]++;
    } else {
      keywordsCount[keyword] = 1;
    }
  }

  // Create items array
  let keywords: [string, number][] = Object.keys(keywordsCount).map(function (
    key
  ) {
    return [key, keywordsCount[key]];
  });

  // Sort the array based on the second element
  keywords.sort(function (first, second) {
    return second[1] - first[1];
  });

  let result: { value: string; count: number }[] = [];

  keywords.slice(0, 30).forEach((keyword: [string, number], index: number) => {
    result.push({ value: keyword[0], count: 30 - index });
  });

  return result;
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
