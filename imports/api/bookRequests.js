'use strict'

import { Mongo } from 'meteor/mongo'
import { Meteor } from 'meteor/meteor'

const BookRequests = new Mongo.Collection('bookrequests')

if(Meteor.isServer) {
    Meteor.publish('bookrequests', function bookRequestsPublication() {
        return BookRequests.find({})
    })
}


Meteor.methods({
    'bookrequests.insert'(request) {
        //TODO: Add type check
        BookRequests.insert(request)
    }
})

export default BookRequests