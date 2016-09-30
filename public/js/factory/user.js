(function() {
  (function() {
    var User;
    User = function(apiService, messageService, sortService) {
      return function(data) {
        var _repos;
        this.initialized = false;
        _repos = [];
        this.repos = function() {
          return _repos;
        };
        this.init = (function(_this) {
          return function(data) {
            angular.extend(_this, data);
            if (data.id && data.name) {
              messageService.notify('Hi, ' + data.name + '!');
            }
            _this.initialized = true;
          };
        })(this);
        if (data) {
          this.init(data);
        }
        this.session = (function(_this) {
          return function() {
            var userData;
            userData = apiService.get('api/user');
            userData.then(function(data) {
              _this.init(data);
            });
            return userData;
          };
        })(this);
        this.retrievePrivateRepos = (function(_this) {
          return function() {
            return apiService.get('github/organization/member').then(function(repos) {
              _repos = sortService.date(repos, "pushed_at", true);
              console.log(_repos);
            });
          };
        })(this);
      };
    };
    User.$inject = ["apiService", "messageService", "sortService"];
    return angular.module('meltingpot').factory('User', User);
  })();

}).call(this);
