/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1740388494")

  // update collection data
  unmarshal({
    "listRule": "(visible = true && @request.auth.verified = true) || @request.auth.collectionName = \"admins\"",
    "viewRule": "(visible = true && @request.auth.verified = true) || @request.auth.collectionName = \"admins\""
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1740388494")

  // update collection data
  unmarshal({
    "listRule": "visible = true && @request.auth.verified = true",
    "viewRule": "visible = true && @request.auth.verified = true"
  }, collection)

  return app.save(collection)
})
