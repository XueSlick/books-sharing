import { check } from 'meteor/check'

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
        
        return obj.title !== undefined 
            && obj.authors !== undefined 
            && obj.thumbnail != undefined
            //&& obj.ownerId != undefined
            //&& obj.ownerUsername != undefined
    }
}