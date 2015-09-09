# app-context-mongodb

[MongoDB](http://mongodb.github.io/node-mongodb-native/2.0/api/) initializer for [app-context](http://app-contextjs.com)

## Usage

This initializer can be auto-installed by using it in your context file.

This initializer will attach the configured connections to `APP.mongodb`.

```javascript
module.exports = function() {
  this.runlevel('connected')
    // attach a connection to APP.mongodb - use the value at APP.config.mongodb as the connection string
    .use('mongodb', '$mongodb')

    // attach a connection to APP.mongodb
    .use('mongodb', 'mongodb://localhost/foobar')

    // create 2 connections and attach them as an object to APP.redis
    // this will create APP.redis.cache and APP.redis.sessions
    .use('mongodb', {
      users: '$mongodb.users',
      data: '$mongodb.data'
    })

    // you can also pass options to each connection
    // (from http://mongodb.github.io/node-mongodb-native/2.0/api/MongoClient.html#.connect)
    .use('mongodb', {
      users: {url: '$mongodb.users', db: {
        wtimeout: 2000,
        authSource: 'other-db'
      }},
      data: {url: 'mongodb://localhost/data', server: {
        reconnectTries: 2,
        reconnectInterval: 500
      }}
    })
};
```

## Connection Strings

Connection string formats and options are available in the [mongodb driver docs](http://docs.mongodb.org/manual/reference/connection-string/).

## Connection Configurations

Each connection can be configured with either a connection string (like `mongodb://localhost/foobar`) or
with an object. The object will be passed through to `MongoClient.connect` and can consist of any options
from the [mongodb driver](http://mongodb.github.io/node-mongodb-native/2.0/api/MongoClient.html#.connect). There is a special `url` option that this initializer requires.
