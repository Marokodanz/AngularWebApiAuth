(function () {
    'use strict';

    var app = angular.module('app');

    // Collect the routes
    app.constant('routes', getRoutes());

    // Configure the routes and route resolvers
    app.config(['$routeProvider', 'routes', routeConfigurator]);

    function routeConfigurator($routeProvider, routes) {

        routes.forEach(function (r) {
            //$routeProvider.when(r.url, r.config);
            setRoute(r.url, r.config);
        });
        $routeProvider.otherwise({ redirectTo: '/' });

        function setRoute(url, config) {
            //Sets resolver for all the routes
            //by extending any existing resolvers (or create a new one.)
            config.resolve = angular.extend(config.resolve || {},
            {
                getSecurityData: getSecurityData,
                checkSecurity: checkSecurity
            });

            $routeProvider.when(url, config);
            return $routeProvider;
        }
    }

    getSecurityData.$inject = ['authenticator'];
    function getSecurityData(authenticator) {
        return authenticator.fillData();
    }

    checkSecurity.$inject = ['$q', '$route', '$location', 'authenticator', 'common'];
    function checkSecurity($q, $route, $location, authenticator, common) {        
        var settings = $route.current.settings;
        var loginRequired = settings.loginRequired || false;
        var roles = settings.roles || [];
        if (loginRequired) {
            if (!authenticator.authData.isAuth) {
                $location.path('/login');
            } else {
                if (roles.length > 0) {
                    if (!common.checkRole(authenticator.authData.roles, roles)) {
                        $location.path('/notauthorized').replace();         
                    }
                }
            }
        }        
    }

    // Define the routes 
    function getRoutes() {
        return [
            {
                url: '/',
                config: {
                    templateUrl: 'app/home/home.html',
                    title: 'home',
                    settings: {
                        nav: 1,
                        loginRequired: false,
                        roles: [],
                        content: '<i class="fa fa-dashboard"></i> Dashboard'
                    }
                }
            }, {
                url: '/about',
                config: {
                    templateUrl: 'app/home/about.html',
                    title: 'about',
                    settings: {
                        nav: 2,
                        loginRequired: false,
                        roles: [],
                        content: '<i class="fa fa-dashboard"></i> About'
                    }
                }
            }, {
                url: '/users',
                config: {
                    title: 'users',
                    templateUrl: 'app/users/users.html',
                    settings: {
                        nav: 4,
                        loginRequired: true,
                        roles: ['Admin', 'User'],
                        content: '<i class="fa fa-users"></i> Sessions'
                    }
                }
            }, {
                url: '/users/detail/:id',
                config: {
                    title: 'user detail',
                    templateUrl: 'app/users/userdetail.html',
                    settings: {
                        loginRequired: true,
                        roles: ['User']
                    }
                }
            }, {
                url: '/login',
                config: {
                    title: 'login',
                    templateUrl: 'app/users/login.html',
                    settings: {                        
                    }
                }
            }, {
                url: '/notauthorized',
                config: {
                    title: 'not authorized',
                    templateUrl: 'app/home/notauthorized.html',
                    settings: {
                    }
                }
            }
        ];
    }
})();