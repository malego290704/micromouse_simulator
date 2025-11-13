/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1740388494")

  // update field
  collection.fields.addAt(4, new Field({
    "hidden": true,
    "id": "bool2058414169",
    "name": "visible",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "bool"
  }))

  // update field
  collection.fields.addAt(8, new Field({
    "autogeneratePattern": "[a-zA-Z0-9-_]{32}",
    "hidden": true,
    "id": "text1597481275",
    "max": 64,
    "min": 1,
    "name": "token",
    "pattern": "^[a-zA-Z0-9-_]+$",
    "presentable": false,
    "primaryKey": false,
    "required": true,
    "system": false,
    "type": "text"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1740388494")

  // update field
  collection.fields.addAt(4, new Field({
    "hidden": false,
    "id": "bool2058414169",
    "name": "visible",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "bool"
  }))

  // update field
  collection.fields.addAt(8, new Field({
    "autogeneratePattern": "[a-zA-Z0-9-_]{32}",
    "hidden": false,
    "id": "text1597481275",
    "max": 64,
    "min": 1,
    "name": "token",
    "pattern": "^[a-zA-Z0-9-_]+$",
    "presentable": false,
    "primaryKey": false,
    "required": true,
    "system": false,
    "type": "text"
  }))

  return app.save(collection)
})
