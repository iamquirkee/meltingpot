( ->

  githubService = ($rootScope, $window, apiService) ->

    @login = () ->
      $window.location.href = '/github/login'

    return

  githubService
    .$inject = ['$rootScope', '$window', 'apiService']

  angular.module('meltingpot')
    .service 'githubService', githubService

)()
