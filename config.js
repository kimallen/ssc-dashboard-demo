var config = {};

config.db = {};

config.db.url = process.env.MONGODB_URI;

config.regions = process.env.REGIONS.split(",");

config.demo = true;
//then put into ??appropriate file??:
// if (config.demo === true){
// 	var el = document.getElementById('demo');
// 	el.style.visibility='hidden';
// }
module.exports = config;

