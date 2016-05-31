(function(){

	var app = angular.module('dashboard', []);
	
	app.controller("outcomeController", ['$scope', '$http', function($scope,$http){

	var filterTypes = {age: {api: ""}, mental: {api: ""}, substanceAbuse:{api: ""}, english:{api: ""}, immigrationStatus:{api: ""}, genderId:{api: ""}, traffickingType:{api: ""}, children:{api: ""}, violence: {api: 'http://localhost:3000/db'}, disability:{api: ""}}
	
	
	function outcomesDataByFilter(type){
        console.log('function: outcomesDataByFilter');
		var apiUrl = filterTypes[type].api
		var outcome = this;
		outcome.demographics = [];
		
		$http.get(apiUrl)
						.success(function(data){
							
							outcome.demographics = data;
							$scope.filteredData = outcome.demographics;
							
                            for (demographic in outcome.demographics){
								
                                showGraph(demographic, data[demographic][0])
							}
                      
						});					
	};
	
	// Use the below loop to show data for all filters
	// var filtersList = Object.keys(filterTypes)
	// for (var type in filtersList){
	// 	outcomesDataByFilter(type)
	// }
	outcomesDataByFilter("violence")
	// showGraph()


	}])
})();

function showGraph(demo, outcomeData) {
	console.log(demo)
	console.log(outcomeData)
		// when scope issue solved attach chart to: $('#' + demo + '-chart.ng-scope')
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