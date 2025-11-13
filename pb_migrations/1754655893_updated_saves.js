/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2977359881")

  // update collection data
  unmarshal({
    "createRule": "@request.auth.id = player.id",
    "listRule": "@request.auth.id = player.id",
    "viewRule": "@request.auth.id = player.id"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2977359881")

  // update collection data
  unmarshal({
    "createRule": null,
    "listRule": null,
    "viewRule": null
  }, collection)

  return app.save(collection)
})
