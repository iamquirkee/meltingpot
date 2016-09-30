(function() {
  (function() {
    var RepoListCtrl;
    RepoListCtrl = function($scope) {
      if (!$rootScope.globalState.user.repos()) {
        $rootScope.globalState.user.retrievePrivateRepos();
      }
      console.log("RepoListCtrl");
    };
    RepoListCtrl.$inject = ['$scope'];
    return angular.module('meltingpot').controller('RepoListCtrl', RepoListCtrl);
  })();

}).call(this);
