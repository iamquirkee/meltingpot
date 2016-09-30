(function() {
  (function() {
    var $http, $q, bootstrapApplication, fetchUser, httpFetchUser, initApp, injector, retryFetchUser;
    injector = angular.injector(['ng']);
    $q = injector.get('$q');
    $http = injector.get('$http');
    $http.defaults.headers.common["Cache-Control"] = 'no-cache, no-store, must-revalidate';
    initApp = true;
    fetchUser = function() {
      var app, deferred;
      app = angular.module("meltingpot");
      deferred = $q.defer();
      httpFetchUser(deferred, app);
      return deferred.promise;
    };
    retryFetchUser = 0;
    httpFetchUser = function(deferred, app) {
      $http = angular.injector(['ng']).get('$http');
      $http.get('/api/user').then((function(response) {
        if (response.data === "Unauthorized") {
          initApp = false;
          window.location.href = "/github/login";
        } else {
          app.constant('MELTER', response.data);
        }
        response = null;
        deferred.resolve();
      }), function(errorResponse) {
        retryFetchUser++;
        if (retryFetchUser > 3) {
          app.constant('MELTER', null);
          if (Rollbar) {
            Rollbar.critical('Angular Fetch User Fail: ' + JSON.stringify(errorResponse));
          }
          deferred.reject();
        } else {
          httpFetchUser(deffered, app);
        }
      });
    };
    bootstrapApplication = function() {
      if (!initApp) {
        return;
      }
      return angular.element(document).ready(function() {
        return angular.bootstrap(document.documentElement, ['meltingpot']);
      });
    };
    return $q.all([fetchUser()]).then(function() {
      return bootstrapApplication();
    }, function(err) {
      if (Rollbar) {
        return Rollbar.critical("Angular bootstrap failed: " + JSON.stringify(err));
      }
    });
  })();

}).call(this);
