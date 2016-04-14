import angular from 'angular'

import './utils.modules'

angular.module('booksrus.utils')
.provider('routeAuthentication', function routeAuthenticationProvider() {
    this.check = {
        validateAuthentication($q) {
            if(Meteor.userId() == null) {
                return $q.reject('AUTH_REQUIRED')
            }
            return $q.resolve()
        }
    }
    
    this.$get = function() {}
})