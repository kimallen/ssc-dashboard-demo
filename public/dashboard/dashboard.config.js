

angular
        .module('dashboard')
        .config( ['$stateProvider', '$urlRouterProvider', config] )

const OUTCOMEURL = 'http://localhost:3000/api/outcomes';
const REGIONFILTERS={region1:{value: "New+Jersey", name: "New Jersey"},
                region2:{value: "SF+Bay+Area", name: "SF Bay Area"},
                region3:{value: "Texas", name: "Texas"}}

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
