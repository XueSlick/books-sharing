import angular from 'angular'
import { Meteor } from 'meteor/meteor'

import BookRequest from '../../imports/api/models/bookRequest' 
import RequestStatus from '../../imports/api/models/requestStatus' 
import BookRequests from '../../imports/api/bookRequests'

import './requests.modules'

function _updateRequestStatus(request, status) {
    Meteor.call('bookrequests.setStatus', request._id, status)
    
    //FIXME: Is the controller really the best place for this logic?
    var bookAvailable = status != RequestStatus.ACCEPTED
    Meteor.call('books.setAvailable', request.book._id, bookAvailable)
}

class BookRequestsController {
    constructor($scope) {
        $scope.viewModel(this)
        Meteor.subscribe('bookrequests');
        
        this.helpers({
            usersRequests() {
                return BookRequests.find({ requestorId: Meteor.userId() })
            },
            
            pendingRequests() {
                return BookRequests.find({ 
                    ownerId: Meteor.userId(),
                    status: RequestStatus.PENDING
                 })
            },
            
            acceptedRequests() {
                return BookRequests.find({ 
                    ownerId: Meteor.userId(),
                    status: RequestStatus.ACCEPTED
                 })
            }
        })
    }
    
    cancel(request) {
        _updateRequestStatus(request, RequestStatus.CANCELLED)        
    }
    
    approve(request) {
        _updateRequestStatus(request, RequestStatus.ACCEPTED)
    }
    
    reject(request) {
        _updateRequestStatus(request, RequestStatus.REJECTED)     
    }
    
    statusText(request) {
        if(request.status === RequestStatus.PENDING && request.requestorId === Meteor.userId()) {
            return 'Awaiting owner\'s response'
        }
        return RequestStatus.statusText(request.status)
    }
    
    isPending(request) {
        return request.status == RequestStatus.PENDING
    }
}

angular.module('booksrus.requests')
.component('bookRequests', {
    templateUrl: 'client/bookRequests/book-requests.ng.html',
    controller: ['$scope', BookRequestsController]
})