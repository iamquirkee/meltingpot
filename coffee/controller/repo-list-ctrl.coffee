RepoListCtrl = ($scope) ->
  if !$scope.globalState.user.repos()
    $scope.globalState.user.retrievePrivateRepos()
  console.log "RepoListCtrl"
  return

RepoListCtrl
  .$inject = ['$scope']

angular.module('meltingpot')
  .controller 'RepoListCtrl', RepoListCtrl
