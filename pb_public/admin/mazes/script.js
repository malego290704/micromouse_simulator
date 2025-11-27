const pb = new PocketBase()
if (!pb.authStore.isValid || pb.authStore.record.collectionName != 'admins') {
  location.href = '/admin/login'
}
document.getElementById('username').innerText = pb.authStore.record.name


dayjs.extend(window.dayjs_plugin_utc)
dayjs.extend(window.dayjs_plugin_relativeTime)


const domMazesList = document.getElementById('mazes-list')

const templateMazesListitem = document.getElementById('mazes-listitem-template')

window.addEventListener('load', async (e) => {
  const mazes = await pb.collection('mazes').getFullList({
    sort: '-updated',
  })
  // console.log(mazes)
  if (mazes.length == 0) {
    return
  }
  for (const maze of mazes) {
    const cloneListitem = templateMazesListitem.content.cloneNode(true)
    cloneListitem.getElementById('mazes-listitem-name').innerText = maze.name
    cloneListitem.getElementById('mazes-listitem-modal-name').innerText = maze.name
    cloneListitem.getElementById('mazes-listitem-modal-description').innerText = maze.description
    cloneListitem.getElementById('mazes-listitem-btn-leaderboard').addEventListener('click', (e) => {
      e.preventDefault()
      e.stopPropagation()
      window.location.href = `/admin/leaderboard/?mazeid=${maze.id}`
    })
    const elementListitem = cloneListitem.querySelector('.mazes-listitems')
    const modal = cloneListitem.querySelector('.mazes-listitems-modal')
    elementListitem.addEventListener('click', (e) => {
      modal.style.display = 'block'
    })
    cloneListitem.querySelector('.mazes-listitems-modal-button').addEventListener('click', (e) => {
      modal.style.display = 'none'
    })
    domMazesList.appendChild(elementListitem)
    document.body.appendChild(modal)
  }
})