const findPair = require('./lib/findPair');

// process command line argument
const [filename, balance = 0] = process.argv.slice(2);

if (!filename) {
  throw new Error('Must include a filename.');
}

findPair(filename, parseInt(balance)).then(items => {
  if (!items.length) {
    console.log('Not possible');
  } else {
    console.log(
      items
        .map(item => {
          return `${item.name} ${item.price}`;
        })
        .join(', ')
    );
  }
});
