var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
	// connecting to db
var db = mongoose.connect('mongodb://localhost/test2')

	// schema
var TestCollectionSchema = new db.Schema({
	data: String
})

db.model('TestCollection', TestCollectionSchema, 'testcollection')

var TestCollection = db.model('TestCollection')
/* GET users listing. */
router.get('/', function(req, res, next) {
	// get some data here

/*
	TestCollection.find({}, function(err, testcollectionRecords) {
      if (err) {
          console.log("error" + err);
      }
      else {
          console.log("result = " + JSON.stringify(testcollectionRecords));
          res.send(JSON.stringify(testcollectionRecords));
      }
  });
*/

	var outcomesData = getOutcomesData();
  res.send(JSON.stringify(outcomesData));
});

function getOutcomesData(startDate, endDate, region) {



// code for querying MongoDB
	// if (region === "ALL"){
	// 	region = {$exists: true}
	// }
	
	// var selectedData = db.outcomes.find({
	// 	"created-at": {$gte: startDate},
	// 	 "created-at": {$lte: endDate},
	// 	  "region": region
	// 	});
	
	// return selectedData;

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
	  "substanceAbuse": {},
	  "immigrationStatus": {},
	  "genderId": {},
	  "traffickingType": {},
	  "children": {},
	  "disability": {}
	};

	return data;
}

module.exports = router;
