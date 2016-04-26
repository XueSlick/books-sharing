import angular from 'angular'

import './users.modules'

angular.module('booksrus.users.routes')
.config(['$stateProvider', 'routeAuthenticationProvider', function($stateProvider, routeAuthenticationProvider) {
    $stateProvider
    .state('updateProfile', {
        url: '/users/profile',
        template: '<update-profile></update-profile>',
        resolve: routeAuthenticationProvider.check
    })
}])