/// <reference path="../pb_data/types.d.ts" />

onRecordCreate((e) => {
  const start = e.app.findRecordById('mazes', e.record.get('maze'))
  e.record.set('data', start.get('start'))
  e.next()
}, 'saves')

routerAdd("GET", "/runapi/saves/{savetoken}/newattempt", (e) => {
  const savetoken = e.request.pathValue('savetoken')
  let save_record = null
  const response = {}
  try {
    save_record = $app.findFirstRecordByData('saves', 'token', savetoken)
  } catch (error) {
    return e.json(404, {error: 'No token found'})
  }
  $app.runInTransaction((txApp) => {
    const active_attempts = txApp.findRecordsByFilter('attempts', `save = {:sid} && active = true`, "-created", 0, 0, {'sid': save_record.id})
    const deactivated_tokens = []
    active_attempts.forEach((r) => {
      r.set('active', 'false')
      r.set('end', new DateTime().string())
      txApp.save(r)
      deactivated_tokens.push(r.get('token'))
    })
    const maze_record = txApp.findRecordById('mazes', save_record.get('maze'))
    save_record.set('data', maze_record.get('start'))
    txApp.save(save_record)
    response.deactivatedTokens = deactivated_tokens
    const attempt_record = new Record(txApp.findCollectionByNameOrId('attempts'))
    attempt_record.set('save', save_record.id)
    attempt_record.set('active', true)
    attempt_record.set('start', new DateTime().string())
    txApp.save(attempt_record)
    response.newToken = attempt_record.get('token')
  })
  return e.json(200, response)
})