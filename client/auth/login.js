import angular from 'angular'
import angularMeteor from 'angular-meteor'  
import angularComponent from 'angular-component'
import { Meteor } from 'meteor/meteor'

function _showMessage(viewModel, message) {
    viewModel.error = message
}

function _clearMessage(viewModel, message) {
    viewModel.error = ''
}

class LoginController {
    constructor($scope, $location) {
        $scope.viewModel(this)
        this._$location = $location

        Meteor.subscribe('userData');
    }
    
    login() {
        var vm = this
        if(!vm.username) {
            return _showMessage(vm, 'Username is required')
        } else if(!vm.password) {
            return _showMessage(vm, 'Password is required')
        }

        Meteor.loginWithPassword(vm.username, vm.password, function(err) {
            if(err) {
                if(err.error == 403) 
                    return _showMessage(vm, 'Invalid username or password.')
                else
                    return _showMessage(vm, err.reason)
            }
            
            vm._$location.path('/')            
        })
    }
}

angular.module('booksrus.auth')
.component('login', {
    templateUrl: 'client/auth/login.ng.html',
    controller: ['$scope', '$location', LoginController]
})