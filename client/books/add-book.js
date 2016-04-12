import angular from 'angular'
import angularComponent from 'angular-component'
import angularMeteor from 'angular-meteor'

import './books.modules'

import { Books } from '../../imports/api/books' 
import template from './add-book.ng.html'

var _showErrorMessage = message => {
    console.log(message)
}

class AddBookController {
    constructor(bookDataService, $scope) {      
        $scope.viewModel(this)
        this.subscribe('books')

        this.title = ''
        this._dataService = bookDataService
    }
    
    addBook() {
        var vm = this
        vm.awaitingResponse = true
        vm._dataService.getBooksByTitle(vm.title, function(err, matchingBooks) {
            vm.awaitingResponse = false
            if(err) return console.error(err)
            vm.title = ''
            Meteor.call('books.insert', matchingBooks[0])
            console.log(matchingBooks)
        })        
    }
}

angular.module('booksrus.books')
.component('addBook', {
    templateUrl: 'client/books/add-book.ng.html',
    controller: ['bookDataService', '$scope', AddBookController]
})