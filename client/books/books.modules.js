import angularMeteor from 'angular-meteor'

import './book-data.service'

// angular.module('booksrus.books.services', [])
angular.module('booksrus.books', [angularMeteor, 'booksrus.books.services'])