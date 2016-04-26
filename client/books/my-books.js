import angular from 'angular'

import './books.modules'

import { Books } from '../../imports/api/books'

class MyBooksController {
    constructor($scope) { 
        $scope.viewModel(this)
        this.subscribe('books')
        
        this.helpers({
            books() {
                return Books.find({ownerId: Meteor.userId()}, {sort: {createdAt: -1}})
            }
        })
    }
}

angular.module('booksrus.books')
.component('myBooks', {
    templateUrl: 'client/books/my-books.ng.html',
    controller: ['$scope', MyBooksController]
})