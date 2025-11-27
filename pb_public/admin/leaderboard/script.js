const pb = new PocketBase()
if (!pb.authStore.isValid || pb.authStore.record.collectionName != 'admins') {
  location.href = '/admin/login'
}
document.getElementById('username').innerText = pb.authStore.record.name

dayjs.extend(window.dayjs_plugin_utc)
dayjs.extend(window.dayjs_plugin_relativeTime)
dayjs.extend(window.dayjs_plugin_duration)

const mazeNameElement = document.getElementById('maze-name')

const domAttemptsList = document.getElementById('attempts-list')
const templateAttemptsListitem = document.getElementById('attempts-listitem-template')

window.addEventListener('load', async (e) => {
  const queryString = window.location.search
  const urlParams = new URLSearchParams(queryString)
  if (!urlParams.has('mazeid')) {
    window.location.replace('/admin')
    return
  }
  const mazeid = urlParams.get('mazeid')
  let maze = null
  try {
    maze = await pb.collection('mazes').getOne(mazeid)
  } catch (error) {
    window.location.replace('/admin')
    return
  }
  mazeNameElement.innerText = maze.name
  const attempts = await pb.collection('attempts').getFullList({
    filter: pb.filter('save.maze.id = {:mid} && finished = true && active = false', {mid: mazeid}),
    expand: 'save,save.player',
    sort: 'start'
  })
  const sortedAttempts = []
  for (const attempt of attempts) {
    const startTime = dayjs(attempt.start)
    const endTime = dayjs(attempt.end)
    const attemptTimeDuration = dayjs.duration(endTime.diff(startTime))
    sortedAttempts.push({
      player: {
        id: attempt.expand.save.player,
        name: attempt.expand.save.expand.player.name
      },
      time: attemptTimeDuration.valueOf(),
      start: attempt.start
    })
  }
  sortedAttempts.sort((a,b) => (a.time - b.time))
  const uniqueSortedAttempts = []
  const uniqueSortedAttemptSet = new Set()
  for (const i in sortedAttempts) {
    const attempt = sortedAttempts[i]
    if (!uniqueSortedAttemptSet.has(attempt.player.id)) {
      uniqueSortedAttemptSet.add(attempt.player.id)
      uniqueSortedAttempts.push(attempt)
    }
  }
  // console.log(uniqueSortedAttempts)
  for (const attempt of uniqueSortedAttempts) {
    // console.log(attempt)
    const cloneListitem = templateAttemptsListitem.content.cloneNode(true)
    cloneListitem.getElementById('attempts-listitem-player-name').innerText = attempt.player.name
    cloneListitem.getElementById('attempts-listitem-time').innerText = dayjs.duration(attempt.time).format('mm:ss:SSS')
    cloneListitem.getElementById('attempts-listitem-time-tooltip').innerText = dayjs.duration(attempt.time).format('YYYY-MM-DD HH:mm:ss:SSS')
    const elementListitem = cloneListitem.querySelector('.attempts-listitems')
    domAttemptsList.appendChild(elementListitem)
  }
})

