import angular from 'angular'
import angularMeteor from 'angular-meteor'

import './books.modules'
import Book from '../../imports/api/models/book' 
import BookRequest from '../../imports/api/models/bookRequest' 
import { Books } from '../../imports/api/books'

import template from './books-list.ng.html'

class BooksListController {
    constructor($scope) {
        $scope.viewModel(this)
        
        this.subscribe('books')
        
        this.helpers({
            books() {
                //TODO: Add option to show all Books or only available ones
                return Books.find({
                    available: true,
                    ownerId: { $ne: Meteor.userId() }
                }, {
                    sort: { createdAt: -1 }
                })
            }
        })
    }
    
    requestBook(book) {
        book = Book.mapToBook(book)
        var request = new BookRequest(Meteor.userId(), book.ownerId, book)
        Meteor.call('bookrequests.insert', request)
        // Restrict active requests to one per book
        Meteor.call('books.setAvailable', book._id, false)
    }
}

angular.module('booksrus.books')
.component('booksList', {
    templateUrl: 'client/books/books-list.ng.html',
    controller: ['$scope', BooksListController]
})  