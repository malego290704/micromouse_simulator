/// <reference path="../pb_data/types.d.ts" />

routerAdd("GET", "/runapi/attempts/{attempttoken}/view", (e) => {
  const attempttoken = e.request.pathValue('attempttoken')
  let attempt_record = null
  const response = {front: null, left: null, right: null, back: null, start: false, finish: false}
  try {
    attempt_record = $app.findFirstRecordByData('attempts', 'token', attempttoken)
  } catch (error) {
    return e.json(404, {error: 'No token found'})
  }
  if (!attempt_record.get('active')) {
    return e.json(403, {error: 'Inactive token'})
  }
  const save_record = $app.findRecordById('saves', attempt_record.get('save'))
  const pose = JSON.parse(save_record.get('data'))
  const maze_record = $app.findRecordById('mazes', save_record.get('maze'))
  const map = JSON.parse(maze_record.getString('map'))
  const cell = map[pose[1]][pose[0]]
  response.front = (cell & (1 << pose[2])) > 0
  response.left = (cell & (1 << ((pose[2] + 1) % 4))) > 0
  response.back = (cell & (1 << ((pose[2] + 2) % 4))) > 0
  response.right = (cell & (1 << ((pose[2] + 3) % 4))) > 0
  const start = JSON.parse(maze_record.get('start')), end = JSON.parse(maze_record.get('end'))
  if (start[0] == pose[0] && start[1] == pose[1]) {
    response.start = true
  }
  if (end[0] == pose[0] && end[1] == pose[1]) {
    response.finish = true
  }
  return e.json(200, response)
})

routerAdd("GET", "/runapi/attempts/{attempttoken}/forward", (e) => {
  const attempttoken = e.request.pathValue('attempttoken')
  let attempt_record = null
  const response = {front: null, left: null, right: null, back: null, start: false, finish: false}
  try {
    attempt_record = $app.findFirstRecordByData('attempts', 'token', attempttoken)
  } catch (error) {
    return e.json(404, {error: 'No token found'})
  }
  if (!attempt_record.get('active')) {
    return e.json(403, {error: 'Inactive token'})
  }
  const save_record = $app.findRecordById('saves', attempt_record.get('save'))
  const pose = JSON.parse(save_record.get('data'))
  const maze_record = $app.findRecordById('mazes', save_record.get('maze'))
  const map = JSON.parse(maze_record.getString('map'))
  let cell = map[pose[1]][pose[0]]
  if ((cell & (1 << pose[2])) > 0) {
    return e.json(403, {error: 'Blocked by a wall'})
  }
  if (pose[2] == 0) {
    pose[0]++
  } else if (pose[2] == 1) {
    pose[1]--
  } else if (pose[2] == 2) {
    pose[0]--
  } else if (pose[2] == 3) {
    pose[1]++
  }
  save_record.set('data', pose)
  $app.save(save_record)
  cell = map[pose[1]][pose[0]]
  response.front = (cell & (1 << pose[2])) > 0
  response.left = (cell & (1 << ((pose[2] + 1) % 4))) > 0
  response.back = (cell & (1 << ((pose[2] + 2) % 4))) > 0
  response.right = (cell & (1 << ((pose[2] + 3) % 4))) > 0
  const start = JSON.parse(maze_record.get('start')), end = JSON.parse(maze_record.get('end'))
  if (start[0] == pose[0] && start[1] == pose[1]) {
    response.start = true
  }
  if (end[0] == pose[0] && end[1] == pose[1]) {
    response.finish = true
  }
  return e.json(200, response)
})

