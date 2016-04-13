import angular from 'angular'
import { Meteor } from 'meteor/meteor'

import BookRequest from '../../imports/api/models/bookRequest' 
import BookRequests from '../../imports/api/bookRequests'

import './requests.modules'

class BookRequestsController {
    constructor($scope, $location) {
        $scope.viewModel(this)
        this._$location = $location
        Meteor.subscribe('bookrequests');
        
        this.helpers({
            usersRequests() {
                return BookRequests.find({ requestorId: Meteor.userId() })
            },
            
            pendingRequests() {
                return BookRequests.find({ ownerId: Meteor.userId() })
            }
        })
    }    
}

angular.module('booksrus.requests')
.component('bookRequests', {
    templateUrl: 'client/bookRequests/book-requests.ng.html',
    controller: ['$scope', '$location', BookRequestsController]
})