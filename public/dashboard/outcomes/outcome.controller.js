
angular
        .module('dashboard')
        .controller("outcomeController", ['$http', '$scope', outcomeController])

function outcomeController($http, $scope){
        var vm = this
        vm.populateCharts = populateCharts
        vm.submitFilters = submitFilters
        vm.chartConfigs = [];
        vm.demogFilter = { 
            demogSelect: "ALL",
            demogOptions: [
            {value: "ALL", name: "ALL"},
            {value: "age", name: "age"}, 
            {value: "historyOfViolence", name: "History of violence"},
            {value: "english", name: "English Proficiency"},
            {value: "mentalIllness", name: "Current mental health" },
            {value: "substanceAbuse", name: "Current Substance Abuse"},
            {value: "immigrationStatus", name: "Immigration Status"},
            {value: "genderId", name: "Gender identity"},
            {value: "traffickingType", name: "Type of trafficking/violence"},
            {value: "children", name: "Accompanying Children"},
            {value: "disabilities", name: "Physical disability"},
            {value: "governmentId", name: "Government Id"}
            ]
        }
        vm.regionFilter = {
            regionSelect: "ALL",
            regionOptions: [
                {value: "ALL", name: "ALL"},
                REGIONFILTERS.region1,
                REGIONFILTERS.region2,
                REGIONFILTERS.region3
            ]
        }
        vm.datePicker = {}
        vm.datePicker.date = {
            startDate: 1447142400000,
            endDate: moment()
        }
        vm.datePickerOptions = getDatePickerOptions()
        
        var datesRegion = {}
        var outcomesData = {};

        //This populates the charts
        $http.get(OUTCOMEURL)
        .then(storeResponseData)
        
        $scope.$watch(function dateChange(scope){ return vm.datePicker.date}, function handleDateChange(){
            vm.submitFilters(vm.datePicker.date, vm.regionFilter.regionSelect)
        })

        function getDatePickerOptions(){

            var datePickerOptions = {
                'locale': {'format': 'MM/DD/YYYY'},
                'showDropdowns': true,
                'ranges': {
                    'Today': [moment(), moment()],
                       'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                       'Last 7 Days': [moment().subtract(6, 'days'), moment()],
                       'Last 30 Days': [moment().subtract(29, 'days'), moment()],
                       'This Month': [moment().startOf('month'), moment().endOf('month')],
                       'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
                },
                'linkedCalendars': false,
                'startDate': '11/10/15',
                'endDate': moment()
            }
            return datePickerOptions
        };

        // // This function retrieves data from backend based on selected dates and ranges
        function submitFilters(dateFilter, regionFilter){
            var apiUrlQuery = OUTCOMEURL + "?region=" + regionFilter + "&startDate=" + dateFilter.startDate + "&endDate=" + dateFilter.endDate
            $http.get(apiUrlQuery)
            .then(storeResponseData) //immediately populates the charts
        };
        
        
        function storeResponseData(response){
            outcomesData = response.data
            populateDefaultChart()
        };

        function populateDefaultChart(){
            filterType = vm.demogFilter.demogSelect
            populateCharts(filterType)
        }

        // This uses data from api, takes in the filter type, and builds small multiples charts of each of the filter's categories
        function populateCharts(filterType){

            vm.chartConfigs = [];
            var subDemographics = outcomesData[filterType]       
            var maxY = getMaxY() //maxY is used in getChartConfig to set Y axis

            // loops through each of the sub-categories within the chosen filter type
            var subDemCount = Object.keys(subDemographics).length
            var count = 0
            
            // for building legend
            var colors = ['#1C5DB2', '#4294FF', '#B2780A', '#FFC353']
            var legendLabels = ['Placed', 'Referred', 'Not Placed', 'Other']
            var legendAttr = []
            vm.legendAttr = getLegendAttr()

            for (subDemographic in subDemographics){
                var outcomes = subDemographics[subDemographic]
                var chartConfig = getChartConfig(subDemographic, outcomes, colors)
                vm.chartConfigs.push(chartConfig);
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

            function getLegendAttr(){
                for (var i = 0; i < colors.length; i++) {
                    legendAttr.push({color: colors[i], label: legendLabels[i]})
                }
                return legendAttr
            }
            //Builds config info for a single chart
            function getChartConfig(subDemographic, outcomes, colors){ 

                var chartConfig = {
                        id: "chart-" + subDemographic,
                        
                        options: {
                            colors: colors,
                            chart: {
                                  type: 'column',
                                  marginTop: 100,
                                  borderWidth: 5,
                                  borderColor: '#abbdc3'
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
                                enabled: false,
                                align: 'right',
                                x: 0,
                                verticalAlign: 'bottom',
                                // y: 40,
                                // floating: true,
                                backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
                                borderColor: '#CCC',
                                borderWidth: 1,
                                shadow: false
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
                            name: "Placement",
                            data: [[0, outcomes["Placement"]]]
                        },
                        {
                            name: "Info Given",
                            data: [[0, outcomes["Info Given"]]]
                        },
                         {
                            name: 'No Placement',
                            data: [[1, outcomes["No Placement"]]]
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
