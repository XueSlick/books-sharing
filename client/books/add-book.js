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
    constructor($scope, $location, bookDataService) {      
        $scope.viewModel(this)
        this.subscribe('books')

        this.title = ''
        this._$location = $location
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
        Meteor.call('books.insert', Book.mapToBook(book))
        this._$location.path('/books')
    }
}

angular.module('booksrus.books')
.component('addBook', {
    templateUrl: 'client/books/add-book.ng.html',
    controller: ['$scope', '$location', 'bookDataService', AddBookController]
})