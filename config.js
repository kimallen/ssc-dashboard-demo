var config = {};

config.db = {};

config.db.url = process.env.MONGODB_URI;

config.regions = process.env.REGIONS.split(",");

config.demo = true;

module.exports = config;

//also, in bin/www for port use 5000 for heroku local, 3000 for local machine