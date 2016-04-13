'use strict'

import { Mongo } from 'meteor/mongo'
import { Meteor } from 'meteor/meteor'
import { check } from 'meteor/check'

const BookRequests = new Mongo.Collection('bookrequests')

if(Meteor.isServer) {
    Meteor.publish('bookrequests', function bookRequestsPublication() {
        var userId = this.userId
        return BookRequests.find({
            $or: [
                { requestorId: userId },
                { ownerId: userId } 
            ]
        })
    })
}


Meteor.methods({
    'bookrequests.insert'(request) {
        //TODO: Add type check
        BookRequests.insert(request)
    },
    
    'bookrequests.setStatus'(requestId, status) {
        check(requestId, String)
        check(status, Number)    
        BookRequests.update(requestId, {
            $set: {status: status}
        })
    }
})
export default BookRequests