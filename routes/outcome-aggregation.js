
var _ = require('lodash');

var exports = module.exports= {};

exports.buildSkeletonData = buildSkeletonData;
exports.sumOutcomesData = sumOutcomesData;

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

      _.forEach(subDemogs, (subDemog, i) => {
        subSkeletonData[subDemogs[i]] = outcomeNums();
      });
      
      skeletonData[demog]= subSkeletonData;

    }
    else{
      
      subSkeletonData[subDemogs] = outcomeNums();
      skeletonData[demog] = subSkeletonData;
    }

  })

  return skeletonData
  
}


function sumOutcomesData(result){
  const demogs = [
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
    ];
    
  var skeletonData = buildSkeletonData()

  _.forEach(result, function(doc){
    var outcome = doc.outcome
    skeletonData["ALL"]["Overall Outcomes"][outcome]++
   
    _.forEach(demogs, function(demog){

      var demogValue = doc[demog]

      if (Array.isArray(demogValue)){
        _.forEach(demogValue, function(answer){
          skeletonData[demog][answer][outcome]++
        });
      }
      else{
        skeletonData[demog][demogValue][outcome]++
      }

    })
    
  });

  var outcomesData = skeletonData
  return outcomesData

};
  







