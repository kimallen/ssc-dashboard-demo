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
 	
 	//not sure why i did it this way- leaving cuz maybe a reason?
	// var startDate = {startDate: req.query.startDate};
	// var endDate = {endDate: req.query.endDate};
	// var regionQuery = {region: req.query.region};

	var startDate = new Date(parseInt(req.query.startDate))//new Date(req.query.startDate.parseInt());
	var endDate = new Date(parseInt(req.query.endDate));
	var regionQuery = req.query.region
	console.log("query = " + JSON.stringify(req.query))
	console.log("startDate = " + startDate.toString())
	console.log("endDate = " + endDate.toString())
	console.log("regionQuery = " + regionQuery)
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
					// console.log("result = " + result)
					var aggregatedResults = aggregateResults(result); 
					console.log("*****************************")
					console.log(aggregatedResults);
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
            ["US Citizen/Naturalized Citizen","Foreign National","Not clear from intake"];

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


var aggregateResults = function(result){
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
    console.log("a document +++++++" + doc)
    var outcome = doc.outcome
    skeletonData["ALL"]["Overall Outcomes"][outcome]++
   
    _.forEach(demogs, function(demog){

    	var demogValue = doc[demog]
    	console.log("demog = " + demog)
    	console.log("demogValue = " + demogValue)

    	if (Array.isArray(demogValue)){
    		_.forEach(demogValue, function(answer){
    			skeletonData[demog][answer][outcome]++
    		});
    	}
    	else{
    		skeletonData[demog][demogValue][outcome]++
    	}

    })
    // _.forEach(doc, function(demogsValue, key){
    //   //just for the demographic measures
    //   console.log("keys: " + doc[key])
    //   if (_.includes(demogs, key)){
    //   	console.log("inside doc !!!!!!!!!!!!!!!!!!!")
    //   	// console.log("demographic: " + key)
    //   	// console.log(demogsValue)
    //     //if the demographic measure has more than one demogsValue
    //     if (Array.isArray(demogsValue)){
    //       _.forEach(demogsValue, function(answer){
    //         console.log("answer = " + answer)
    //         skeletonData[key][answer][outcome]++
    //         console.log("num " + outcome + skeletonData[key][answer][outcome])
    //       });
    //     }
    //     else{
    //       skeletonData[key][demogsValue][outcome]++
    //     }


    //   };
    // });
  });

  var aggregatedResults = skeletonData
  return aggregatedResults

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

 
