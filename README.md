[![Build Status](https://travis-ci.org/sdawood/members-rewards-api.png?branch=master)](https://travis-ci.org/sdawood/members-rewards-api)

# members-rewards-api
Express/Mongo API Endpoints

## Pre-requisites
You need to have node installed, ^6.0.0 for ES6 Promises support without a polyfill.
You can install node for your operating system from [the node website](https://nodejs.org/).
Node installation should install npm as well

## Installation

Since the package is not yet available on npm, clone the repo using git

```
$ git clone https://github.com/sdawood/members-rewards-api.git
$ cd members-rewards-api
```

Install the dependencies using npm

```
npm install
```

Build es2015 code into valid ES5 code

```
npm run build
```

## Usage

In order to start the API server, you can simply run ```npm start```
The start script in package.json points to dist/server.js


## Running test and coverage

`husky` development dependency makes available the `precommit` npm script, to only allow a commit after a successful test run.

To run the tests

```
npm run test
```

To run the tests and generate a test coverage report
```
npm run coverage
```
Coverage reports can be sent to a 3rd party service, e.g. [codecov.io](http://codecov.io)
To sustain coverage levels, ```npm run check-coverage``` can be run on Travis CLI after the tests and fail the build if coverage falls below the thresholds defined in package.json

```
=============================================================================
Writing coverage object [/path/to/coverage/coverage.json]
Writing coverage reports at [/path/to/coverage]
=============================================================================

=============================== Coverage summary ===============================
Statements   : 98.17% ( 214/218 )
Branches     : 90% ( 9/10 )
Functions    : 97.18% ( 69/71 )
Lines        : 98.12% ( 209/213 )
================================================================================
```

## Discusson and future roadmap
#### Why not Sails.js (in this particular exercise)?
* To showcase some es6 project setup and coding style
* While I had an API with the desired interface up and running within the first 30 minutes, I noticed the following:
  * The Sailjs extreme permissive policy was too open in a concerning way
  * Automatic routes and config made it hard to audit and harden the setup by intuitively inspecting the *generated* config, because; well; there is *no* generated config, I wish it was declarative in a more explicit way for ease of auditing.
  * Waterline with a Mongodb adapter didn't behave as Mongoose ORM would, for example:
    - It generated a strange relational many to many schema that violated NoSQL db design concepts. It was not straight forward to tweak that behaviour.
    - The schema didn't do the only job for a schema in a NoSQL db, it didn't not restrict the attributes to that defined in the Schema, any arbitrary attributes sent in the request body were passed through to Mongodb. That would require an extra layer of manual validation using a library like [joi](https://www.npmjs.com/package/joi) and [express-validator](https://www.npmjs.com/package/express-validator
) which would help with body validation, but would require duplicating the Schema definition in their own format.

In summary, getting started with Sails is as easy as promised, while hardening the application to an acceptable level would require more tinkering in the lack of straight forward *guides*.

#### Design
The application structure is heavily inspired by Sails. Route handlers are designed to be almost a drag and drop replacement for the sails *actions*

### Why Sails, and the like
Writing an API from scratch is tedious repetitive and error-prone work, even the help of Mongoose ORM and Express Routers and Automatic body parsing middleware, the code still ends up looking a lot like a copy and pasted boilerplate.
Sails, Swagger Tools, Loopback and other API frameworks allows efficient use of resources towards API design and security, rather boilerplate

If I have to choose today, Sails would have a couple of red-flags associated, especially the slowed down enhancement and compatibility upgrades, and the dropping community enthusiasm and support. Many other opensource platforms seem far more promising.
That said, Sails is really good at what it promises, a Rapid API development cycle. Now to get that production ready, one would have to buy the one and only available book, written by the author of the framework.

### Roadmap
Immediate Todos:
* Migrate to Sails or Loopback
* CORS
* Token based authentication, [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) JWT implementation is a strong candidate
* Better test coverage
* Application wide logger, with post-processor friendly format, e.g. [bunyan](https://www.npmjs.com/package/bunyan)

For backlog, check 'enhancement' [issues](https://github.com/sdawood/members-rewards-api/issues) in this repo



