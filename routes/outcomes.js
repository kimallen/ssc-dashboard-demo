var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var _ = require('lodash');

var o = require('./outcome-aggregation')
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
	  
  // var startDate = new Date(1405631106357);
  // var endDate = new Date(2467843787242);
  // Request.find({requestDate:{$gte: startDate, $lte: endDate}, region: "Texas"}, {requestDate: 1, outcome: 1, region:1}, callback)
 
	var startDate = {startDate: req.query.startDate};
	var endDate = {endDate: req.query.endDate};
	var regionQuery = {region: req.query.region};

	console.log("query = " + req.query)
	console.log("startDate = " + startDate)
	console.log("endDate = " + endDate)
	console.log("regionQuery = " + regionQuery)
	if (regionQuery === "ALL"){
		Request.find({requestDate:{$gte: startDate, $lte: endDate}}, {requestDate: 1, outcome: 1, region:1}, callback)
	}
	else {
	  Request.find({requestDate:{$gte: startDate, $lte: endDate}, region: regionQuery}, {requestDate: 1, outcome: 1, region:1}, callback)

	// Request.find({region: regionQuery.region}, callback)
	}
		
			function callback(err, result) {
				if (err) {
					console.log("error " + err);
				}
				else {
					var aggregatedResults = aggregateResults(result); 
					console.log(aggregateResults);
					res.send(JSON.stringify(aggregatedResults));
				}
			};
				function buildSkeletonData(){

  var regionOptns = 
            ["New Jersey","SF Bay Area","Texas"];
  var ageOptns = 
            ["under 18, legally emanicipated","under 18, not emancipated","18-24","25 and older"];
  var genderOptns = 
            ["Male","Female","Transgender Male","Transgender Female","Other"];
  var childrenOptns = 
            ["None","Pregnant past first trimester","Accompanying children/derivatives"];
  var historyOptns = 
            ["None","History of violent behavior","History of aggression","Current state of inflicting self-injury","Current state of suicidal ideation","Previous suicide attempt(s)", "Perpetrator of sexual abuse/violence"];
  var disabilityOptns = 
            ["None","Needs elevator and ramp access","Has visual disabilities","Has hearing disabilities","Accompanied by a service animal","Other"];
  var governmentIdOptns = 
            ["None","State ID","Birth Certificate","Social Security card","Passport","Passport ID","Other","Did not ask","Unsure"];
  var substanceOptns = 
            ["None","Unsure","Yes, while in trafficking situation","Yes, recreationally","Yes, substance use disorder as defined by the DSM-5" ];
  var immigrationOptns = 
            ["US Citizen/Naturalized Citizen","Foreign National","Unsure; not clear from intake"];

  var englishProficiencyOptns = 
            ["Limited","Basic","Proficient"];
  var mentalIllnessOptns = 
            ["None disclosed","Did not ask","Yes, mental health diagnosis with no prescribed medication","Yes, compliant with medication for mental health diagnosis","Yes, noncompliant with medication for mental health diagnosis"];
  var traffickingOptns = 
            ["Labor trafficking","Sex trafficking","Domestic violence","Sexual assault","Other"];
  

  var outcomeOptns = ["Placement","Info Given","No Placement","Other"];


  var demogs = {"ALL": "Overall Outcomes",
    "age": ageOptns,
    "substanceAbuse": substanceOptns,
    "english": englishProficiencyOptns,
    "immigrationStatus": immigrationOptns,
    "mentalIllness": mentalIllnessOptns,
    "historyOfViolence": historyOptns,
    "disabilities": disabilityOptns,
    "children": childrenOptns,
    "genderId": genderOptns,
    "traffickingType": traffickingOptns,
    "governmentId": governmentIdOptns,
    }

  function outcomeNums(){
    return {"Placement": 0,
          "Info Given": 0,
          "No Placement": 0,
          "Other": 0}
  }

  var skeletonData = {}
 
  _.forEach(demogs, function(subDemogs, demog){
  
    
    var subSkeletonData = {}
    if (Array.isArray(subDemogs)){

      _.forEach(subDemogs, function(subDemog, i){
        
        subSkeletonData[subDemogs[i]] = outcomeNums();
      })
      
      skeletonData[demog]= subSkeletonData;

    }
    else{
      
      subSkeletonData[subDemogs] = outcomeNums();
      skeletonData[demog] = subSkeletonData;
    }

  })

  return skeletonData
  
}


function aggregateResults(result){
  var demogs = [
    "age",
    "substanceAbuse",
    "english",
    "immigrationStatus",
    "mentalIllness",
    "historyOfViolence",
    "disabilities",
    "children",
    "genderId",
    "traffickingType",
    "governmentId",
    ]
    
  var skeletonData = buildSkeletonData()

  _.forEach(result, function(doc){
    
    var outcome = doc.outcome
    skeletonData["ALL"]["Overall Outcomes"][outcome]++

    _.forEach(doc, function(demogsValue, key){
      //just for the demographic measures
      if (_.includes(demogs, key)){
        //if the demographic measure has more than one demogsValue
        if (Array.isArray(demogsValue)){
          _.forEach(demogsValue, function(answer){
            skeletonData[key][answer][outcome]++
          });
        }
        else{
          skeletonData[key][demogsValue][outcome]++
        }


      };
    });
  });

  var aggregatedResults = skeletonData
  return aggregatedResults

}
	function aggregateResults(result) {
		var aggregatedResults;

		// do the transformation logic here
		aggregatedResults = result; // just return the same results for now
		// aggregatedResults = {test:"test"}

		return aggregatedResults;
	}
		

// //IN MONGODB
// // db.request.find({requestDate: {$gte: 1405631106357, $lte: 1467843787242}, region: "SF Bay Area"}, {requestDate: 1, outcome: 1, region:1}, callback)

// //IN MONGOOSE??
// // db.request.find({requestDate: {$gte: 1405631106357, $lte: 1467843787242}, region: "SF Bay Area"}, 'requestDate region outcome', callback)
});


	




function getOutcomesData(options) {

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

 
