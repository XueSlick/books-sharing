import { check } from 'meteor/check'

const PROPERTIES = {
    'title': true,
    'authors': true,
    'thumbnail': true,
    'ownerId': true,
    'ownerUsername': true
}

export default class Book {
    constructor(title, authors, thumbnailUrl) {
        check(title, String)
        check(authors, Array)
        check(thumbnailUrl, String)
        
        this.title = title
        this.authors = authors
        this.thumbnail = thumbnailUrl
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
        
        for(prop in PROPERTIES) {
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
        for(prop in PROPERTIES) {
            newBook[prop] = obj[prop]
        }
        return newBook
    }
}