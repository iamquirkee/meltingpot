var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var config = require("../config.js");
var redis = require('redis');
var client  = redis.createClient();

options = {
  host: config['REDIS_HOST'],
  port: config['REDIS_PORT'],
  client: client,
  ttl :  config['REDIS_TTL']
}

redisSession = session({
  secret: config['SESSION_SECRET'],
  store: new RedisStore(options),
  saveUninitialized: false,
  resave: false
});

module.exports = redisSession;
