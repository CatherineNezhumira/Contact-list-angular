'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', ['ui.router', 'ngRoute', 'myApp.version', 'ng'])
    .config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');
    $routeProvider.otherwise({redirectTo: '/contacts'});

    $routeProvider.when('/contacts', {
        templateUrl: 'contacts/contacts.html',
        controller: 'ContactsController',
        controllerAs: 'vm'
    });
}]);

