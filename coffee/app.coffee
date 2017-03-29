angular.module("meltingpot", [
  'ngRoute'
  'ngSanitize'
  'ngAnimate'
  'ngToast'
])

.run [

  "$rootScope", "MELTER", "User"
  ($rootScope, MELTER, User) ->

    # console.log MELTER

    $rootScope.globalState = {
      user: new User(MELTER)
    }

    # console.log $rootScope.globalState.user

    $rootScope.globalState.appInitialized = true

]
