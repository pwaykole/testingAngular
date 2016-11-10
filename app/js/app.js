var app = angular.module('testingApp', []);

app.controller('firstController', function ($scope) {
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
})