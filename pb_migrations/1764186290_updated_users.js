/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1736455494")

  // update collection data
  unmarshal({
    "listRule": "@request.auth.collectionName = \"admins\"",
    "viewRule": "@request.auth.id = id || @request.auth.collectionName = \"admins\""
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1736455494")

  // update collection data
  unmarshal({
    "listRule": null,
    "viewRule": "@request.auth.id = id"
  }, collection)

  return app.save(collection)
})
