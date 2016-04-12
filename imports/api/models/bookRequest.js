import { check } from 'meteor/check'

import RequestStatus from './requestStatus'

export default class BookRequest {
    constructor(requestor, owner, bookId) {
        check(bookId, String)
        check(requestor.fullname, String)
        check(owner.fullname, String)
        
        this.owner = owner
        this.requestor = requestor
        this.bookId = bookId
        this.status = RequestStatus.PENDING
    }
}