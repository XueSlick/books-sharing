'use strict'

import { Mongo } from 'meteor/mongo'
import { Meteor } from 'meteor/meteor'
import { check } from 'meteor/check'

import Book from './models/book'

export const Books = new Mongo.Collection('books')

function _verifyAuthentication() {
    if(!Meteor.user()) {
        throw new Meteor.Error('Not authorized')
    }
}

if(Meteor.isServer) {
    Meteor.publish('books', function booksPublication() {
        return Books.find({}, { sort: {createdAt: -1}})
    })
}


Meteor.methods({
    'books.insert'(book) {
        if(!Book.isBook(book))
            throw new TypeError('book must be a Book')
        
        var bookRecord = JSON.parse(JSON.stringify(book))
        bookRecord.createdAt = new Date() 
        
        Books.insert(bookRecord)
    },
    
    'books.setAvailable'(bookId, available) {
        check(bookId, String)
        check(available, Boolean)
        
        Books.update(bookId, {
            $set: { available: available }
        })
    }
})