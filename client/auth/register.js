import { Accounts } from 'meteor/accounts-base'
import angular from 'angular'
import angularMeteor from 'angular-meteor'  
import angularComponent from 'angular-component'
import { Meteor } from 'meteor/meteor'

import { StatesList } from '../../imports/constants/states-list.js'

function _showMessage(viewModel, message) {
    viewModel.error = message
}

function _clearMessage(viewModel, message) {
    viewModel.error = ''
}

class RegisterController {
    constructor($scope, $location) {
        $scope.viewModel(this)
        
        
        this.states = StatesList
        this._$location = $location
        Meteor.subscribe('userData');
    }
    
    register() {
        var vm = this
        
        if(!vm.username) {
            return _showMessage(vm, 'Username is required')
        } else if(!vm.password) {
            return _showMessage(vm, 'Password is required')
        } else if(vm.password !== vm.confirmPassword) {
            return _showMessage(vm, 'Passwords do not match')
        }
        
        var user = {
            username: vm.username,
            password: vm.password,
            profile: {
                state: vm.state,
                city: vm.city,
                fullname: vm.fullname
            }
        }

        Accounts.createUser(user, function(err) {
            if(err) return _showMessage(err.reason)
            vm._$location.path('/')
        })
    }
}

angular.module('booksrus.auth')
.component('register', {
    templateUrl: 'client/auth/register.ng.html',
    controller: ['$scope', '$location', RegisterController]
})