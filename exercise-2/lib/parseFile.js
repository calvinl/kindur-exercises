const { readFile } = require('fs');
const { promisify } = require('util');
const path = require('path');

module.exports = async function parseFile(filename, encoding = 'utf-8') {
  const filepath = path.join(__dirname, '..', filename);

  try {
    const contents = await promisify(readFile)(filepath, encoding);

    // O(N)
    return (
      contents
        // split the data by newline
        .split('\n')

        // convert each row into a keyed object
        .map(row => {
          const [name, price] = row.split(',');

          return {
            name: (name && name.trim()) || null,
            price: (price && parseInt(price.trim())) || null
          };
        })

        // filter out all items that do not have a price
        .filter(row => !!row.price)
    );
  } catch (err) {
    throw new Error('Error parsing file at ' + filepath + '.');
  }
}
