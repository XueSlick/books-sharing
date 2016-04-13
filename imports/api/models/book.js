import { check } from 'meteor/check'

import RequestStatus from './requestStatus'

const REQUIRED_PROPERTIES = [
    'title',
    'authors',
    'thumbnail',
    'ownerId',
    'ownerUsername',
    'available'
]

const OPTIONAL_PROPERTIES = [
    '_id'    
]

export default class Book {
    constructor(title, authors, thumbnailUrl, available) {
        check(title, String)
        check(authors, Array)
        check(thumbnailUrl, String)
        if(available !== undefined)
            check(available, Boolean)
        
        this.title = title
        this.authors = authors
        this.thumbnail = thumbnailUrl
        this.available = available !== undefined ? available : true
    }
    
    setOwnerId(userId) {
        check(userId, String)
        this.ownerId = userId
    }
    
    setOwnerUsername(username) {
        check(username, String)
        this.ownerUsername = username
    }
    
    static isBook(obj) {
        if(!obj) return false
        
        for(let i in REQUIRED_PROPERTIES) {
            let prop = REQUIRED_PROPERTIES[i]
            if(obj[prop] === undefined) {
                return false
            }
        }
        
        return true
    }
    
    static mapToBook(obj) {
        if(!Book.isBook(obj)) {
            throw new TypeError('obj must be a Book')
        }
        
        var newBook = {}
        REQUIRED_PROPERTIES.concat(OPTIONAL_PROPERTIES).forEach(function(prop) {
            newBook[prop] = obj[prop]
        })
        
        return newBook
    }
}