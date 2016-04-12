import angularMeteor from 'angular-meteor'

import './book-data.service'

angular.module('booksrus.books', [angularMeteor, 'booksrus.books.services'])
angular.module('booksrus.books.routes', [angularMeteor, 'ui.router', 'booksrus.books'])