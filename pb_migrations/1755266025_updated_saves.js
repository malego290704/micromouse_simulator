/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2977359881")

  // update collection data
  unmarshal({
    "updateRule": "@request.auth.id = player.id && @request.body.data = data && @request.body.maze.id = maze.id"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2977359881")

  // update collection data
  unmarshal({
    "updateRule": "@request.auth.id = player.id && @request.body.data = data"
  }, collection)

  return app.save(collection)
})
