import angular from 'angular'
import angularMeteor from 'angular-meteor'

import './books.modules'
import { Books } from '../../imports/api/books' 
import template from './books-list.ng.html'

class BooksListController {
    constructor($scope) {
        $scope.viewModel(this)
        
        this.subscribe('books')
        
        this.helpers({
            books() {
                return Books.find({}, {sort: {createdAt: -1}})
            }
        })
    }
}

angular.module('booksrus.books')
.component('booksList', {
    templateUrl: 'client/books/books-list.ng.html',
    controller: ['$scope', BooksListController]
})  