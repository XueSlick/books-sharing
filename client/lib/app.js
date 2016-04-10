import angular from 'angular'
import angularMeteor from 'angular-meteor'


var dependencies = [
    'ui.router',
    angularMeteor,
    'booksrus.books',
    'booksrus.auth',
    'booksrus.auth.routes',    
    'booksrus.layout'
]

angular.module('booksrus', dependencies)