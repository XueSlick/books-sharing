import angular from 'angular'

import './books.modules'

angular.module('booksrus.books.routes')
.config(['$stateProvider', 'routeAuthenticationProvider', function($stateProvider, routeAuthenticationProvider) {
    $stateProvider
    .state('allBooks', {
        url: '/books',
        template: '<books-list></books-list>',
        resolve: routeAuthenticationProvider.check
    })
    .state('addBook', {
        url: '/books/mybooks',
        template: '<my-books></my-books>',
        resolve: routeAuthenticationProvider.check
    })
}])
