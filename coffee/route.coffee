( ->
  angular.module("meltingpot")

  .config [

    "$routeProvider"
    ($routeProvider) ->

      $routeProvider.when("/"
        controller: "RepoListCtrl"
        templateUrl: "/html/repo_list"
      ).otherwise({redirectTo:'/'})

  ]
)()
