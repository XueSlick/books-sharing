import angular from 'angular'

class DismissableErrorController {}

angular.module('booksrus.ui.notifications')
.component('error', {
    templateUrl: 'client/notifications/error.ng.html',
    bindings: {
        message: '='
    }
})