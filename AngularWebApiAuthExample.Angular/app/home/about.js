(function () {
    'use strict';

    var controllerId = 'about';

    angular
        .module('app')
        .controller(controllerId, about);

    about.$inject = ['common']; 

    function about(common) {
        /* jshint validthis:true */
        var vm = this;
        vm.title = 'about';

        activate();

        function activate() {
            common.activateController([], controllerId).then(function () {
            });
        }
    }
})();
