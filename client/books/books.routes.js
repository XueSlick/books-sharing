import angular from 'angular'

import './books.modules'

angular.module('booksrus.books.routes')
.config(function($stateProvider) {    
    $stateProvider
    .state('allBooks', {
        url: '/books',
        template: '<books-list></books-list>'
    })
    .state('addBook', {
        url: '/books/add',
        template: '<add-book></add-book>'
    })
})