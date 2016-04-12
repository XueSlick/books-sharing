import angular from 'angular'

import './auth.modules'

angular.module('booksrus.auth.routes')
.config(function($urlRouterProvider, $stateProvider, $locationProvider) {
    $locationProvider.html5Mode(true)
    
    $stateProvider
    .state('login', {
        url: '/auth/login',
        template: '<login></login>'
    })
    .state('register', {
        url: '/auth/register',
        template: '<register></register>'
    })
    .state('logout', {
        url: '/auth/logout',
        template: '<logout></logout>'
    })
})