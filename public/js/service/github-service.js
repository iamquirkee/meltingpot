(function() {
  (function() {
    var githubService;
    githubService = function($rootScope, $window, apiService) {
      this.login = function() {
        return $window.location.href = '/github/login';
      };
    };
    githubService.$inject = ['$rootScope', '$window', 'apiService'];
    return angular.module('meltingpot').service('githubService', githubService);
  })();

}).call(this);
