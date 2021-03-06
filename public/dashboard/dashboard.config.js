angular
        .module('dashboard')
        .config( ['$stateProvider', '$urlRouterProvider', config] )

//change these  3 values for configuration changes
//for heroku app use 'https://ssc-dashboard.herokuapp.com/api/outcomes'
const OUTCOMEURL = 'https://ssc-dashboard.herokuapp.com/api/outcomes';
//for local heroku app use 'http://localhost:5000/api/outcomes'
// const OUTCOMEURL = 'http://localhost:5000/api/outcomes';
const REGIONFILTERS={region1:{value: "Wonderland", name: "Wonderland"},
                region2:{value: "Atlantis", name: "Atlantis"},
                region3:{value: "Mount+Olympus", name: "Mount Olympus"}}
var demoMode = true;

demoState()
function demoState(){
     var el = document.getElementById('demo');
    if (demoMode === true){
         el.style.display='block';
        }
};

function config($stateProvider, $urlRouterProvider){
        $urlRouterProvider.otherwise("/home");

        // States
        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: "home/home.html",
                controller: "homeController",
                controllerAs: "home"
            })
            .state('client-demographics', {
                url: "/client-demographics",
                templateUrl: "clients/client-demographics.html",
                controller: "clientDemogController",
                controllerAs: 'clientDemog'
                })
            .state('responses', {
                url: "/responses",
                templateUrl: "responses/responses.html",
                controller: "responseController",
                controllerAs: 'response'
                })
            .state('outcomes', {
                url: "/outcomes",
                templateUrl: "outcomes/outcomes.html",
                controller: "outcomeController",
                controllerAs: 'outcome'
                })
            
            .state('results-over-time', {
                url: "/results-over-time",
                templateUrl: "results/results-over-time.html",
                controller: "resultsOverTimeController",
                controllerAs: 'results'
                })

    }
