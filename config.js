var config = {};

config.db = {};

config.db.url = process.env.DBURL;

config.regions = process.env.REGIONS;

config.demo = true;
//then put into ??appropriate file??:
// if (config.demo === true){
// 	var el = document.getElementById('demo');
// 	el.style.visibility='hidden';
// }
module.exports = config;

