const findPair = require('./findPair');

describe('findPaid()', function() {
  describe('when given a valid filename', function() {
    let items;

    describe('when balance is not enough to purchase anything', function() {
      test('returns an empty array', async function() {
        const items = await findPair('fixtures/prices.txt', 400);
        expect(items).toEqual([]);
      });
    });

    describe('when balance is good enough for only 1 item', function() {
      test('returns an empty array', async function() {
        const items = await findPair('fixtures/prices.txt', 500);
        expect(items.length).toEqual(1);
      });
    });

    describe('when balance is good enough for more than 2 items', function() {
      test('returns only 2 items', async function() {
        const items = await findPair('fixtures/prices.txt', 10000);
        expect(items.length).toEqual(2);
      });

      describe('and maxItems argument is specified', function() {
        test('returns the specified max items', async function() {
          const items = await findPair('fixtures/prices.txt', 20000, 5);
          expect(items.length).toEqual(5);
        });
      });
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
