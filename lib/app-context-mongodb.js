var MongoClient = require('mongodb').MongoClient;
var createConnections = require('@mattinsler/app-context-create-connections');

module.exports = createConnections('mongodb', function(url, opts) {
  return MongoClient.connect(url, opts);
});
