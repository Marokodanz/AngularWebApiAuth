(function () {
    'use strict';

    var controllerId = 'shell';

    angular
        .module('app')
        .controller(controllerId, shell);

    shell.$inject = ['$rootScope', 'authenticator', 'common', 'config'];

    function shell($rootScope, authentitcator, common, config) {
        /* jshint validthis:true */
        var vm = this;
        vm.title = 'shell';
        vm.busyMessage = 'Please wait ...';
        vm.isBusy = true;
        vm.spinnerOptions = {
            radius: 40,
            lines: 7,
            length: 0,
            width: 30,
            speed: 1.7,
            corners: 1.0,
            trail: 100,
            color: '#F58A00'
        };
        vm.showSplash = true;
        vm.authentication = authentitcator.authData;
        vm.logOut = logOut;

        activate();

        function activate() {
            common.activateController([], controllerId).then(function () {
                common.logger.logSuccess('Application Loaded', true);
                vm.showSplash = false;
            });
        }

        function logOut() {
            authentitcator.logOut();
        }

        function toggleSpinner(on) { vm.isBusy = on; }

        $rootScope.$on('$routeChangeStart',
            function(event, next, current) {
                 toggleSpinner(true);
            }
        );

        $rootScope.$on(config.events.controllerActivateSuccess,
            function(data) {
                 toggleSpinner(false);
            }
        );

        $rootScope.$on(config.events.spinnerToggle,
            function(data) {
                 toggleSpinner(data.show);
            }
        );
    }
})();
