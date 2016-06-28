var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
	// connecting to db
var db = mongoose.connect('mongodb://localhost/ssc-fakedata')


	// schema
var TestCollectionSchema = new db.Schema({
	data: String,

})

var requestSchema = new db.Schema({
	group: String,
	dateCreated: Date,
	assessments: [{age: String, 
								 substance: String,
								 english: String,
								 immigration: String,
								 history: Array,
								 mental: Array,
								 disability: Array,
								 children: String,
								 gender: Array,
								 trafficking: Array,
								 governmentId: Array,
								 languages: String,
							 }], // can alternately be referencing a Need object: need.assessments
	response: Array, //[{yes: Number, no: Number, noResponse: Number }] or alternately referencing a Response object: response.response
	timeToResponse: Number,
	timeToMaybe: Number,
	outcome: String // options: placed, infoGiven, noPlacement, other
});

db.model('Request', requestSchema, 'request')
var Request = db.model('Request');

router.get('/', function(req, res, next) {

	Request.find({}, function(err, requests) {
      if (err) {
          console.log("error" + err);
      }
      else {
          console.log("result = " + JSON.stringify(requests));
          res.send(JSON.stringify(requests));
      }
  });
})

db.model('TestCollection', TestCollectionSchema, 'testcollection')

var TestCollection = db.model('TestCollection')
/* GET users listing. */
router.get('/', function(req, res, next) {
	// get some data here


	TestCollection.find({}, function(err, testcollectionRecords) {
      if (err) {
          console.log("error" + err);
      }
      else {
          console.log("result = " + JSON.stringify(testcollectionRecords));
          res.send(JSON.stringify(testcollectionRecords));
      }
  });


	// var outcomesData = getOutcomesData();
 //  res.send(JSON.stringify(outcomesData));
});

function getOutcomesData(startDate, endDate, region) {

	// var data = { 
	//   "ALL":
	//     {
	//       "Overall Outcomes": {
	//         "placement": 23,
	//         "referred": 12,
	//         "no placement": 10,
	//         "Other": 6
	//       }
	//     },
	//   "age":
	//     {
	//       "Under 18, emancipated": {
	//         "placement": 1,
	//         "referred": 2,
	//         "no placement": 3,
	//         "Other": 0
	//       },
	//       "Under 18, not emancipated": {
	//         "placement": 3,
	//         "referred": 2,
	//         "no placement": 1,
	//         "Other": 1
	//       },
	//       "18-24": {
	//         "placement": 6,
	//         "referred": 2,
	//         "no placement": 1,
	//         "Other": 0
	//       },
	//       "25 and older": {
	//         "placement": 3,
	//         "referred": 1,
	//         "no placement": 2,
	//         "Other": 0
	//       }
	//     }
	//   ,
	//   "violence":
	//     {
	//       "No History of Violence": {
	//         "placement": 5,
	//         "referred": 3,
	//         "no placement": 2,
	//         "Other": 1
	//       },
	//       "History of Violent Behavior": {
	//         "placement": 15,
	//         "referred": 7,
	//         "no placement": 2,
	//         "Other": 0
	//       },
	//       "History of Aggression": {
	//         "placement": 12,
	//         "referred": 3,
	//         "no placement": 8,
	//         "Other": 1
	//       },
	//       "Inflicting Self-Injury": {
	//         "placement": 5,
	//         "referred": 3,
	//         "no placement": 2,
	//         "Other": 1
	//       },
	//       "Current Suicidal Ideation": {
	//         "placement": 4,
	//         "referred": 5,
	//         "no placement": 6,
	//         "Other": 1
	//       },
	//       "Previous Suicide Attempt": {
	//         "placement": 2,
	//         "referred": 3,
	//         "no placement": 3,
	//         "Other": 1
	//       },
	//       "Perpetrators": {
	//         "placement": 2,
	//         "referred": 4,
	//         "no placement": 16,
	//         "Other": 2
	//       }
	//     },
	//   "english": {},
	//   "mental": {},
	//   "substanceAbuse": {},
	//   "immigrationStatus": {},
	//   "genderId": {},
	//   "traffickingType": {},
	//   "children": {},
	//   "disability": {}
	// };

	// return data;
}

module.exports = router;

 // db.request.insert({"group": "New Jersey", "dateCreated": Date.now(), "assessments":[{"age": "under 18, legally emancipated", "english": "limited", "immigration": "Foreign National", "history":["History of violent behavior", "History of aggression"], "mental":["None Disclosed"], "disability": ["None"], "children": ["None"], "gender": ["male", "transgender male"], "trafficking": ["Sex Trafficking", "Sexual Assault"], "governmentId": ["Social security card"], "languages": "Spanish, English, Mayan"}], "response":[{"Maybe": 3, "No": 6, "No Response": 4}], "timeToResponse": 3, "timeToResponse": 4, "outcome": "Placement"})
