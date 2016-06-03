(function(){

	var app = angular.module('dashboard', ['highcharts-ng']);
	
	app.controller("outcomeController", ['$scope', '$http',outcomeController]);


    function outcomeController($scope, $http){
        
        var viewModel = this
        
        viewModel.chartConfigs = [];
        
        //This function retrieves data from api, takes in the filter type, and builds small multiples charts of each of the filter's categories
        
        // outcomesDataByFilter("age")

        // function outcomesDataByFilter(filterType){
            var apiUrl = 'http://localhost:3000/db'
            $http.get(apiUrl)
            .success(populateCharts)
        // };
        
        //this function populates the charts for each category
        function populateCharts(response){
            
            var subDemographics = response["age"]
            
            // loops through each of the sub-categories within the chosen filter type
            for (subDemographic in subDemographics){
                var outcomes = subDemographics[subDemographic]
                
                var chartConfig = getChartConfig(subDemographic, outcomes)
                viewModel.chartConfigs.push(chartConfig);
            } //closes FOR loop

            
            //Builds config info for a single chart
                function getChartConfig(subDemographic, outcomes){ 

                    var chartConfig = {
                            id: "chart-" + subDemographic,
                            options: {
                      
                                chart: {
                                      type: 'column'
                                },
                                title: {
                                    text: 'Request Outcomes by ' + subDemographic
                                },
                                  tooltip: {
                                    headerFormat: '<b>{point.x}</b><br/>',
                                    pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
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
                              
                          series: [{
                                name: "First measure",
                                // data: [5, 4]
                                data: [outcomes["placement"], outcomes["no placement"] ]
                            }, {
                                name: 'second measure',
                                // data: [2, 7]
                                data: [outcomes["referred"], outcomes["Other"] ]
                            } ],

                          loading: false,
                          
                          useHighStocks: false,
                          
                          size: {
                           width: 400,
                           height: 300
                          },
                          //function (optional)
                          func: function (chart) {
                           //setup some logic for the chart
                          }
                        
                    };//closes chartConfig object
                    return chartConfig
                                      
                };//closes getChartConfig                            
        }; //closes populateCharts
    }; //closes outcomeController	
})();//closes document ready





// function showGraph(demo, outcomeData) {
// 	   console.log("Showing this " + demo)
// 		// when scope or timing issue solved attach chart to: $('#' + demo + '-chart.ng-scope')
//     $('#chart-' + demo).highcharts({
//         chart: {
//             type: 'column'
//         },
//         title: {
//             text: 'Request Outcomes by ' + demo
//         },
//         xAxis: {
//             categories: ['Success', 'Not Placed/Other']
//         },
//         yAxis: {
//             min: 0,
//             title: {
//                 text: 'Total requests'
//             },
//             stackLabels: {
//                 enabled: true,
//                 style: {
//                     fontWeight: 'bold',
//                     color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
//                 }
//             }
//         },
//         legend: {
//             align: 'right',
//             x: -30,
//             verticalAlign: 'top',
//             y: 25,
//             floating: true,
//             backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
//             borderColor: '#CCC',
//             borderWidth: 1,
//             shadow: false
//         },
//         tooltip: {
//             headerFormat: '<b>{point.x}</b><br/>',
//             pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
//         },
//         plotOptions: {
//             column: {
//                 stacking: 'normal',
//                 dataLabels: {
//                     enabled: true,
//                     color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
//                     style: {
//                         textShadow: '0 0 3px black'
//                     }
//                 }
//             }
//         },
//         series: [{
//             name: "First measure",
//             data: [outcomeData.placement, outcomeData["no placement"]]
//         }, {
//             name: 'second measure',
//             data: [outcomeData.referred, outcomeData["Other"]]
//         }, ]
//     });
// };