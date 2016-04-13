import { check } from 'meteor/check'

import RequestStatus from './requestStatus'
import Book from './book'

export default class BookRequest {
    constructor(requestorId, ownerId, book) {
        check(requestorId, String)
        check(ownerId, String)
        if(!Book.isBook(book)) {
            throw new TypeError('book must be a Book')
        }
        
        this.ownerId = ownerId
        this.requestorId = requestorId
        this.book = book
        this.status = RequestStatus.PENDING
    }
}