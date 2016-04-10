import angular from 'angular'

import './auth.modules'

angular.module('booksrus.auth.routes')
.config(function($urlRouterProvider, $stateProvider, $locationProvider) {
    $locationProvider.html5Mode(true)
    
    $stateProvider
    .state('login', {
        url: '/auth/login',
        templateUrl: 'login.html',
        controller: 'LoginController'
    })
    .state('register', {
        url: '/auth/register',
        templateUrl: 'register.html',
        controller: 'RegisterController'
    })
})