var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

// connecting to db
var db = mongoose.connect('mongodb://localhost/ssc-fakedata')

// schema
var requestSchema = new db.Schema({
	group: String,
	requestDate: Date,
	assessments: [{age: String, 
								 substanceAbuse: String,
								 english: String,
								 immigrationStatus: String,
								 historyOfViolence: Array,
								 mentalIllness: Array,
								 disabilities: Array,
								 children: String,
								 genderId: Array,
								 traffickingType: Array,
								 governmentId: Array,
								 languages: [{primary: String, secondary: String}]
							 }], // can alternately be referencing a Need object: need.assessments
	response: Array, //[{yes: Number, no: Number, noResponse: Number }] or alternately referencing a Response object: response.response
	timeToResponse: Number,
	timeToMaybe: Number,
	outcome: String // options: placed, infoGiven, noPlacement, other
});

// db.model('Request', requestSchema, 'request')
// var Request = db.model('Request');

// router.get('/', function(req, res, next) {

// 	Request.find({}, function(err, requests) {
//       if (err) {
//           console.log("error" + err);
//       }
//       else {
//           console.log("result = " + JSON.stringify(requests));
//           res.send(JSON.stringify(requests));
//       }
//   });
// })



superSelectedRequests.aggregate([
		{
			$match: {
				assessments.age: "Under 18, legally emanicipated" 
				},
			$group: {
				"_id": outcome, "num_outcome": {$sum: 1}
				}
		}
	])
	// yields {"_id" : outcome, num_outcome: }
// });

router.get('/', function(req, res, next) {

	var outcomesData = getOutcomesData();
  res.send(JSON.stringify(outcomesData));

});

function getOutcomesData(startDate, endDate, region) {
var selectedRequestsByDateRegion = db.request.aggregate([
				{ 
					$match: {$and: 
						[
							{requestDate: {$gte: 1432323613613, $lte: Date.now()}},
							{region: "SF Bay Area"}
						]
					}
				}
			]);
//Test:
db.request.aggregate([{$group: {_id: 'outcome', count: {$sum: 1}}}]);
//returns { "_id" : "outcome", "count" : 8 }
	// Get the records within a certain date range from a requested region (or ALL). $match
	var selectedRequestsByDateRegion = db.requests.aggregate([
				{ // get all the documents that fall under these dates and region parameters
					$match: {$and: 
						[
							{requestDate: {$gte: startDate, $lte: endDate}},
							{region: region}
						]
					},
					// use $project to select the fields we need: assessments, outcome
					$project: {
										_id: 0,
										outcome: 1,
										age: $assessments.age
										},
					//returns assessment and outcome data 

					// http://stackoverflow.com/questions/16772156/nested-grouping-with-mongodb
					$group: {_id: 
											{age:'$age', outcome: '$outcome'}
									},
					$group: {_id: "$_id.age"},
										outcomes: 
									}

					// return each age group and the outcome
				}
			]);

// Count the result of each type of outcome
	var superSelectedRequests = selectedRequestsByDateRegion.aggregate([
			{ 
					$group: { 
						"_id": outcome, num_outcome: {$sum: 1}
					}

				}

		]);


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

 
