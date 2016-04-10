import angular from 'angular'
import angularMeteor from 'angular-meteor'

import './layout.modules'

import template from './header.ng.html'

class HeaderController {
    constructor($scope) {        
        $scope.viewModel(this)
    }
}

export default angular.module('booksrus.layout')
.component('header', {
    templateUrl: 'client/layout/header.ng.html',
    controller: ['$scope', HeaderController]
})