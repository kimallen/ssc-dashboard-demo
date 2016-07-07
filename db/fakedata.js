var regionOptns = 
					["New Jersey", "SF Bay Area", "Texas"];
var ageOptns = 
					["under 18, legally emanicipated", "under 18, not emancipated", "18-24", "25 and older"];
var genderIds = 
					["male", "female", "Transgender Male", "Transgender Female", "Other"];
var childrenOptns = 
					["None", "Pregnant past first trimester", "Accompanying children/derivatives"];
var historyOptns = 
					["None", "History of violent behavior", "History of aggression", "Current state of inflicting self-injury", "Current state of suicidal ideation", "Previous suicide attempt(s), Perpetrator of sexual abuse/violence"];
var disabilityOptns = 
					["None", "Needs elevator and ramp access", "Has visual disabilities", "Has hearing disabilities", "Accompanied by a service animal", "Other"];
var governmentIdOptns = 
					["None", "State ID", "Birth Certificate", "Social Security card", "Passport", "Passport ID", "Other", "Did not ask", "Unsure"];
var substanceOptns = 
					["None", "Unsure", "Yes, while in trafficking situation", "Yes recreationally", "Yes, substance use disorder as defined by the DSM-5" ];
var immigrationOptns = 
					["US Citizen/Naturalized Citizen", "Foreign National", "Unsure; not clear from intake"];

var englishProficiencyOptns = 
					["Limited", "Basic", "Proficient"];
var mentalIllnessOptns = 
					["None disclosed", "Did not ask", "Yes, mental health diagnosis with no prescribed medication", "Yes, compliant with medication for mental health diagnosis", "Yes, noncompliant with medication for mental health diagnosis"];
var traffickingOptns = 
					["Labor trafficking", "Sex trafficking", "Domestic violence", "Sexual assault", "Other"];
var outcomeOptns = ["Placement", "Info Given", "No Placement", "Other"];

function randomize (demogOptions){
	var randomIndex = Math.floor(Math.random() * (demogOptions.length));
	return demogOptions[randomIndex]
}
function createMultipleRecords(number){
	for (var i = 0; i < number; i++) {
		createRecord()
	}
}
//creates one document with randomized values
function createRecord(){
	var randomResponseNum = Math.floor(Math.random() * (5));
	var randomFirstNum = Math.floor(Math.random() * (5) + 1);
	var randomFirstMaybeNum = Math.floor(Math.random() * (20) + 6);
	var minDate = Date.now() - 2*360*24*60*60*1000;
	db.request.insert({region: randomize(regionOptns),
		 // requestDate: Math.floor(Math.random() * ((Date.now() - minDate)) + minDate), 
			requestDate: new Date(minDate),
			age: randomize(ageOptns), 
			mentalIllness: randomize(mentalIllnessOptns), 
			english: randomize(englishProficiencyOptns),
			substanceAbuse: randomize(substanceOptns),
			immigrationStatus: randomize(immigrationOptns),
			
			genderId: [randomize(genderIds)],
			traffickingType: [randomize(traffickingOptns)],
			children: [randomize(childrenOptns)],
			historyOfViolence: [randomize(historyOptns)],
			disabilities: [randomize(disabilityOptns)],
			governmentId: [randomize(governmentIdOptns)],
			primaryLanguage: "Some language",
			secondaryLanguage: "Some other language",
			response:[{"Maybe": randomResponseNum, "No": Math.floor(Math.random() * (5)), "No Response": Math.floor(Math.random() * (5))}], 
			timeToResponse: randomFirstNum, 
			timeToMaybe: randomFirstMaybeNum, 
			outcome: randomize(outcomeOptns)
	});
}

