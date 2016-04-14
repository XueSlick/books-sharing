import angular from 'angular'

angular.module('booksrus.requests.routes')
.config(function($stateProvider, routeAuthenticationProvider) {    
    $stateProvider
    .state('bookRequests', {
        url: '/requests',
        template: '<book-requests></book-requests>',
        resolve: routeAuthenticationProvider.check
    })
})