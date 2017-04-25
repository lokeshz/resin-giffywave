angular.module('app.routes', [])
    .config(['$routeProvider',
        function($routeProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: "client/tpl/main.html",
                    controller: "MainController"
                })
                .when('/page2', {
                    templateUrl: "client/tpl/page2.html",
                    controller: "MainController"
                })
                .otherwise('/');
        }
    ]);
