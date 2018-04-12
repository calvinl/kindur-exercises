const combos = require('./combos');

const runTest = (str, expected) => {
  test(str, function() {
    expect(combos(str).sort()).toEqual(expected.sort());
  });
};

describe('combos()', function() {
  runTest('X0', ['00', '10']);
  runTest('XX0', ['000', '010', '110', '100']);
  runTest('XXX', ['000', '001', '010', '011', '100', '101', '110', '111']);
  runTest('10X10X0', ['1001000', '1001010', '1011000', '1011010']);
});
