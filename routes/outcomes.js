var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var config = require('./../config')
var _ = require('lodash');

var o = require('./outcome-aggregation')
// connecting to db
var db = mongoose.connect(config.db.url)

// schema
var requestSchema = new db.Schema({
	region: String,
	requestDate: Date,
	age: String, 
  substanceAbuse: String,
  english: String,
  immigrationStatus: String,
  mentalIllness: String,
  historyOfViolence: Array,
  disabilities: Array,
  children: Array,
  genderId: Array,
  traffickingType: Array,
  governmentId: Array,
  primaryLanguage: String,
	secondaryLanguage: String,
	response: {Maybe: Number, No: Number, "No response": Number},
	timeToFirstMaybe: Number,
	timeToFirstResponse: Number,
	outcome: String
});

db.model('Request', requestSchema, 'request')
var Request = db.model('Request');

router.get('/', function(req, res, next) {

	var startDate = new Date(parseInt(req.query.startDate))//new Date(req.query.startDate.parseInt());
	var endDate = new Date(parseInt(req.query.endDate));
	var regionQuery = req.query.region
	
	if (regionQuery === "ALL"){
		Request.find({requestDate:{$gte: startDate, $lte: endDate}}, callback)
	}
	else {
	  Request.find({requestDate:{$gte: startDate, $lte: endDate}, region: regionQuery}, callback)

	}
		
	function callback(err, result) {
		if (err) {
			console.log("error " + err);
		}
		else {
			var aggregatedResults = o.sumOutcomesData(result); 
			res.send(JSON.stringify(aggregatedResults));
		}
	};
	
});




module.exports = router;

 
