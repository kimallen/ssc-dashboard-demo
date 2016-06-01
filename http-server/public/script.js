(function(){

	var app = angular.module('dashboard', []);
	
	app.controller("outcomeController", ['$scope', '$http', function($scope,$http){

	// var filterTypes = {age: {api: ""}, mental: {api: ""}, substanceAbuse:{api: ""}, english:{api: ""}, immigrationStatus:{api: ""}, genderId:{api: ""}, traffickingType:{api: ""}, children:{api: ""}, violence: {api: 'http://localhost:3000/db'}, disability:{api: ""}}
	
	
	function outcomesDataByFilter(type){
        console.log('function: outcomesDataByFilter');
        var apiUrl = 'http://localhost:3000/db'
		var outcome = this;
		outcome.filters = [];
		
		$http.get(apiUrl)
						.success(function(data){
							console.log(data)
                            
							outcome.filters = data;
							$scope.filteredData = outcome.filters[type];
                            var subDemographics = outcome.filters[type]
							
                            for (subDemographic in subDemographics){
								
                                showGraph(subDemographic, subDemographics[subDemographic])
							}
                      
						});					
	};
	
	
	outcomesDataByFilter("violence")
	// showGraph()


	}])
})();

function showGraph(demo, outcomeData) {
	   console.log("Showing this " + demo)
		// when scope or timing issue solved attach chart to: $('#' + demo + '-chart.ng-scope')
    $('.chart-' + demo).highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: 'Request Outcomes by ' + demo
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
        },
        series: [{
            name: "First measure",
            data: [outcomeData.placement, outcomeData["no placement"]]
        }, {
            name: 'second measure',
            data: [outcomeData.referred, outcomeData["Other"]]
        }, ]
    });
};