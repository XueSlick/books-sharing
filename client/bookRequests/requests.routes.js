import angular from 'angular'

angular.module('booksrus.requests.routes')
.config(function($stateProvider) {    
    $stateProvider
    .state('bookRequests', {
        url: '/requests',
        template: '<book-requests></book-requests>'
    })
})