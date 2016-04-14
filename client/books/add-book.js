import angular from 'angular'
import angularComponent from 'angular-component'
import angularMeteor from 'angular-meteor'

import './books.modules'

import { Books } from '../../imports/api/books'
import Book from '../../imports/api/models/book'

var _showErrorMessage = message => {
    console.log(message)
}

class AddBookController {
    constructor($scope, $reactive, bookDataService) {      
        $scope.viewModel(this)
        $reactive(this).attach($scope)
        this.subscribe('books')

        this.title = ''
        this._dataService = bookDataService
    }
    
    findBooks() {
        var vm = this
        vm.awaitingResponse = true
        vm._dataService.getBooksByTitle(vm.title, function(err, matchingBooks) {
            vm.awaitingResponse = false
            if(err) return _showErrorMessage(vm, err)
            
            vm.matchingBooks = matchingBooks
        })        
    }
    
    addBook(book) {        
        book.setOwnerId(Meteor.userId())
        book.setOwnerUsername(Meteor.user().username)
        
        //Map to Book object to remove any properties added by Angular
        book = Book.mapToBook(book)
        this.apply('books.insert', [book], function(err) {
            if(err) return _showErrorMessage(err.reason)
            this.matchingBooks = null
        })
    }
}

angular.module('booksrus.books')
.component('addBook', {
    templateUrl: 'client/books/add-book.ng.html',
    controller: ['$scope', '$reactive', 'bookDataService', AddBookController]
})