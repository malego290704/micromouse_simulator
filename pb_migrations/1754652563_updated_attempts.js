/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_4287217533")

  // update field
  collection.fields.addAt(5, new Field({
    "autogeneratePattern": "[a-zA-Z0-9-_]{32}",
    "hidden": false,
    "id": "text1597481275",
    "max": 32,
    "min": 32,
    "name": "token",
    "pattern": "^[a-zA-Z0-9-_]{32}$",
    "presentable": false,
    "primaryKey": false,
    "required": true,
    "system": false,
    "type": "text"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_4287217533")

  // update field
  collection.fields.addAt(5, new Field({
    "autogeneratePattern": "[a-z0-9-_]{32}",
    "hidden": false,
    "id": "text1597481275",
    "max": 32,
    "min": 32,
    "name": "token",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": true,
    "system": false,
    "type": "text"
  }))

  return app.save(collection)
})
