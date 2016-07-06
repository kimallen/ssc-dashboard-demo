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
  languages: [{primary: String, secondary: String}],
	response: Array, //[{maybe: Number, no: Number, noResponse: Number }] 
	timeToResponse: Number,
	timeToMaybe: Number,
	outcome: String // options: placed, Info given, No Placement, other
});

db.model('Request', requestSchema, 'request')
var Request = db.model('Request');

router.get('/', function(req, res, next) {

	// Request.find({}, 'region outcome', function(err, requests) {
 //      if (err) {
 //          console.log("error" + err);
 //      }
 //      else {       
 //          res.send(JSON.stringify(requests));
 //      }
 //  });
	
	Request.aggregate([
				{
					$match: {region: "New Jersey"}
				},
				{
					$group: {
					"_id": "$outcome", "total": {$sum: 1}}
				}
			],
			function (err, result) {
				if (err) {
					console.log("error " + err);
				}
				else {

					res.send(JSON.stringify(result));
				}
			}
		);

});

//USE BELOW FOR TESTING RECEIPT OF REGION AND DATE FILTERS
// router.get('/', function(req, res, next) {
// 	console.log ('*****************************')
	
// THIS WITH REGION SELECTION
	// console.log('req: ' + req.query.region)
	// var regionQuery = {region: req.query.region}
	// console.log ('query: ' + regionQuery.region )
	
	// var outcomesData = getOutcomesData(regionQuery);
	// res.send(JSON.stringify(outcomesData));
	
	// THIS WITHOUT REGION SELECTION
	// var outcomesData = getOutcomesData();
	// res.send(JSON.stringify(outcomesData));
	
	//WITH A PROMISE??
	// var promise = outcomesData.exec();
	// assert.ok(promise instanceof require ('mpromise'));
	// promise.then(function(response){
	//   res.send(JSON.stringify(response));
	// });
// });

var options = {}
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

 
