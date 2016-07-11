var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

// connecting to db
var db = mongoose.connect('mongodb://localhost/ssc-fakedata')

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
	response: Array, //[{maybe: Number, no: Number, noResponse: Number }] 
	timeToResponse: Number,
	timeToMaybe: Number,
	outcome: String // options: placed, Info given, No Placement, other
});

db.model('Request', requestSchema, 'request')
var Request = db.model('Request');

router.get('/', function(req, res, next) {
	  
	  var startDate = new Date(1405631106357);
	  var endDate = new Date(2467843787242);
 
	  // Request.find({requestDate:{$gte: startDate, $lte: endDate}, region: "New Jersey"}, {requestDate: 1, outcome: 1, region:1}, callback)
	
	var regionQuery = {region: req.query.region}
	
			Request.find({region: regionQuery.region}, callback)
		
			function callback(err, result) {
				if (err) {
					console.log("error " + err);
				}
				else {
					aggregatedResults = aggregateResults(result); 
					res.send(JSON.stringify(aggregatedResults));
				}

				function aggregateResults(result) {
					var aggregatedResults;

					// do the transformation logic here
					aggregatedResults = result; // just return the same results for now
					// aggregatedResults = {test:"test"}

					return aggregatedResults;
				}
			};

// //IN MONGODB
// // db.request.find({requestDate: {$gte: 1405631106357, $lte: 1467843787242}, region: "SF Bay Area"}, {requestDate: 1, outcome: 1, region:1}, callback)

// //IN MONGOOSE??
// // db.request.find({requestDate: {$gte: 1405631106357, $lte: 1467843787242}, region: "SF Bay Area"}, 'requestDate region outcome', callback)
});


	


//USE BELOW FOR TESTING RECEIPT OF REGION AND DATE FILTERS
// router.get('/', function(req, res, next) {
// // 	console.log ('*****************************')
	
// // THIS WITH REGION SELECTION
// 	console.log('req: ' + req.query.region)
	// var regionQuery = {region: req.query.region}
// 	console.log ('query: ' + regionQuery.region )
	
	// var outcomesData = getOutcomesData(regionQuery);
	// res.send(JSON.stringify(outcomesData));
	
// 	// THIS WITHOUT REGION SELECTION
// 	// var outcomesData = getOutcomesData();
// 	// res.send(JSON.stringify(outcomesData));
	
// 	//WITH A PROMISE??
// 	// var promise = outcomesData.exec();
// 	// assert.ok(promise instanceof require ('mpromise'));
// 	// promise.then(function(response){
// 	//   res.send(JSON.stringify(response));
// 	// });
// });

// var options = {}
// function testOutcomesData(options){
// 	Request.find({region: options.region}, callback)
		
// 		function callback(err, result) {
// 				if (err) {
// 					console.log("error " + err);
// 				}
// 				else {

// 					res.send(JSON.stringify(result));
// 				}
// 			};
// }

function getOutcomesData(options) {
		// use options.region to get the region
		// use options.date to get the dates

	var data = { 
	  "ALL":
	    {
	      "Overall Outcomes": {
	        "placement": 23,
	        "referred": 12,
	        "no placement": 10,
	        "Other": 6
	      }
	    },
	  "age":
	    {
	      "Under 18, emancipated": {
	        "placement": 1,
	        "referred": 2,
	        "no placement": 3,
	        "Other": 0
	      },
	      "Under 18, not emancipated": {
	        "placement": 3,
	        "referred": 2,
	        "no placement": 1,
	        "Other": 1
	      },
	      "18-24": {
	        "placement": 6,
	        "referred": 2,
	        "no placement": 1,
	        "Other": 0
	      },
	      "25 and older": {
	        "placement": 3,
	        "referred": 1,
	        "no placement": 2,
	        "Other": 0
	      }
	    }
	  ,
	  "violence":
	    {
	      "No History of Violence": {
	        "placement": 5,
	        "referred": 3,
	        "no placement": 2,
	        "Other": 1
	      },
	      "History of Violent Behavior": {
	        "placement": 15,
	        "referred": 7,
	        "no placement": 2,
	        "Other": 0
	      },
	      "History of Aggression": {
	        "placement": 12,
	        "referred": 3,
	        "no placement": 8,
	        "Other": 1
	      },
	      "Inflicting Self-Injury": {
	        "placement": 5,
	        "referred": 3,
	        "no placement": 2,
	        "Other": 1
	      },
	      "Current Suicidal Ideation": {
	        "placement": 4,
	        "referred": 5,
	        "no placement": 6,
	        "Other": 1
	      },
	      "Previous Suicide Attempt": {
	        "placement": 2,
	        "referred": 3,
	        "no placement": 3,
	        "Other": 1
	      },
	      "Perpetrators": {
	        "placement": 2,
	        "referred": 4,
	        "no placement": 16,
	        "Other": 2
	      }
	    },
	  "english": {},
	  "mental": {},
	  "substanceAbuseAbuse": {},
	  "immigrationStatus": {},
	  "genderId": {},
	  "traffickingType": {},
	  "children": {},
	  "disability": {},
	  "governmentId": {}
	};

	return data;
}

module.exports = router;

 
