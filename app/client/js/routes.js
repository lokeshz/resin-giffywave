angular.module('app.routes', [])
    .config(['$routeProvider',
        function($routeProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: "client/tpl/main.html",
                    controller: "MainController"
                })
                .otherwise('/');
        }
    ]);
