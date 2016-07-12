
var _ = require('lodash');

// exports.buildSkeletonData = buildSkeletonData()
exports.aggregateResults = aggregateResults
 
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

// var result = [{"_id":"577eae94c295aacb0e539780","region":"SF Bay Area","requestDate":"2014-07-18T19:33:40.121Z","age":"under 18, legally emanicipated","mentalIllness":"Yes, mental health diagnosis with no prescribed medication","english":"Limited","substanceAbuse":"Yes, while in trafficking situation","immigrationStatus":"Unsure; not clear from intake","primaryLanguage":"Some language","secondaryLanguage":"Some other language","timeToResponse":4,"timeToMaybe":15,"outcome":"Info Given","response":[{"No Response":3,"No":0,"Maybe":1}],"governmentId":["Social Security card"],"traffickingType":["Sex trafficking"],"genderId":["female"],"children":["Accompanying children/derivatives"],"disabilities":["Has hearing disabilities"],"historyOfViolence":["History of violent behavior"]},

// {"_id":"577eae94c295aacb0e539782","region":"SF Bay Area","requestDate":"2014-07-18T19:33:40.123Z","age":"under 18, legally emanicipated","mentalIllness":"Did not ask","english":"Basic","substanceAbuse":"Yes, substance use disorder as defined by the DSM-5","immigrationStatus":"US Citizen/Naturalized Citizen","primaryLanguage":"Some language","secondaryLanguage":"Some other language","timeToResponse":4,"timeToMaybe":19,"outcome":"No Placement","response":[{"No Response":0,"No":0,"Maybe":2}],"governmentId":["Did not ask"],"traffickingType":["Labor trafficking", "Sex trafficking", "Domestic violence"],"genderId":["Transgender Male"],"children":["None"],"disabilities":["Accompanied by a service animal"],"historyOfViolence":["Current state of inflicting self-injury"]}]

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




// aggregatedResults(result)