routerAdd("GET", "/runapi/attempts/{attempttoken}/left", (e) => {
  const attempttoken = e.request.pathValue('attempttoken')
  let attempt_record = null
  const response = {front: null, left: null, right: null, back: null, start: false, finish: false}
  try {
    attempt_record = $app.findFirstRecordByData('attempts', 'token', attempttoken)
  } catch (error) {
    return e.json(404, {error: 'No token found'})
  }
  if (!attempt_record.get('active')) {
    return e.json(403, {error: 'Inactive token'})
  }
  const save_record = $app.findRecordById('saves', attempt_record.get('save'))
  const pose = JSON.parse(save_record.get('data'))
  const maze_record = $app.findRecordById('mazes', save_record.get('maze'))
  const map = JSON.parse(maze_record.getString('map'))
  let cell = map[pose[1]][pose[0]]
  pose[2] = (pose[2] + 1) % 4
  save_record.set('data', pose)
  $app.save(save_record)
  response.front = (cell & (1 << pose[2])) > 0
  response.left = (cell & (1 << ((pose[2] + 1) % 4))) > 0
  response.back = (cell & (1 << ((pose[2] + 2) % 4))) > 0
  response.right = (cell & (1 << ((pose[2] + 3) % 4))) > 0
  const start = JSON.parse(maze_record.get('start')), end = JSON.parse(maze_record.get('end'))
  if (start[0] == pose[0] && start[1] == pose[1]) {
    response.start = true
  }
  if (end[0] == pose[0] && end[1] == pose[1]) {
    response.finish = true
  }
  return e.json(200, response)
})

routerAdd("GET", "/runapi/attempts/{attempttoken}/right", (e) => {
  const attempttoken = e.request.pathValue('attempttoken')
  let attempt_record = null
  const response = {front: null, left: null, right: null, back: null, start: false, finish: false}
  try {
    attempt_record = $app.findFirstRecordByData('attempts', 'token', attempttoken)
  } catch (error) {
    return e.json(404, {error: 'No token found'})
  }
  if (!attempt_record.get('active')) {
    return e.json(403, {error: 'Inactive token'})
  }
  const save_record = $app.findRecordById('saves', attempt_record.get('save'))
  const pose = JSON.parse(save_record.get('data'))
  const maze_record = $app.findRecordById('mazes', save_record.get('maze'))
  const map = JSON.parse(maze_record.getString('map'))
  let cell = map[pose[1]][pose[0]]
  pose[2] = (pose[2] + 3) % 4
  save_record.set('data', pose)
  $app.save(save_record)
  response.front = (cell & (1 << pose[2])) > 0
  response.left = (cell & (1 << ((pose[2] + 1) % 4))) > 0
  response.back = (cell & (1 << ((pose[2] + 2) % 4))) > 0
  response.right = (cell & (1 << ((pose[2] + 3) % 4))) > 0
  const start = JSON.parse(maze_record.get('start')), end = JSON.parse(maze_record.get('end'))
  if (start[0] == pose[0] && start[1] == pose[1]) {
    response.start = true
  }
  if (end[0] == pose[0] && end[1] == pose[1]) {
    response.finish = true
  }
  return e.json(200, response)
})

routerAdd("GET", "/runapi/attempts/{attempttoken}/end", (e) => {
  const attempttoken = e.request.pathValue('attempttoken')
  let attempt_record = null
  const response = {finished: false}
  try {
    attempt_record = $app.findFirstRecordByData('attempts', 'token', attempttoken)
  } catch (error) {
    return e.json(404, {error: 'No token found'})
  }
  if (!attempt_record.get('active')) {
    return e.json(403, {error: 'Inactive token'})
  }
  const save_record = $app.findRecordById('saves', attempt_record.get('save'))
  const pose = JSON.parse(save_record.get('data'))
  const maze_record = $app.findRecordById('mazes', save_record.get('maze'))
  const end = JSON.parse(maze_record.get('end'))
  if (end[0] == pose[0] && end[1] == pose[1]) {
    attempt_record.set('finished', true)
    response.finished = true
  }
  attempt_record.set('active', false)
  attempt_record.set('end', new DateTime().string())
  $app.save(attempt_record)
  return e.json(200, response)
})