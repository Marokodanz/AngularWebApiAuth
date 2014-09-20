(function () {
    'use strict';

    var factoryId = 'dataservice';

    angular
        .module('app')
        .factory(factoryId, dataservice);

    dataservice.$inject = ['$http', '$q', 'logger', 'common', 'config'];

    function dataservice($http, $q, logger, common, config) {

        var service = {
            login: login,
            logout: logout,
            getPeople: getPeople,
            getUserInfo: getUserInfo,
        };

        return service;

        function login(loginData) {
            var url = common.serviceUrl(config.apiServices.login);
            var data = "grant_type=password&username=" +
                loginData.userName + "&password=" + loginData.password;
            var header = { 'Content-Type': 'application/x-www-form-urlencoded' };


            var deferred = $q.defer();

            $http.post(url, data, {
                headers: header
            }).success(function (response) {
                deferred.resolve(response);
            }).error(function (error, status) {
                deferred.reject(error);
            });

            return deferred.promise;
        }

        function logout() {
            var url = common.serviceUrl(config.apiServices.account) + "Logout";
            return $http.post(url);
        }

        function getPeople() {
            var url = common.serviceUrl(config.apiServices.people) + 'List';
            
            return $http.get(url);
        }

        function getUserInfo() {
            var url = common.serviceUrl(config.apiServices.account) + 'LocalUserInfo';
            return $http.get(url);
        }

    }
})();