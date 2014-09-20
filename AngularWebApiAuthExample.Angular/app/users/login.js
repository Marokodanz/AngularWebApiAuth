(function () {
    'use strict';

    var controllerId = 'login';

    angular
        .module('app')
        .controller(controllerId, login);

    login.$inject = ['$location', 'authenticator', 'common'];

    function login($location, authenticator, common) {
        /* jshint validthis:true */
        var vm = this;
        vm.title = 'login';
        vm.loginData = {
            userName: '',
            password: ''
        };
        vm.message = '';
        vm.loginUser = loginUser;

        activate();

        function activate() {
            common.activateController([], controllerId).then(function () {
            });
        }

        function loginUser() {
            authenticator.login(vm.loginData)
                .then(function (response) {
                    common.logger.logSuccess('Welcome to our world ' + authenticator.authData.userName, true);
                    $location.path('/');
                }, function (error) {
                    vm.message = error.error_description;
                });
        }
    }
})();
