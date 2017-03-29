RepoListItemCtrl = ($scope, githubService) ->

  $scope.getNotifications = () ->
    githubService.notifications($scope.repo)

  return

RepoListItemCtrl
  .$inject = ['$scope', 'githubService']

angular.module('meltingpot')
  .controller 'RepoListItemCtrl', RepoListItemCtrl
