(function() {
	var app = angular.module('stevetest', ['highcharts-ng']);
    
    // Note for readability, I'm referencing a separate SteveTestController function here rather than using an anonymous function 
    app.controller('SteveTestController', ['$scope', '$http', SteveTestController]);
	
	function SteveTestController($scope, $http) {
        
        // the current best practice in Angular is to bind data to the "this" object instead of using $scope. (VM stands for "view model")
        var vm = this;
        
        // initialize a chartConfigs array (which will hold chartConfig objects for each chart that will be displayed on the page)
        vm.chartConfigs = [];
        
        // get the data from the server (note: there should really be error handling here, but leaving out for brevity)
        $http.get('http://localhost:3000/db')
            .then( populateChartData ); // call the populateChartData function when data is returned
           
        // this is the function that gets called after the http request is complete
        function populateChartData(response) {
            
            // let's just get the age data for now
            var category = response.data.age;
            
            // now iterate through the sub-demographics
            for (var subcategory in category) {
                
                // get the corresponding outcomes for the subcategory
                var outcomes = category[subcategory];
                
                // generate a chartConfig object for the current subcategory and corresponding outcomes
                var chartConfig = getChartConfig(subcategory, outcomes);
                
                // add the chartConfig object to the array that will be accessed in the html template
                vm.chartConfigs.push(chartConfig);
            }
        }
        
        
        // This function returns a chartConfig object for a single subcategory and it's corresponding outcomes
        function getChartConfig(subcategory, outcomes) {
 
            var chartConfig = {
                options: {
                    chart: {
                        type: 'column'
                    },
                    title: {
                        text: 'Request Outcomes: ' + subcategory
                    },
                    xAxis: {
                        categories: ['Success', 'Not Placed/Other']
                    },
                    yAxis: {
                        min: 0,
                        title: {
                            text: 'Total requests'
                        },
                        stackLabels: {
                            enabled: true,
                            style: {
                                fontWeight: 'bold',
                                color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                            }
                        }
                    },
                    legend: {
                        align: 'right',
                        x: -30,
                        verticalAlign: 'top',
                        y: 25,
                        floating: true,
                        backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
                        borderColor: '#CCC',
                        borderWidth: 1,
                        shadow: false
                    },
                    tooltip: {
                        headerFormat: '<b>{point.x}</b><br/>',
                        pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
                    },
                    plotOptions: {
                        column: {
                            stacking: 'normal',
                            dataLabels: {
                                enabled: true,
                                color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
                                style: {
                                    textShadow: '0 0 3px black'
                                }
                            }
                        }
                    }
                },
                
                // Looks like we need to put the data here rather than in "options" section, so that it gets updated after the ng-repeat
                series: [{
                    name: "First measure",
                    data: [outcomes.placement, outcomes["no placement"]]
                }, {
                    name: 'second measure',
                    data: [outcomes.referred, outcomes["Other"]]
                }, ]
            }
            
            // return the initialized object
            return chartConfig;
            
        }
    }
    
    
    
    
})();
