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
        
        this.onlyShowAvailable = true
        
        this.helpers({
            books() {
                var selector = {ownerId: { $ne: Meteor.userId() }}
                if(this.getReactively('onlyShowAvailable')) {
                   selector.available = true 
                }
                return Books.find(selector, {
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
    
    showAll() {
        this.onlyShowAvailable = false
    }
    
    showAvailable() {
        this.onlyShowAvailable = true
    }
}

angular.module('booksrus.books')
.component('booksList', {
    templateUrl: 'client/books/books-list.ng.html',
    controller: ['$scope', BooksListController]
})  