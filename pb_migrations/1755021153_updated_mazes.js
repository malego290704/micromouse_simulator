/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1740388494")

  // remove field
  collection.fields.removeById("json2918445923")

  // remove field
  collection.fields.removeById("json912936969")

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1740388494")

  // add field
  collection.fields.addAt(4, new Field({
    "hidden": false,
    "id": "json2918445923",
    "maxSize": 0,
    "name": "data",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "json"
  }))

  // add field
  collection.fields.addAt(5, new Field({
    "hidden": false,
    "id": "json912936969",
    "maxSize": 0,
    "name": "defaultsave",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "json"
  }))

  return app.save(collection)
})
