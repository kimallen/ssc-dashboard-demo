 //  region: String,
	// requestDate: Date,
	// age: String, 
 //  substanceAbuse: String,
 //  english: String,
 //  immigrationStatus: String,
 //  mentalIllness: String,
 //  historyOfViolence: Array,
 //  disabilities: Array,
 //  children: Array,
 //  genderId: Array,
 //  traffickingType: Array,
 //  governmentId: Array,
 //  primaryLanguage: String,
	// secondaryLanguage: String,
	// response: Array, //[{maybe: Number, no: Number, noResponse: Number }] 
	// timeToResponse: Number,
	// timeToMaybe: Number,
	// outcome: String 


 //  [{"_id":"577eae94c295aacb0e539780",
 //  "region":"SF Bay Area",
 //  "requestDate":"2014-07-18T19:33:40.121Z",
 //  "age":"under 18, legally emanicipated",
 //  "mentalIllness":"Yes, mental health diagnosis with no prescribed medication",
 //  "english":"Limited",
 //  "substanceAbuse":"Yes, while in trafficking situation"
 //  "immigrationStatus":"Unsure; not clear from intake",
 //  "primaryLanguage":"Some language",
 //  "secondaryLanguage":"Some other language","timeToResponse":4,
 //  "timeToMaybe":15,
 //  "outcome":"Info Given",
 //  "response":[{"No Response":3,"No":0,"Maybe":1}],
 //  "governmentId":["Social Security card"],"traffickingType":["Sex trafficking"],
 //  "genderId":["female"],
 //  "children":["Accompanying children/derivatives"],
 //  "disabilities":["Has hearing disabilities"],
 //  "historyOfViolence":["History of violent behavior"]},
 //  { next doc},
 //  { next doc}]

function buildSkeletonData(){

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


  var demogs = ["ALL",
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
    "primaryLanguage",
    "secondaryLanguage"]

  var outcomeNums = 
      {"placement": 0,
        "referred": 0,
        "no placement": 0,
        "Other": 0}

  var skeletonData = {}
  
  for (var i = 0; i < demogs.length; i++) {
    skeletonData[demogs[i]] = outcomeNums
  }
  return skeletonData
}

function countOutcomes(result){
  var demogs = ["ALL",
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
    "primaryLanguage",
    "secondaryLanguage"]
  // for each document
    //take the value of outcome
    //and for each demographic in demogs ARRAY, add 1 to the corresponding outcome value
    for (var i = 0; i < result.length; i++) {
      
      var outcome = result.outcome
      for (var d = 1; d < demogs.length; d++) {
        var demogValue = result[demogs[d]]
        //if demogValue is not an array do this:
          skeletonData.demogs[d].demogValue.outcome ++1
          skeletonData["ALL"]["Overall Outcomes"].outcome ++ 1
        //if demogValue is an array, do this:
      }

    }

}



function aggregateData(result){
  
  //1) create a skeleton array of the desired data format:
  buildSkeletonData()
 // 2) for each document (in result), add 1 to the outcome value for each demographic
  countOutcomes()

  var newData = []
  


}

console.log(buildSkeletonData())








