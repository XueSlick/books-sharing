import angular from 'angular'
import angularMeteor from 'angular-meteor'
import uiRouter from 'angular-ui-router';

import '../notifications/notifications.modules'


angular.module('booksrus.auth', ['booksrus.ui.notifications'])
angular.module('booksrus.auth.routes', ['booksrus.auth', uiRouter])