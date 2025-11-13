/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1740388494")

  // add field
  collection.fields.addAt(7, new Field({
    "hidden": false,
    "id": "json2477632187",
    "maxSize": 0,
    "name": "map",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "json"
  }))

  // add field
  collection.fields.addAt(8, new Field({
    "hidden": false,
    "id": "json2675529103",
    "maxSize": 0,
    "name": "start",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "json"
  }))

  // add field
  collection.fields.addAt(9, new Field({
    "hidden": false,
    "id": "json16528305",
    "maxSize": 0,
    "name": "end",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "json"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1740388494")

  // remove field
  collection.fields.removeById("json2477632187")

  // remove field
  collection.fields.removeById("json2675529103")

  // remove field
  collection.fields.removeById("json16528305")

  return app.save(collection)
})
