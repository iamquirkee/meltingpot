( ->

  User = (apiService, messageService, sortService) ->

    return (data) ->

      @initialized = false
      _repos = null
      @repos = () ->
        return _repos

      @init = (data) =>
        angular.extend this, data
        if data.id and data.name
          messageService.notify 'Hi, ' + data.name + '!'
        @initialized = true
        return

      if data
        @init data

      @session = =>
        userData = apiService.get('api/user')
        userData.then (data) =>
          @init data
          return
        userData

      @retrievePrivateRepos = =>
        apiService.get('github/organization/member')
          .then (repos) =>
            _repos = sortService.date(repos, "pushed_at", true)
            return

      return

  User
    .$inject = ["apiService", "messageService", "sortService"]

  angular.module('meltingpot')
    .factory 'User', User

)()
