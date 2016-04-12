const RequestStatus = {}
const PROPERTIES = {
    'AVAILABLE': 0,
    'PENDING': 1,
    'CANCELLED': 2,
    'ACCEPTED': 3,
    'REJECTED': 4
}

const STATUS_CODE_LOOKUP = {}

RequestStatus.isValid = function(statusCode) {
    return STATUS_CODE_LOOKUP[statusCode] !== undefined
}

RequestStatus.statusText = function(statusCode) {
    if(!RequestStatus.isValid(statusCode))
        throw new ValueError('Invalid status code')
    return STATUS_CODE_LOOKUP[statusCode]
}

for(let prop in PROPERTIES) {
    Object.defineProperty(RequestStatus, prop, {
        enumerable: false,
        writable: false,
        configurable: false,
        value: PROPERTIES[prop]
    })
    
    let capitalizedPropName = prop.charAt(0).toUpperCase() + prop.substring(1).toLowerCase()
    STATUS_CODE_LOOKUP[PROPERTIES[prop]] = capitalizedPropName
}

export default RequestStatus