import angularMeteor from 'angular-meteor'

angular.module('booksrus.users', [angularMeteor])
angular.module('booksrus.users.routes', [angularMeteor, 'ui.router', 'booksrus.users'])