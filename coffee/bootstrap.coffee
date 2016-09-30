( ->
  injector = angular.injector(['ng'])
  $q = injector.get('$q')
  $http = injector.get('$http')
  $http.defaults.headers.common["Cache-Control"] = 'no-cache, no-store, must-revalidate'
  initApp = true

  fetchUser = ->
    app = angular.module("meltingpot")
    deferred = $q.defer()
    httpFetchUser(deferred, app)
    return deferred.promise

  retryFetchUser = 0
  httpFetchUser = (deferred, app) ->
    $http = angular.injector([ 'ng' ]).get('$http')
    $http.get('/api/user').then ((response) ->
      if response.data == "Unauthorized"
        initApp = false
        window.location.href = "/github/login"
      else
        app.constant 'MELTER', response.data
      response = null
      deferred.resolve()
      return
    ), (errorResponse) ->
      retryFetchUser++
      if retryFetchUser > 3
        app.constant 'MELTER', null
        if Rollbar
          Rollbar.critical 'Angular Fetch User Fail: ' + JSON.stringify(errorResponse)
        deferred.reject()
      else
        httpFetchUser deffered, app
      return
    return

  bootstrapApplication = ->
    return if !initApp
    angular.element(document).ready ->
      angular.bootstrap(document.documentElement, ['meltingpot'])

  $q.all([
    fetchUser()
  ]).then () ->
    bootstrapApplication()
  , (err) ->
    Rollbar.critical("Angular bootstrap failed: " + JSON.stringify(err)) if Rollbar
)()
