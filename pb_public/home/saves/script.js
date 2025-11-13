const pb = new PocketBase()
if (!pb.authStore.isValid || pb.authStore.record.collectionName != 'users') {
  location.href = '/home/login'
}
document.getElementById('username').innerText = pb.authStore.record.name


dayjs.extend(window.dayjs_plugin_utc)
dayjs.extend(window.dayjs_plugin_relativeTime)


const domSavesList = document.getElementById('saves-list')

const templateSavesListitem = document.getElementById('saves-listitem-template')

window.addEventListener('load', async (e) => {
  const saves = await pb.collection('saves').getFullList({
    sort: '-updated',
    expand: 'maze'
  })
  // console.log(saves)
  if (saves.length == 0) {
    return
  }
  document.getElementById('saves-list-empty-notice').style.display = 'none'
  for (const save of saves) {
    const cloneListitem = templateSavesListitem.content.cloneNode(true)
    cloneListitem.getElementById('saves-listitem-name').innerText = save.name
    cloneListitem.getElementById('saves-listitem-maze').innerText = save.expand.maze.name
    cloneListitem.getElementById('saves-listitem-updated').innerText = dayjs(save.updated).fromNow()
    cloneListitem.getElementById('saves-listitem-updated-tooltip').innerText = dayjs.utc(save.updated).local().format('ddd, MMM D YYYY [at] HH:mm:ssZ')
    cloneListitem.getElementById('saves-listitem-created').innerText = dayjs(save.created).fromNow()
    cloneListitem.getElementById('saves-listitem-created-tooltip').innerText = dayjs.utc(save.created).local().format('ddd, MMM D YYYY [at] HH:mm:ssZ')
    cloneListitem.getElementById('saves-listitem-btn-token').addEventListener('click', async (e) => {
      await navigator.clipboard.writeText(save.token)
    })
    cloneListitem.getElementById('saves-listitem-btn-delete').addEventListener('click', async (e) => {
      if (!confirm('Do you want to delete this save?')) {
        e.preventDefault()
        return
      }
      await pb.collection('saves').delete(save.id)
      window.location.reload()
    })
    const elementListitem = cloneListitem.querySelector('.saves-listitems')
    elementListitem.href = `view/?saveid=${save.id}`
    domSavesList.appendChild(elementListitem)
  }
})