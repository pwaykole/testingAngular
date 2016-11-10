var app = angular.module('testingApp', []);

app.controller('firstController', function ($scope, $http, $timeout) {
    $scope.apiKey = '7cadaddb01307afac58eb68ebec1e7ba';
    $scope.title = 'I love angular';
    $scope.destinations = [];
    $scope.newDestination = {
        city: undefined,
        country: undefined
    };

    $scope.addDestination = function () {
        $scope.destinations.push(
            {
                city: $scope.newDestination.city,
                country: $scope.newDestination.country
            });
    };

    $scope.removeDestination = function (index) {
        $scope.destinations.splice(index, 1);
    };

    $scope.getWeather = function (destination) {
        $http.get("http://api.openweathermap.org/data/2.5/weather?q=" + destination.city + "&appid=" + $scope.apiKey)
            .then(function success(res) {
                if (res.data.weather) {
                    destination.weather = {};
                    destination.weather.main = res.data.weather[0].main;
                    destination.weather.temp = $scope.keltocel(res.data.main.temp);
                }
                else {
                    $scope.message = "City not found";
                }
            }, function error(err) {
                $scope.message = "Server Error";
            })
    }

    $scope.keltocel = function (temp) {
        return Math.round(temp - 273);
    }

    $scope.messageWatcher = $scope.$watch('message', function () {
    if ($scope.message) {
      $timeout(function () {
        $scope.message = null;
      }, 3000);
    }
  });
});

app.filter('warmestDestinations', function () {

  return function (destinations, minimumTemp) {
    var warmDestinations = [];
    angular.forEach(destinations, function (destination) {
      if (destination.weather && destination.weather.temp >= minimumTemp) {
        warmDestinations.push(destination);
      }
    });

    return warmDestinations;
  };

});