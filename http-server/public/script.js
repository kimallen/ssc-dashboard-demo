(function(){

	angular
        .module('dashboard', ['highcharts-ng'])
        .controller("outcomeController", ['$http', outcomeController]);
    
    function outcomeController($http){
        
        var vm = this
        vm.populateCharts = populateCharts
        vm.chartConfigs = [];
        vm.demogFilter = { 
            demogSelect: "ALL",
            demogOptions: [
            {value: "ALL", name: "ALL"},
            {value: "age", name: "age"}, 
            {value: "violence", name: "History of violence"},
            {value: "english", name: "English Proficiency"},
            {value: "mental", name: "Current mental health" },
            {value: "substanceAbuse", name: "Current Substance Abuse"},
            {value: "immigrationStatus", name: "Immigration Status"},
            {value: "genderId", name: "Gender identity"},
            {value: "traffickingType", name: "Type of trafficking/violence"},
            {value: "children", name: "Accompanying Children"},
            {value: "disability", name: "Physical disability"}
            ]
        }

        vm.regionFilter = {
            regionSelect: "ALL",
            regionOptions: [
                {value: "ALL", name: "ALL"},
                {value: "NJ", name: "New Jersey"},
                {value: "Bay Area", name: "SF Bay Area"}
            ]
        }

        var datesRegion = {}
        var outcomesData = {};

        var apiUrl = 'http://localhost:3000/db'
        $http.get(apiUrl)
        .then(storeResponseData)

        // This function retrieves data from backend based on selected dates and ranges
        function getDatesRegion(options = {}){
            var formData = {options.dates, options.region}
            $http.(apiUrl, formData )
                .then(storeResponseData)
        };

        function defaultDatesRegion(){
            getDatesRegion(
                {
                dates:[
            "2016-06-06T21:19:44.867Z",
            "2016-06-12T21:19:44.867Z"
        ], region: "ALL"
    })
        }
        
        
        function storeResponseData(response){
            outcomesData = response.data
            populateDefaultChart()
        };

        function populateDefaultChart(){
            populateCharts("ALL")
        }

        //This uses data from api, takes in the filter type, and builds small multiples charts of each of the filter's categories
        function populateCharts(filterType){
            vm.chartConfigs = [];
            var subDemographics = outcomesData[filterType]       
            var maxY = getMaxY() //maxY is used in getChartConfig to set Y axis

            // loops through each of the sub-categories within the chosen filter type
            for (subDemographic in subDemographics){
                var outcomes = subDemographics[subDemographic]
                var chartConfig = getChartConfig(subDemographic, outcomes)
                vm.chartConfigs.push(chartConfig);
                console.log(chartConfig.id)
            } //closes FOR loop

            //This function gets the maximum value to use for the Y axis for all charts in the chosen filter
            function getMaxY(){
                var maxY = 0
                var newMax = 0
                
                for (subDemographic in subDemographics){
                    var outcomes = subDemographics[subDemographic]
                    var outcomeValues = Object.keys( outcomes ).map(function ( key ) { return outcomes[key]; }); 
                    var success = outcomeValues[0] + outcomeValues[1]
                    var successNot = outcomeValues[2] + outcomeValues[3]
                    newMaxY = Math.max(success, successNot)
                    if (newMaxY > maxY){maxY = newMaxY}
                }
                return maxY
            }

            //Builds config info for a single chart
            function getChartConfig(subDemographic, outcomes){ 

                var chartConfig = {
                        id: "chart-" + subDemographic,
                        options: {
                            color: ['#1C5DB2', '#4294FF', '#B2780A', '#FFC353'],
                            chart: {
                                  type: 'column',
                                  marginTop: 100
                            },
                            title: {
                                text: 'by ' + subDemographic,
                                floating: true
                            },
                              tooltip: {
                                headerFormat: '<b>{point.x}</b><br/>',
                                pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
                            },
                            xAxis: {
                                categories: ['Placed/Referred', 'Not Placed/Other']
                            },
                            yAxis: {
                                min: 0,
                                max: maxY, 
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
                                enabled: false
                            //     align: 'right',
                            //     x: 0,
                            //     verticalAlign: 'bottom',
                            //     y: 40,
                            //     floating: true,
                            //     backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
                            //     borderColor: '#CCC',
                            //     borderWidth: 1,
                            //     shadow: false
                            },
                            plotOptions: {
                                margin: 50,
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
                            name: "Placed",
                            data: [[0, outcomes["placement"]]]
                        },
                        {
                            name: "Referred",
                            data: [[0, outcomes["referred"]]]
                        },
                         {
                            name: 'Not placed',
                            data: [[1, outcomes["referred"]]]
                        },
                        {
                            name: 'Other',
                            data: [[1, outcomes["Other"]]]
                        }
                         ],
                        

                      loading: false,
                      
                      useHighStocks: false,                   
                    
                };//closes chartConfig object
                return chartConfig
                                  
            };//closes getChartConfig                            
        }; //closes populateCharts
    }; //closes outcomeController	
})();//closes document ready