describe('Testing angular js', function () {
    beforeEach(module('testingApp'));
    describe('Testing angular controller', function () {
        var scope = {};
        var ctrl, httpBackend;
        beforeEach(inject(function ($controller, $httpBackend) {
            ctrl = $controller('firstController', { $scope: scope });
            httpBackend = $httpBackend;
        }));
        afterEach(function () {
            httpBackend.verifyNoOutstandingExpectation();
            httpBackend.verifyNoOutstandingRequest();
        });
        it('should initialize the title in the scope', function () {
            expect(scope.title).toBeDefined();
            expect(scope.title).toBe('I love angular');
        });

        it('should add 2 destinations', function () {
            expect(scope.destinations).toBeDefined();
            expect(scope.destinations.length).toBe(0);

            scope.newDestination =
                {
                    city: "London",
                    country: "England"
                };

            scope.addDestination();

            expect(scope.destinations.length).toBe(1);
            expect(scope.destinations[0].city).toBe("London");
            expect(scope.destinations[0].country).toBe("England");

            scope.newDestination.city = "Frankfurt";
            scope.newDestination.country = "Germany";
            scope.addDestination();

            expect(scope.destinations.length).toBe(2);
            expect(scope.destinations[1].city).toBe("Frankfurt");
            expect(scope.destinations[1].country).toBe("Germany");
        });

        it('should remove a destination', function () {
            scope.destinations =
                [
                    {
                        city: "Paris",
                        country: "France"
                    },
                    {
                        city: "Warsaw",
                        country: "Poland"
                    }
                ];

            expect(scope.destinations.length).toBe(2);
            expect(scope.destinations[0].city).toBe("Paris");
            expect(scope.destinations[0].country).toBe("France");
            expect(scope.destinations[1]).toBeDefined();

            scope.removeDestination(0);

            expect(scope.destinations.length).toBe(1);
            expect(scope.destinations[0].city).toBe("Warsaw");
            expect(scope.destinations[0].country).toBe("Poland");
            expect(scope.destinations[1]).toBeUndefined();
        });
        it('should update the weather for a specific destination', function () {
            scope.destination =
                {
                    city: "Pune",
                    country: "India"
                };

            httpBackend.expectGET("http://api.openweathermap.org/data/2.5/weather?q=" + scope.destination.city + "&appid=" + scope.apiKey)
                .respond(
                {
                    weather: [{ main: 'Clear', description: 'clear sky' }],
                    main: { temp: 289.713 }
                }
                );

            scope.getWeather(scope.destination);

            httpBackend.flush();

            expect(scope.destination.weather.main).toBe("Clear");
            expect(scope.destination.weather.temp).toBe(17);
        });
    });
    describe('Testing AngularJS Filter', function () {
        it('should return only the warm countries', inject(function ($filter) {
            var filter = $filter;
            var destinations =
                [
                    {
                        city: "Beijing",
                        country: "China",
                        weather:
                        {
                            temp: 21
                        }
                    },
                    {
                        city: "Moscow",
                        country: "Russia"
                    },
                    {
                        city: "Mexico City",
                        country: "Mexico",
                        weather:
                        {
                            temp: 12
                        }
                    },
                    {
                        city: "Lima",
                        country: "Peru",
                        weather:
                        {
                            temp: 15
                        }
                    },
                ];
            expect(destinations.length).toBe(4);

            var warmestDestinations = filter("warmestDestinations")(destinations, 15);
            expect(warmestDestinations.length).toBe(2);
            expect(warmestDestinations[0].city).toBe("Beijing");
            expect(warmestDestinations[1].city).toBe("Lima");
        }));
    });

});