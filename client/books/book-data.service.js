import angular from 'angular'

import Book from '../../imports/api/models/book'

angular.module('booksrus.books.services', [])
.factory('bookDataService', ['$http', function($http) {   
    function getBooksByTitle(title, callback) {
        if(!title) throw new Error('Title is required')
        
        var path = '/books/v1/volumes?q=+intitle=#title#&orderBy=relevance&maxResults=5'
                .replace(/#title#/g, title)
                                
        var options = {
            url: 'https://www.googleapis.com' + path
        }
        
        $http(options)
        .then(function(res) {
            if(res.statusCode >= 400) {
                return callback(new Error('An unexpected error occurred'))
            }
            
            var bookdata = res.data
            if(bookdata.totalItems < 1) {
                return callback(null, [])
            }
            
            var books = bookdata.items
            .filter(function removeItemsWithNoImages(item) {
                return !!item.volumeInfo.imageLinks
            })
            .map(function(item) {
                var title = item.volumeInfo.title
                var authors = item.volumeInfo.authors || []
                var thumbnail = item.volumeInfo.imageLinks.thumbnail
                return new Book(title, authors, thumbnail) 
            })
            
            callback(null, books)
        })
        .catch(function(err) {
            console.error(err)
            return callback(new Error('An unexpected error occurred'))             
        })
    }
    
    return {
        getBooksByTitle: getBooksByTitle
    }
}])