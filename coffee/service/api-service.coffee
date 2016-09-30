( ->

  apiService = ($q, $http, $timeout, messageService) ->
    self = this
    processing = false

    @get = (url) ->
      defer = $q.defer()
      $http.get(url).then ((res) ->
        if res.data.error
          self.returnError res.data, defer
          return
        defer.resolve res.data
        return
      ), (res) ->
        self.returnUnexpectedError res.data, res.status, defer
        return
      defer.promise

    @post = (url, data) ->
      defer = $q.defer()
      if processing == true
        $timeout (->
          self.returnUnexpectedError { msg: 'Process still running' }, 200, defer
          return
        ), 1
        return defer.promise
      $http.post(url, data).then ((res) ->
        processing = false
        if res.data.error
          self.returnError res.data, defer
          return
        defer.resolve res.data
        return
      ), (res) ->
        processing = false
        self.returnUnexpectedError res.data, res.status, defer
        return
      processing = true
      defer.promise

    @put = (url, data) ->
      defer = $q.defer()
      $http.put(url, data).then ((res) ->
        if res.data.error
          self.returnError res.data, defer
          return
        defer.resolve res.data
        return
      ), (res) ->
        self.returnUnexpectedError res.data, res.status, defer
        return
      defer.promise

    @delete = (url) ->
      defer = $q.defer()
      if processing == true
        $timeout (->
          self.returnUnexpectedError { msg: 'Process still running' }, 200, defer
          return
        ), 1
        return defer.promise
      $http.delete(url).then ((res) ->
        processing = false
        if res.data.error
          self.returnError res.data, defer
          return
        defer.resolve res.data
        return
      ), (res) ->
        processing = false
        self.returnUnexpectedError res.data, res.status, defer
        return
      processing = true
      defer.promise

    @returnError = (res, defer) ->
      messageService.error res.msg
      defer.reject res
      return

    @returnUnexpectedError = (res, status, defer) ->
      errorRes = self.returnUnexpectedErrorMsg(res, status)
      messageService.error errorRes.msg
      defer.reject errorRes
      return

    @returnUnexpectedErrorMsg = (res, status) ->
      if status != 200
        return { 'msg': 'Unknown error: ' + res }
      if typeof res == 'object'
        if res.msg
          res
        else
          { 'msg': res.toString() }
      else
        { 'msg': res }

    return

  apiService
    .$inject = ['$q', '$http', '$timeout', 'messageService']

  angular.module('meltingpot')
    .service 'apiService', apiService

)()
