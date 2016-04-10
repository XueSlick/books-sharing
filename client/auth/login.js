import angular from 'angular'
import angularMeteor from 'angular-meteor'  
import angularComponent from 'angular-component'

// import template from './login.ng.html'

function _showMessage(viewModel, message) {
    console.log(message)
}

class LoginController {
    constructor($scope) {
        $scope.viewModel = this
    }
    
    login() {
        if(!this.username) {
            return _showMessage(this, 'Username is required')
        } else if(!this.password) {
            return _showMessage(this, 'Password is required')
        }
        
        Meteor.loginWithPassword(this.username, this.password, function(err, result) {
            if(err) return _showMessage(this, err.message)            
        })
    }
    
    logout() {
        Meteor.logout(err => {
            if(err) _showMessage(this, err.message)
        })
    }
}

export default angular.module('booksrus.auth')
.component('login', {
    templateUrl: 'client/auth/login.ng.html',
    controller: ['$scope', LoginController]
})