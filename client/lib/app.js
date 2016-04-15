import angular from 'angular'
import angularMeteor from 'angular-meteor'


var dependencies = [
    'ui.router',
    angularMeteor,
    'booksrus.books',
    'booksrus.utils',
    'booksrus.books.routes',
    'booksrus.requests',
    'booksrus.requests.routes',      
    'booksrus.auth',
    'booksrus.auth.routes',
    'booksrus.users',
    'booksrus.users.routes',
    'booksrus.layout'
]

angular.module('booksrus', dependencies)
.config(function($locationProvider, $stateProvider, $urlRouterProvider) {
    $locationProvider.html5Mode(true);
    
    $stateProvider
    .state('home', {
        url: '/',
        controller: function redirect($state) {
            //TODO: Remove after creating home page
            if(!Meteor.userId())
                return $state.go('login')
            $state.go('allBooks')
        }
    })
    .state('notfound', {
        url: '*path',
        template: '<h1>The page you\'re looking for isn\'t here :(</h1>'
    })
})
.run(function run($rootScope, $state) {
    'ngInject'
    
    $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
        if(error == 'AUTH_REQUIRED') {
            $state.go('login')
        }
    })
})

