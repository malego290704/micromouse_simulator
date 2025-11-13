/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1740388494")

  // update collection data
  unmarshal({
    "listRule": "visible = true && @request.auth.verified = true",
    "viewRule": "visible = true && @request.auth.verified = true"
  }, collection)

  // update field
  collection.fields.addAt(5, new Field({
    "hidden": true,
    "id": "json2477632187",
    "maxSize": 0,
    "name": "map",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "json"
  }))

  // update field
  collection.fields.addAt(6, new Field({
    "hidden": true,
    "id": "json2675529103",
    "maxSize": 0,
    "name": "start",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "json"
  }))

  // update field
  collection.fields.addAt(7, new Field({
    "hidden": true,
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

  // update collection data
  unmarshal({
    "listRule": "visible = true || @request.auth.verified = true",
    "viewRule": "@request.auth.verified = true"
  }, collection)

  // update field
  collection.fields.addAt(5, new Field({
    "hidden": false,
    "id": "json2477632187",
    "maxSize": 0,
    "name": "map",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "json"
  }))

  // update field
  collection.fields.addAt(6, new Field({
    "hidden": false,
    "id": "json2675529103",
    "maxSize": 0,
    "name": "start",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "json"
  }))

  // update field
  collection.fields.addAt(7, new Field({
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
})
