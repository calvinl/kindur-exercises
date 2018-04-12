const parseFile = require('./parseFile');

describe('parseFile()', function() {
  describe('when given a valid filename', function() {
    let data;

    beforeAll(async () => {
      data = await parseFile('fixtures/prices.txt');
    });

    test('parses the file into an array of objects', function() {
      expect(data).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            name: expect.any(String),
            price: expect.any(Number)
          })
        ])
      );
    });
  });

  describe('when given an invalid filename path', function() {
    test('throws an error', function() {
      expect(parseFile('invalid.txt')).rejects.toThrowError(
        /Error parsing file/
      );
    });
  });
});
