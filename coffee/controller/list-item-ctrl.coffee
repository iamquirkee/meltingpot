ListItemCtrl = ($scope, githubService) ->

  $scope.getNotifications = () ->
    githubService.notifications($scope.repo)

  return

ListItemCtrl
  .$inject = ['$scope', 'githubService']

angular.module('meltingpot')
  .controller 'ListItemCtrl', ListItemCtrl
