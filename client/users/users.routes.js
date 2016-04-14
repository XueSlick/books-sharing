import angular from 'angular'

import './users.modules'

angular.module('booksrus.users.routes')
.config(function($stateProvider) {    
    $stateProvider
    .state('updateProfile', {
        url: '/users/profile',
        template: '<update-profile></update-profile>'
    })
})