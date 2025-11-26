/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2977359881")

  // update collection data
  unmarshal({
    "listRule": "@request.auth.id = player.id || @request.auth.collectionName = \"admins\"",
    "viewRule": "@request.auth.id = player.id || @request.auth.collectionName = \"admins\""
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2977359881")

  // update collection data
  unmarshal({
    "listRule": "@request.auth.id = player.id",
    "viewRule": "@request.auth.id = player.id"
  }, collection)

  return app.save(collection)
})
