results = []
results2 = []

urls = [
  "test",
  "test2",
  "test3"
]

for url in urls
  do (url) ->
    setTimeout( ->
      results.push url
    , 1000)

  # vs

  setTimeout( ->
    results2.push url
  , 1000)

console.log results
console.log results2
