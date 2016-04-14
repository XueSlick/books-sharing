import angular from 'angular'

import { StatesList } from '../../imports/constants/states-list.js'
import './users.modules'

function _showMessage(viewModel, message) {
    viewModel.error = message
}

function _showSuccessMessage(viewModel, message) {
    viewModel.successMessage = message
}

function _clearSuccessMessage(viewModel) {
    viewModel.successMessage = ''
}

function _clearMessage(viewModel, message) {
    viewModel.error = ''
}

class UpdateProfileController {
    constructor($scope, $location, $reactive) {
        $scope.viewModel(this)
        Meteor.subscribe('userData');
        
        if(!Meteor.user() && Meteor.userId()) {
            return _showMessage(this, 'An error occurred.')
        }        
        var profile = Meteor.user().profile
        this.fullname = profile.fullname
        this.city = profile.city
        this.state = profile.state
        this.states = StatesList
        
        this._$location = $location
        this.awaitingResponse = false
        
        //FIXME: Hack to refresh UI after an external event
        this._$digest = function() {
            $scope.$digest()
        }
        
    }
    
    save() {
        var vm = this
        _clearSuccessMessage(vm)
        
        if(!vm.fullname) {
            return _showMessage(vm, 'Full name is required')
        } else if(!vm.city) {
            return _showMessage(vm, 'City is required')
        } else if(!vm.state) {
            return _showMessage(vm, 'State is required')
        }
        
        var profile = Meteor.user().profile
        profile.state = vm.state
        profile.city = vm.city
        profile.fullname = vm.fullname
        
        vm.awaitingResponse = true
        Meteor.users.update(Meteor.userId(), {
            $set: {profile: profile}
        }, function(err) {
            vm.awaitingResponse = false
            if(err) return _showMessage(vm, err.reason)
            _showSuccessMessage(vm, 'Profile updated.')
            vm._$digest()
        })
    }
}

angular.module('booksrus.users')
.component('updateProfile', {
    templateUrl: 'client/users/update-profile.ng.html',
    controller: ['$scope', '$location', '$reactive', UpdateProfileController]
})