const { transform } = require('lodash');
const parseFile = require('./parseFile');
const path = require('path');

module.exports = async function findPair(filename, balance = 0, maxItems = 2) {
  let data = await parseFile(filename);
  let remaining = balance;

  // O(N)
  return transform(
    // Since we want to find the maximum spend on 2 distinct items, we sort
    // the dataset by descending price so that the largest items can be
    // purchased first.
    data.sort((a, b) => b.price > a.price),

    // process each item
    (result, item) => {
      // if we can afford the item, push it into our results array and subtract
      // the cost of it from our remaining balance.
      if (item.price <= remaining) {
        remaining -= item.price;
        result.push(item);
      }

      // exit early once our quota has been met
      if (result.length === maxItems) {
        return false;
      }
    },
    []
  );
};
