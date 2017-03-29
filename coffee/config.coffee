angular.module("meltingpot")

.config [

  '$locationProvider', '$compileProvider', '$httpProvider'
  ($locationProvider, $compileProvider, $httpProvider) ->

    $locationProvider.html5Mode(true)
    $locationProvider.hashPrefix('!')

    $compileProvider.debugInfoEnabled(false)
    $httpProvider.useApplyAsync(true)

    $httpProvider.defaults.headers.common['Cache-Control'] = 'no-cache, no-store, must-revalidate'
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/json'
    $httpProvider.defaults.headers.put['Content-Type'] = 'application/json'

]
