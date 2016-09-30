(function() {
  (function() {
    return angular.module("meltingpot", ['ngRoute', 'ngSanitize', 'ngAnimate', 'ngToast']).run([
      "$rootScope", "MELTER", "User", function($rootScope, MELTER, User) {
        $rootScope.globalState = {
          user: new User(MELTER)
        };
        return $rootScope.globalState.appInitialized = true;
      }
    ]);
  })();

}).call(this);
