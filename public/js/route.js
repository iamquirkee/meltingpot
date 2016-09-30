(function() {
  (function() {
    return angular.module("meltingpot").config([
      "$routeProvider", function($routeProvider) {
        return $routeProvider.when("/", {
          controller: "RepoListCtrl",
          templateUrl: "/html/repo_list"
        }).otherwise({
          redirectTo: '/'
        });
      }
    ]);
  })();

}).call(this);
