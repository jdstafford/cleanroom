'use strict';

angular.module('myApp.tasks', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/tasks', {
    templateUrl: 'tasks/tasks.html',
    controller: 'tasksCtrl'
  });
}])

.service('tasksSvc', ['$http', function($http){
  return {
    getTasks: function() {
      return $http.get('http://localhost:3000/tasks').then(function(response) {
        return response.data;
      });
    },
    createTask: function(params) {
      return $http.post('http://localhost:3000/tasks', params).then(function(response) {
        return response.data;
      });
    }
  }
}])

.controller('tasksCtrl', ['$scope', 'tasksSvc', function($scope, tasksSvc) {
  $scope.models = {};
  $scope.models.createTask = false;
  $scope.models.allDone = false;
  $scope.models.tasks = [];
  tasksSvc.getTasks().then(function(data) {
    $scope.models.tasks = data;
    $scope.models.currentTask = $scope.models.tasks[0];
  });
  $scope.addTask = function() {
    $scope.models.createTask = true;
  };
  $scope.cancelAddTask = function() {
    $scope.models.createTask = false;
  };
  $scope.saveAddTask = function() {
    tasksSvc.createTask({
      "description": $scope.models.newTask
    }).then(function(response) {
      $scope.models.tasks.push(response);
      $scope.models.currentTask = $scope.models.tasks[0];
      $scope.models.createTask = false;
      $scope.models.allDone = false;
    });
  };
  $scope.completeTask = function() {
    $scope.models.tasks.shift();
    if ($scope.models.tasks.length === 0) {
      $scope.models.allDone = true;
    }
    $scope.models.currentTask = $scope.models.tasks[0];
  };
}]);