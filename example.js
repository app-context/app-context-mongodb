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
        native_parser: true
      }},
      data: {url: 'mongodb://localhost/data', server: {
        reconnectTries: 2,
        reconnectInterval: 500
      }}
    })
};
