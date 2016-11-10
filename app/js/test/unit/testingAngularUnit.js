describe('Testing angular js', function () {
    beforeEach(module('testingApp'));
    describe('Testing angular controller', function () {
        var scope = {};
        var ctrl;
        beforeEach(inject(function ($controller) {
            ctrl = $controller('firstController', { $scope: scope });
        }));
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
    });
});