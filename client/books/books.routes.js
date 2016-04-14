import angular from 'angular'

import './books.modules'

angular.module('booksrus.books.routes')
.config(function($stateProvider, routeAuthenticationProvider) {
    $stateProvider
    .state('allBooks', {
        url: '/books',
        template: '<books-list></books-list>',
        resolve: routeAuthenticationProvider.check
    })
    .state('addBook', {
        url: '/books/add',
        template: '<add-book></add-book>',
        resolve: routeAuthenticationProvider.check
    })
})
