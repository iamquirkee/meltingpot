var config = require('./env.json')[process.env.NODE_ENV || 'development'];
module.exports= config;
