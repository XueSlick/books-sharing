const RequestStatus = {}
const PROPERTIES = {
    'AVAILABLE': 0,
    'PENDING': 1,
    'CANCELLED': 2,
    'ACCEPTED': 3,
    'REJECTED': 4
}

for(let prop in PROPERTIES) {
    Object.defineProperty(RequestStatus, prop, {
        enumerable: false,
        writable: false,
        configurable: false,
        value: PROPERTIES[prop]
    })   
}

export default RequestStatus