import angular from 'angular'

angular.module('booksrus.ui.notifications')
.component('success', {
    templateUrl: 'client/notifications/success.ng.html',
    bindings: {
        message: '='
    }
})