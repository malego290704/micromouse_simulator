const pb = new PocketBase()
if (!pb.authStore.isValid || pb.authStore.record.collectionName != 'users') {
  location.href = '/home/login'
}
document.getElementById('control-username').innerText = pb.authStore.record.name

const cssRoot = document.querySelector(':root')
const domMap = document.getElementById('map')
const domMapbox = document.getElementById('mapbox')
const domSavesList = document.getElementById('control-saves-list')

const templateMapRow = document.getElementById('map-row-template')
const templateMapCell = document.getElementById('map-cell-template')
const templateControlSavesListitem = document.getElementById('control-saves-listitem-template')

const domMapCellInnerstart = document.getElementById('map-cell-innerstart-template').content.cloneNode(true)
const domMapCellInnerend = document.getElementById('map-cell-innerend-template').content.cloneNode(true)

const buttonSavesItemlistDefault = document.getElementById('control-saves-listitem-default')

const panzoom = Panzoom(domMapbox, {})
domMap.parentElement.addEventListener('wheel', panzoom.zoomWithWheel)
zoomLock = false
document.getElementById('control-button-zoom-out').addEventListener('click', panzoom.zoomOut)
document.getElementById('control-button-zoom-in').addEventListener('click', panzoom.zoomIn)
document.getElementById('control-button-reset').addEventListener('click', (e) => {panzoom.reset({ force: false })})
const buttonControlLock = document.getElementById('control-button-lock')
buttonControlLock.addEventListener('click', (e) => {
  zoomLock = !zoomLock
  if (zoomLock) {
    buttonControlLock.classList.remove('w3-hover-light-gray')
    buttonControlLock.classList.add('w3-black', 'w3-hover-dark-gray')
    buttonControlLock.firstElementChild.firstElementChild.innerText = 'lock_outline'
    buttonControlLock.firstElementChild.lastElementChild.innerText = 'Unlock'
  } else {
    buttonControlLock.classList.remove('w3-black', 'w3-hover-dark-gray')
    buttonControlLock.classList.add('w3-hover-light-gray')
    buttonControlLock.firstElementChild.firstElementChild.innerText = 'lock_open'
    buttonControlLock.firstElementChild.lastElementChild.innerText = 'Lock'
  }
    panzoom.setOptions({disablePan: zoomLock, disableZoom: zoomLock})
})

const mapGrid = []

function robotMove(x,y,r) {
  cssRoot.style.setProperty('--robot-pose-x', x)
  cssRoot.style.setProperty('--robot-pose-y', y)
  cssRoot.style.setProperty('--robot-pose-r', r)
  return
}

window.addEventListener('load', async (e) => {
  const mazetoken = prompt('Enter maze token (write \'back\' to exit)')
  if (mazetoken == null || mazetoken == '') {
    alert('No maze token provided')
    location.reload()
    return
  }
  if (mazetoken == 'back') {
    location.href = '/home'
    return
  }
  const req = await fetch(`/runapi/mazes/${mazetoken}/view`)
  if (req.status == 404) {
    alert(`No token found: ${mazetoken}`)
    location.reload()
    return
  }
  const res = await req.json()
  const map = res.map
  const mazeid = res.mazeid
  const mapheight = map.length, mapwidth = map[0].length
  for (let i = 0; i < mapheight; i++) {
    const cloneRow = templateMapRow.content.cloneNode(true)
    const elementRow = cloneRow.querySelector('.map-row')
    const mapGridRow = []
    for (let j = 0; j < mapwidth; j++) {
      const cloneCell = templateMapCell.content.cloneNode(true)
      const elementCell = cloneCell.querySelector('.map-cell')
      // elementCell.innerText = map[i][j]
      if ((map[i][j] & 1) > 0) {
        elementCell.classList.add('cell-wall-right')
      }
      if ((map[i][j] & 2) > 0) {
        elementCell.classList.add('cell-wall-top')
      }
      if ((map[i][j] & 4) > 0) {
        elementCell.classList.add('cell-wall-left')
      }
      if ((map[i][j] & 8) > 0) {
        elementCell.classList.add('cell-wall-bottom')
      }
      elementRow.appendChild(elementCell)
      mapGridRow.push(elementCell)
    }
    domMap.appendChild(elementRow)
    mapGrid.push(mapGridRow)
  }
  // console.log(res, mazetoken)
  const mapStartPose = res.start, mapEndPose = res.end
  mapGrid[mapStartPose[1]][mapStartPose[0]].classList.add('cell-start')
  mapGrid[mapStartPose[1]][mapStartPose[0]].appendChild(domMapCellInnerstart)
  document.getElementById('map-cell-innerstart').classList.add(`point-${mapStartPose[2]}`)
  mapGrid[mapEndPose[1]][mapEndPose[0]].classList.add('cell-end')
  mapGrid[mapEndPose[1]][mapEndPose[0]].appendChild(domMapCellInnerend)
  robotMove(...mapStartPose)
  const saves = await pb.collection('saves').getFullList({sort: '-updated', filter: `maze.mazeid = '${mazeid}'`})
  for (const save of saves) {
    // console.log(save)
    const cloneListitem = templateControlSavesListitem.content.cloneNode(true)
    cloneListitem.getElementById('control-saves-listitem-name').innerText = save.name
    // cloneListitem.getElementById('control-saves-listitem-created').innerText = save.created
    cloneListitem.getElementById('control-saves-listitem-created').innerText = dayjs(save.created).fromNow()
    cloneListitem.getElementById('control-saves-listitem-created-tooltip').innerText = dayjs.utc(save.created).local().format('ddd, MMM D YYYY [at] HH:mm:ssZ')
    // cloneListitem.getElementById('control-saves-listitem-updated').innerText = save.updated
    cloneListitem.getElementById('control-saves-listitem-updated').innerText = dayjs(save.updated).fromNow()
    cloneListitem.getElementById('control-saves-listitem-updated-tooltip').innerText = dayjs.utc(save.updated).local().format('ddd, MMM D YYYY [at] HH:mm:ssZ')
    // console.log(save)
    const elementListitem = cloneListitem.querySelector('.control-saves-listitems')
    elementListitem.addEventListener('click', (e) => {
      for (const item of domSavesList.children) {
        item.classList.remove('selected')
      }
      elementListitem.classList.add('selected')
      robotMove(...save.data)
      pb.collection('saves').unsubscribe()
      pb.collection('saves').subscribe(save.id, (e) => {
        robotMove(...e.record.data)
      })
    })
    domSavesList.appendChild(elementListitem)
  }
  buttonSavesItemlistDefault.addEventListener('click', (e) => {
    for (const item of domSavesList.children) {
      item.classList.remove('selected')
    }
    buttonSavesItemlistDefault.classList.add('selected')
    pb.collection('saves').unsubscribe()
    robotMove(...mapStartPose)
  })
})

