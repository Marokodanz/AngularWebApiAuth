﻿(function () {
    'use strict';

    var app = angular.module('app');

    // Configure Toastr
    toastr.options.timeOut = 4000;
    toastr.options.positionClass = 'toast-bottom-right';

    var keyCodes = {
        backspace: 8,
        tab: 9,
        enter: 13,
        esc: 27,
        space: 32,
        pageup: 33,
        pagedown: 34,
        end: 35,
        home: 36,
        left: 37,
        up: 38,
        right: 39,
        insert: 45,
        del: 46
    };

    var apiServices = {
        account: 'account',
        people: 'people',
        login: 'login'
    };

    var baseUrl = 'http://localhost:59063';
    var apiBaseUrl = "/api/"; 


    var events = {
        controllerActivateSuccess: 'controller.activateSuccess',
        spinnerToggle: 'spinner.toggle'
    };

    var config = {
        appErrorPrefix: '[WebF1 Error] ', //Configure the exceptionHandler decorator
        docTitle: 'WebF1 Test: ',
        httpCacheName: 'httpCache',
        keyCodes: keyCodes,
        apiServices: apiServices,
        events: events,
        baseUrl: baseUrl,
        apiUrl: baseUrl + apiBaseUrl,
        version: '1.0.0'
    };

    app.value('config', config);

    app.config(['$logProvider', function ($logProvider) {
        // turn debugging off/on (no info or warn)
        if ($logProvider.debugEnabled) {
            $logProvider.debugEnabled(true);
        }
    }]);
})();