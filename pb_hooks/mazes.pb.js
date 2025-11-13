/// <reference path="../pb_data/types.d.ts" />

routerAdd("GET", "/runapi/mazes/{mazetoken}/view", (e) => {
  const mazetoken = e.request.pathValue('mazetoken')
  let maze_record = null
  const response = {map: null, start: null, end: null, mazeid: null}
  try {
    maze_record = $app.findFirstRecordByData('mazes', 'token', mazetoken)
  } catch (error) {
    return e.json(404, {error: 'No token found'})
  }
  response.mazeid = maze_record.get('mazeid')
  response.map = maze_record.get('map')
  response.start = maze_record.get('start')
  response.end = maze_record.get('end')
  return e.json(200, response)
})