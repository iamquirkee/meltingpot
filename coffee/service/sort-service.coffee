sortService = ->
  @string = (list, key) ->
    list.sort( (a, b) ->
      aValue = if a[key] then a[key].toLowerCase() else ""
      bValue = if b[key] then b[key].toLowerCase() else ""
      if aValue > bValue
        return 1
      else if aValue < bValue
        return -1
      else
        return 0
    )

  @int = (list, key, isDescending) ->
    isDescending = false if !isDescending
    list.sort( (a, b) ->
      aValue = if a[key] then parseInt(a[key], 10) else 0
      bValue = if b[key] then parseInt(b[key], 10) else 0
      if aValue > bValue
        return if isDescending then -1 else 1
      else if aValue < bValue
        return if isDescending then 1 else -1
      else
        return 0
    )

  @date = (list, key, isDescending) ->
    isDescending = false if !isDescending
    list.sort( (a, b) ->
      aValue = if a[key] then new Date(a[key]).valueOf() else 0
      bValue = if b[key] then new Date(b[key]).valueOf() else 0
      if aValue > bValue
        return if isDescending then -1 else 1
      else if aValue < bValue
        return if isDescending then 1 else -1
      else
        return 0
    )

  return

angular.module('meltingpot')
  .service 'sortService', sortService
