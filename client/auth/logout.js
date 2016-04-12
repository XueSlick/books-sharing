import angular from 'angular'
import { Meteor } from 'meteor/meteor'


class LogoutController {
    constructor($scope, $location) {
        $scope.viewModel(this)
        this._$location = $location
    }
    
    logout() {
        var vm = this
        
        Meteor.logout(err => {
            if(err) _showMessage(vm, err.message)
            vm._$location.path('/')
        })
    }
}

angular.module('booksrus.auth')
.component('logout', {
    templateUrl: 'client/auth/logout.ng.html',
    controller: ['$scope', '$location', LogoutController]
})