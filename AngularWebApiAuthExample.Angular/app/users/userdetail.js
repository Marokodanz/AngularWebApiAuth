(function () {
    'use strict';

    var controllerId = 'userdetail';

    angular
        .module('app')
        .controller(controllerId, userdetail);

    userdetail.$inject = ['$routeParams', 'common']; 

    function userdetail($routeParams, common) {
        var userId = $routeParams.id || 0;

        /* jshint validthis:true */
        var vm = this;
        vm.title = 'userdetail';
        

        activate();

        function activate() {
            common.activateController([], controllerId).then(function () {

            });
        }
    }
})();
