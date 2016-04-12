import angular from 'angular'
import angularMeteor from 'angular-meteor'


var dependencies = [
    'ui.router',
    angularMeteor,
    'booksrus.books',
    'booksrus.books.routes',
    'booksrus.auth',
    'booksrus.auth.routes',    
    'booksrus.layout'
]

angular.module('booksrus', dependencies)
.config(function($locationProvider, $stateProvider, $urlRouterProvider) {
    $locationProvider.html5Mode(true);
    
    $stateProvider
    .state('home', {
        url: '/'
    })
    .state('notfound', {
        url: '/error/notfound',
        template: '<error-not-found></error-not-found>'
    })
    
    $urlRouterProvider.otherwise('/error/notfound');
    
})