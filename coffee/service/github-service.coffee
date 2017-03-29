githubService = ($rootScope, $window, apiService) ->

  @login = () ->
    $window.location.href = '/github/login'

  @notifications = (repo) ->
    apiService.get("github/notifications?repo=#{repo.full_name}")

  return

githubService
  .$inject = ['$rootScope', '$window', 'apiService']

angular.module('meltingpot')
  .service 'githubService', githubService
