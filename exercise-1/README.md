# Exercise 1

Install dependencies:

    npm install

Start the server:

    npm start

To run all tests:

    npm test

Post a message:

    $ curl -X POST -H "Content-Type: application/json" -d '{"message": "foo"}' http://localhost:3000/messages
    {"digest":"0f3af4bd9f1937045a1376a98af5fec39690bc83590430d30419b208b9ceb4f5"}

Get a posted message:

    $ curl http://localhost:3000/messages/0f3af4bd9f1937045a1376a98af5fec39690bc83590430d30419b208b9ceb4f5
    {"message":"foo"}
