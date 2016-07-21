var config = {};

config.db = {};

config.db.url = process.env.MONGODB_URI;

config.regions = process.env.REGIONS.split(",");

config.demo = true;

module.exports = config;

