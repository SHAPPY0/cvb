(function(){
	var app=angular.module('app', ['ngRoute']);
	app.controller('CountryCntrl',function ($scope) {
                $scope.countries = {
                    'India': {
                        'Maharashtra': ['Pune', 'Mumbai', 'Nagpur', 'Akola'],
                        'Madhya Pradesh': ['Indore', 'Bhopal', 'Jabalpur'],
                        'Rajasthan': ['Jaipur', 'Ajmer', 'Jodhpur']
                    },
                    'USA': {
                        'Alabama': ['Montgomery', 'Birmingham'],
                        'California': ['Sacramento', 'Fremont'],
                        'Illinois': ['Springfield', 'Chicago']
                    },
                    'Australia': {
                        'New South Wales': ['Sydney'],
                        'Victoria': ['Melbourne']
                    }
                };
            })
	
	}())