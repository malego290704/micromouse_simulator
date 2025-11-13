const domSaveToken = document.getElementById('inp-savetoken')
const domAttemptToken = document.getElementById('inp-attempttoken')

const domBtnNewAttempt = document.getElementById('btn-new-attempt')
const domBtnVerifyAttempt = document.getElementById('btn-verify-attempt')
const domBtnControlView = document.getElementById('btn-control-view')
const domBtnControlForward = document.getElementById('btn-control-forward')
const domBtnControlLeft = document.getElementById('btn-control-left')
const domBtnControlRight = document.getElementById('btn-control-right')
const domBtnControlEnd = document.getElementById('btn-control-end')

const domViewingCell = document.getElementById('viewing-cell')

function updateRobotBox(apires) {
  if (apires.front) {
    domViewingCell.classList.add('wall-front')
  } else {
    domViewingCell.classList.remove('wall-front')
  }
  if (apires.left) {
    domViewingCell.classList.add('wall-left')
  } else {
    domViewingCell.classList.remove('wall-left')
  }
  if (apires.right) {
    domViewingCell.classList.add('wall-right')
  } else {
    domViewingCell.classList.remove('wall-right')
  }
  if (apires.back) {
    domViewingCell.classList.add('wall-back')
  } else {
    domViewingCell.classList.remove('wall-back')
  }
  if (apires.start) {
    domViewingCell.classList.add('cell-start')
  } else {
    domViewingCell.classList.remove('cell-start')
  }
  if (apires.finish) {
    domViewingCell.classList.add('cell-end')
  } else {
    domViewingCell.classList.remove('cell-end')
  }
}

domBtnNewAttempt.addEventListener('click', async (e) => {
  const req = await fetch(`/runapi/saves/${domSaveToken.value}/newattempt`)
  if (req.status != 200) {
    alert('Invalid token')
    return
  }
  const res = await req.json()
  domAttemptToken.value = res.newToken
})

domBtnVerifyAttempt.addEventListener('click', async (e) => {
  const req = await fetch(`/runapi/attempts/${domAttemptToken.value}/view`)
  if (req.status != 200) {
    alert('Invalid token')
    return
  }
  const res = await req.json()
  updateRobotBox(res)
})
domBtnControlForward.addEventListener('click', async (e) => {
  const req = await fetch(`/runapi/attempts/${domAttemptToken.value}/forward`)
  if (req.status == 403) {
    alert('Invalid move!')
    return
  }
  if (req.status != 200) {
    alert('Invalid token')
    return
  }
  const res = await req.json()
  updateRobotBox(res)
})
domBtnControlLeft.addEventListener('click', async (e) => {
  const req = await fetch(`/runapi/attempts/${domAttemptToken.value}/left`)
  if (req.status != 200) {
    alert('Invalid token')
    return
  }
  const res = await req.json()
  updateRobotBox(res)
})
domBtnControlRight.addEventListener('click', async (e) => {
  const req = await fetch(`/runapi/attempts/${domAttemptToken.value}/right`)
  if (req.status != 200) {
    alert('Invalid token')
    return
  }
  const res = await req.json()
  updateRobotBox(res)
})
domBtnControlEnd.addEventListener('click', async (e) => {
  const req = await fetch(`/runapi/attempts/${domAttemptToken.value}/end`)
  if (req.status != 200) {
    alert('Invalid token')
    return
  }
  const res = await req.json()
  if (res.finished) {
    alert('Finished!')
  }
  domAttemptToken.value = ''
  updateRobotBox({front: false, left: false, right: false, back: false, start: false, finish: false})
})