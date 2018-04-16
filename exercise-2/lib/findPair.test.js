const findPair = require('./findPair');

describe('findPaid()', function() {
  describe('when given a valid filename', function() {
    const testBalance = function(balance, expected) {
      test(balance, async function() {
        const items = await findPair('fixtures/prices.txt', balance);
        expect(items.map(i => i.name)).toEqual(expected);
      });
    };

    describe('with various balances', function() {
      testBalance(-1000, []);
      testBalance(0, []);
      testBalance(100, []);
      testBalance(1100, []);
      testBalance(1200, ['Candy Bar', 'Paperback Book']);
      testBalance(1700, ['Paperback Book', 'Detergent']);
      testBalance(2300, ['Paperback Book', 'Headphones']);
      testBalance(2400, ['Detergent', 'Headphones']);
      testBalance(3000, ['Detergent', 'Earmuffs']);
      testBalance(7000, ['Detergent', 'Bluetooth Stereo']);
      testBalance(10000, ['Earmuffs', 'Bluetooth Stereo']);
    });
  });

  describe('when given an invalid filename path', function() {
    test('throws an error', function() {
      expect(findPair('invalid.txt', 2000)).rejects.toThrowError(
        /Error parsing file/
      );
    });
  });
});
