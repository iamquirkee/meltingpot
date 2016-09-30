( ->

  RepoListCtrl = ($scope) ->
    if !$rootScope.globalState.user.repos()
      $rootScope.globalState.user.retrievePrivateRepos()
    console.log "RepoListCtrl"
    return

  RepoListCtrl
    .$inject = ['$scope']

  angular.module('meltingpot')
    .controller 'RepoListCtrl', RepoListCtrl

)()
