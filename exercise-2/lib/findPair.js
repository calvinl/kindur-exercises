const { transform } = require('lodash');
const parseFile = require('./parseFile');
const path = require('path');

module.exports = async function findPair(filename, balance = 0) {
  let data = await parseFile(filename);
  let len = data.length;
  let items = [];
  let bestSum = 0;

  // O(N^2)
  for (let x = 0; x < len; x++) {
    for (y = 0; y < len; y++) {
      if (y === x) continue;

      const sum = data[x].price + data[y].price;

      if (sum > bestSum && sum <= balance) {
        bestSum = sum;

        items = [data[x], data[y]];

        if (bestSum === balance) {
          break;
        }
      }
    }
  }

  return items;
};
