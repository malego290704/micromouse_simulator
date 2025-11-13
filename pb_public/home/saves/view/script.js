const pb = new PocketBase()
if (!pb.authStore.isValid || pb.authStore.record.collectionName != 'users') {
  location.href = '/home/login'
}
document.getElementById('username').innerText = pb.authStore.record.name

dayjs.extend(window.dayjs_plugin_utc)
dayjs.extend(window.dayjs_plugin_relativeTime)
dayjs.extend(window.dayjs_plugin_duration)

const saveNameElement = document.getElementById('save-name')
const mazeNameElement = document.getElementById('maze-name')

const domAttemptsList = document.getElementById('attempts-list')
const templateAttemptsListitem = document.getElementById('attempts-listitem-template')

window.addEventListener('load', async (e) => {
  const queryString = window.location.search
  const urlParams = new URLSearchParams(queryString)
  if (!urlParams.has('saveid')) {
    window.location.replace('/home/saves')
    return
  }
  const saveid = urlParams.get('saveid')
  let save = null
  try {
    save = await pb.collection('saves').getOne(saveid, {
      expand: 'maze'
    })
  } catch (error) {
    window.location.replace('/home/saves')
    return
  }
  saveNameElement.innerText = save.name
  mazeNameElement.innerText = save.expand.maze.name
  document.getElementById('saves-listitem-name').innerText = save.name
  document.getElementById('saves-listitem-maze').innerText = save.expand.maze.name
  document.getElementById('saves-listitem-updated').innerText = dayjs(save.updated).fromNow()
  document.getElementById('saves-listitem-updated-tooltip').innerText = dayjs.utc(save.updated).local().format('ddd, MMM D YYYY [at] HH:mm:ssZ')
  document.getElementById('saves-listitem-created').innerText = dayjs(save.created).fromNow()
  document.getElementById('saves-listitem-created-tooltip').innerText = dayjs.utc(save.created).local().format('ddd, MMM D YYYY [at] HH:mm:ssZ')
  const attempts = await pb.collection('attempts').getFullList({
    filter: pb.filter('save.id = {:sid}', {sid: saveid}),
    sort: '-start',
    expand: 'save'
  })
  for (const attempt of attempts) {
    console.log(attempt)
    const cloneListitem = templateAttemptsListitem.content.cloneNode(true)
    const elementListitem = cloneListitem.querySelector('.attempts-listitems')
    let startTime = dayjs(attempt.start)
    cloneListitem.getElementById('attempts-listitem-started').innerText = startTime.fromNow()
    cloneListitem.getElementById('attempts-listitem-started-tooltip').innerText = startTime.local().format('ddd, MMM D YYYY [at] HH:mm:ssZ')
    cloneListitem.getElementById('attempts-listitem-btn-token').addEventListener('click', async (e) => {
      await navigator.clipboard.writeText(attempt.token)
    })
    cloneListitem.getElementById('attempts-listitem-btn-delete').addEventListener('click', async (e) => {
      if (!confirm('Do you want to delete this attempt?')) {
        e.preventDefault()
        return
      }
      await pb.collection('attempts').delete(attempt.id)
      window.location.reload()
    })
    if (attempt.active) {
      cloneListitem.getElementById('attempts-listitem-name').innerText = 'Active attempt'
      cloneListitem.getElementById('attempts-listitem-name').classList.add('w3-pale-blue')
      cloneListitem.getElementById('attempts-listitem-btn-end').addEventListener('click', async (e) => {
        if (!confirm('Do you want to end this attempt?')) {
          e.preventDefault()
          return
        }
        const req = await fetch(`/runapi/attempts/${attempt.token}/end`)
        if (req.status != 200) {
          alert('Invalid request')
          e.preventDefault()
          return
        }
        window.location.reload()
      })
      cloneListitem.getElementById('attempts-listitem-btn-end').classList.remove('hidden')
    } else {
      let endTime = dayjs(attempt.end)
      cloneListitem.getElementById('attempts-listitem-ended').innerText = endTime.fromNow()
      cloneListitem.getElementById('attempts-listitem-ended-tooltip').innerText = endTime.local().format('ddd, MMM D YYYY [at] HH:mm:ssZ')
      cloneListitem.getElementById('attempts-listitem-endinfo').classList.remove('hidden')
      if (attempt.finished) {
        cloneListitem.getElementById('attempts-listitem-name').innerText = 'Ended attempt - Finished'
        cloneListitem.getElementById('attempts-listitem-name').classList.add('w3-pale-green')
        const attemptTimeDuration = dayjs.duration(endTime.diff(startTime))
        cloneListitem.getElementById('attempts-listitem-time').innerText = attemptTimeDuration.humanize()
        cloneListitem.getElementById('attempts-listitem-time-tooltip').innerText = attemptTimeDuration.format('YYYY-MM-DD HH:mm:ss:SSS')
        cloneListitem.getElementById('attempts-listitem-finishinfo').classList.remove('hidden')
      } else {
        cloneListitem.getElementById('attempts-listitem-name').innerText = 'Ended attempt - Unfinished'
        cloneListitem.getElementById('attempts-listitem-name').classList.add('w3-pale-yellow')
      }
    }
    // elementListitem.href = `view/?saveid=${save.id}`
    domAttemptsList.appendChild(elementListitem)
  }
  document.getElementById('btn-new-attempt').addEventListener('click', async (e) => {
    if (confirm('Are you sure you want to start a new attempt? Any active attempt will be ended.')) {
      const req = await fetch(`/runapi/saves/${save.token}/newattempt`)
      if (req.status != 200) {
        alert('Invalid request')
        return
      }
      const res = await req.json()
      if (confirm('New attempt created! Choose yes to copy the attempt token')) {
        await navigator.clipboard.writeText(res.newToken)
      }
      window.location.reload()
    }
  })
})

