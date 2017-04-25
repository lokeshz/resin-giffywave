angular.module('app.routes', [])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/', {
                templateUrl: "client/tpl/main.html",
                controller: "MainController"
            })
            .when('/page2', {
                templateUrl: "client/tpl/page2.html"
            })
            .when('/page3', {
                templateUrl: "client/tpl/page2.html"
            })
            .when('/page4', {
                templateUrl: "client/tpl/page2.html"
            })
            .otherwise({
              template : "<h1>Nothing</h1><p>Nothing has been selected</p>"
            });
    }]);
