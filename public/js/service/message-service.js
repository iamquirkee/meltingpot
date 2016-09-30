(function() {
  (function() {
    var messageService;
    messageService = function($rootScope, ngToast) {
      this.error = function(msg) {
        ngToast.create({
          className: 'error',
          content: msg
        });
      };
      this.notify = function(msg) {
        ngToast.create(msg);
      };
      this.success = function(msg) {
        ngToast.create({
          className: 'success',
          content: msg
        });
      };
      this.alert = function(title, body, ok, cb) {
        if (!cb) {
          cb = function(data) {};
        }
      };
      this.confirm = function(title, body, yess, noo, cb) {
        if (!cb) {
          cb = function(data) {};
        }
      };
    };
    messageService.$inject = ['$rootScope', 'ngToast'];
    return angular.module('meltingpot').config([
      'ngToastProvider', function(ngToastProvider) {
        return ngToastProvider.configure({
          additionalClasses: 'slide'
        });
      }
    ]).service('messageService', messageService);
  })();

}).call(this);
