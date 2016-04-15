import angular from 'angular'
import angularMeteor from 'angular-meteor'

import './layout.modules'

import template from './header.ng.html'

class HeaderController {
    constructor($scope, $location) { 
        $scope.viewModel(this)
        this._$location = $location
    }
    
    username() {
        return Meteor.user() && Meteor.user().username
    }
    
    isActive(path) {
        return this._$location.path() === path
    }
}

angular.module('booksrus.layout')
.component('header', {
    templateUrl: 'client/layout/header.ng.html',
    controller: ['$scope', '$location', HeaderController]
})