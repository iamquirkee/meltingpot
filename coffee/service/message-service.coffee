messageService = ($rootScope, ngToast) ->

  @error = (msg) ->
    ngToast.create({
      className: 'error',
      content: msg
    })
    return

  @notify = (msg) ->
    ngToast.create(msg)
    return

  @success = (msg) ->
    ngToast.create({
      className: 'success',
      content: msg
    })
    return

  @alert = (title, body, ok, cb) ->
    if !cb

      cb = (data) ->


    return

  @confirm = (title, body, yess, noo, cb) ->
    if !cb

      cb = (data) ->

    return

  return

messageService
  .$inject = ['$rootScope', 'ngToast']

angular.module('meltingpot')
  .config [
    'ngToastProvider',
    (ngToastProvider) ->
      ngToastProvider.configure({
        additionalClasses: 'slide'
      })
  ]
  .service 'messageService', messageService
