const csvtojson = require('csvtojson');
const { writeFileSync } = require('fs');

type dataSetItem = {
  clean_text: string;
  category: number;
};

const numOfItems = 50000;

/**
 * Converts a csv dataset file to a json file with numOfItems items.
 * @param {string} filePath
 * @return {void}
 */
async function convertToJSON(filePath: string): Promise<void> {
  const json = await csvtojson().fromFile(filePath);
  const finalJSON = json.slice(0, numOfItems).map((item: dataSetItem) => {
    return {
      review: item.clean_text,
      sentiment: classifySentiment(item.category),
    };
  });
  writeFileSync('./fakeDataJSON.json', JSON.stringify(finalJSON));
}

/**
 * Maps the sentiment category (-1, 0, 1) to a sentiment value (negative, neutral, positive).
 * @param {number} sentiment
 * @return {string}
 */
function classifySentiment(sentiment: number): string {
  if (sentiment < 0) {
    return 'negative';
  }
  if (sentiment > 0) {
    return 'positive';
  }
  return 'neutral';
}

convertToJSON('./Twitter_Data.csv');
