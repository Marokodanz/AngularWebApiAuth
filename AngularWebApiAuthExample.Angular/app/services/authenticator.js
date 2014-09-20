(function () {
    'use strict';

    var factoryId = 'authenticator';

    angular
        .module('app')
        .factory(factoryId, authenticator);

    authenticator.$inject = ['$q', '$location', 'dataservice', 'localStorageService'];

    function authenticator($q, $location, dataservice, localStorageService) {

        var authData = {
            isAuth: false,
            userName: '',
            userRetreived: false,
            firstName: '',
            lastName: '',
            email: '',
            roles: []
        };

        var service = {
            authData: authData,
            login: login,
            logOut: logOut,
            fillData: fillData
        };

        return service;

        function login(loginData) {
            return dataservice.login(loginData)
                .then(function (result) {
                    localStorageService.set('authorizationData',
                    { token: result.access_token, userName: loginData.userName });

                    authData.isAuth = true;
                    authData.userName = loginData.userName;
                    authData.userRetreived = false;
                    return result;
                }, function (error) {
                    return $q.reject(error);
                });
        }

        function logOut() {
            localStorageService.remove('authorizationData');
            authData.isAuth = false;
            authData.userName = '';
            authData.userRetreived = false;
            authData.firstName = '';
            authData.lastName = '';
            authData.email = '';
            authData.roles.slice(0, authData.roles.length);
            $location.path('/');
        }

        function fillData() {
            //TODO: Need to go to the server and get the rest of the data.
            var data = localStorageService.get('authorizationData');
            if (data) {
                authData.isAuth = true;
                authData.userName = data.userName;
            }

            $q.when(true);
        }
    }
})();