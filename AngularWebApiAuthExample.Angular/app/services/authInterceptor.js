(function () {
    'use strict';

    var factoryId = 'authInterceptor';
    angular
        .module('app')
        .factory(factoryId, authInterceptor);

    authInterceptor.$inject = ['$q', '$location', 'localStorageService'];

    function authInterceptor($q, $location, localStorageService) {

        var service = {
            request: request,
            responseError: responseError,
        };

        return service;

        function request(config) {

            config.headers = config.headers || {};

            var authData = localStorageService.get('authorizationData');
            if (authData) {
                config.headers.Authorization = 'Bearer ' + authData.token;
            }

            return config;
        }

        function responseError(error) {
            if (error.status === 401) {
                $location.path('/login');
            }
            return $q.reject(error);
        }
    }
})();