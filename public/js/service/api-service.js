(function() {
  (function() {
    var apiService;
    apiService = function($q, $http, $timeout, messageService) {
      var processing, self;
      self = this;
      processing = false;
      this.get = function(url) {
        var defer;
        defer = $q.defer();
        $http.get(url).then((function(res) {
          if (res.data.error) {
            self.returnError(res.data, defer);
            return;
          }
          defer.resolve(res.data);
        }), function(res) {
          self.returnUnexpectedError(res.data, res.status, defer);
        });
        return defer.promise;
      };
      this.post = function(url, data) {
        var defer;
        defer = $q.defer();
        if (processing === true) {
          $timeout((function() {
            self.returnUnexpectedError({
              msg: 'Process still running'
            }, 200, defer);
          }), 1);
          return defer.promise;
        }
        $http.post(url, data).then((function(res) {
          processing = false;
          if (res.data.error) {
            self.returnError(res.data, defer);
            return;
          }
          defer.resolve(res.data);
        }), function(res) {
          processing = false;
          self.returnUnexpectedError(res.data, res.status, defer);
        });
        processing = true;
        return defer.promise;
      };
      this.put = function(url, data) {
        var defer;
        defer = $q.defer();
        $http.put(url, data).then((function(res) {
          if (res.data.error) {
            self.returnError(res.data, defer);
            return;
          }
          defer.resolve(res.data);
        }), function(res) {
          self.returnUnexpectedError(res.data, res.status, defer);
        });
        return defer.promise;
      };
      this["delete"] = function(url) {
        var defer;
        defer = $q.defer();
        if (processing === true) {
          $timeout((function() {
            self.returnUnexpectedError({
              msg: 'Process still running'
            }, 200, defer);
          }), 1);
          return defer.promise;
        }
        $http["delete"](url).then((function(res) {
          processing = false;
          if (res.data.error) {
            self.returnError(res.data, defer);
            return;
          }
          defer.resolve(res.data);
        }), function(res) {
          processing = false;
          self.returnUnexpectedError(res.data, res.status, defer);
        });
        processing = true;
        return defer.promise;
      };
      this.returnError = function(res, defer) {
        messageService.error(res.msg);
        defer.reject(res);
      };
      this.returnUnexpectedError = function(res, status, defer) {
        var errorRes;
        errorRes = self.returnUnexpectedErrorMsg(res, status);
        messageService.error(errorRes.msg);
        defer.reject(errorRes);
      };
      this.returnUnexpectedErrorMsg = function(res, status) {
        if (status !== 200) {
          return {
            'msg': 'Unknown error: ' + res
          };
        }
        if (typeof res === 'object') {
          if (res.msg) {
            return res;
          } else {
            return {
              'msg': res.toString()
            };
          }
        } else {
          return {
            'msg': res
          };
        }
      };
    };
    apiService.$inject = ['$q', '$http', '$timeout', 'messageService'];
    return angular.module('meltingpot').service('apiService', apiService);
  })();

}).call(this);
