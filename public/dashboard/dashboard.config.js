
angular
        .module('dashboard')
        .config( ['$stateProvider', '$urlRouterProvider', config] )

function config($stateProvider, $urlRouterProvider){
        //$urlRouterProvider.otherwise("/client-demographics");

        // States
        $stateProvider
            .state('home', {
                url: '',
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
