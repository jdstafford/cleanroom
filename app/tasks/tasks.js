'use strict';

angular.module('myApp.tasks', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/tasks', {
    templateUrl: 'tasks/tasks.html',
    controller: 'tasksCtrl'
  });
}])

.service('tasksSvc', [function(){

}])

.controller('tasksCtrl', ['$scope', function($scope) {
  $scope.models = {};
  $scope.models.tasks = [];
  $scope.models.currentTask = true;
}]);