module.exports = function combos(str) {
  const chars = str.split('');
  const len = chars.length;
  const num = chars.filter(x => x === 'X').length;
  const combinations = Math.pow(2, num);

  let result = [];

  for (let x = 0; x < combinations; x++) {
    let count = 0;
    let str = '';
    const combo = [];

    for (y = 0; y < num; y++) {
      combo.push((x >> y) & 1 ? 1 : 0);
    }

    for (let j = 0; j < len; j++) {
      let char = '' + chars[j];

      if (chars[j] === 'X') {
        char = '' + combo[count++];
      }

      // save to result string
      str += char;

      // stream to console
      process.stdout.write(char);
    }

    result.push(str);

    process.stdout.write('\n');
  }

  return result;
};
