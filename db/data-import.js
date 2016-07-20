
var mongoose = require('mongoose');
var _ = require('lodash');


// connecting to db
var db = mongoose.connect(process.env.DBURL)

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

//pulls in csv as a string
// current file path: '../../SSC_DATA_SL.csv'
function convertData(filePath){
	fs = require('fs')
	fs.readFile(filePath, 'utf8', function (err,data) {
	  if (err) {
	    return console.log(err);
	  }

	  //uses csvtojson to convert
		var Converter = require("csvtojson").Converter;
		var converter = new Converter({
			//remove fields with empty values
			ignoreEmpty: true,
		});
	  
		converter.fromString(data, function(err,result){
			  _.forEach(result, function(doc){
			  	if (doc.timeToFirstMaybe === "null"){
			  		doc.timeToFirstMaybe = null;
			  	};
			  	if (doc.timeToFirstResponse=== "null"){
			  		doc.timeToFirstResponse = null;
			  	};
			  	return doc
			  });
		  
		  	Request.insertMany(result, function(error, docs){
	  			if (error){
	  				return console.log("Error inserting documents: " + error)
	  			}
	  		}).then(function(){
	  			process.exit(-1)

	  		});
		});
	});//closes fs.readfile
};
 convertData(process.argv[2])
