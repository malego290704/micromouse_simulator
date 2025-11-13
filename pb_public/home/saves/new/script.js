const pb = new PocketBase()
if (!pb.authStore.isValid || pb.authStore.record.collectionName != 'users') {
  location.href = '/home/login'
}

const domMazeSelect = document.getElementById('maze')

const templateMazeOption = document.getElementById('maze-select-template')

const mazeidmap = {}

window.addEventListener('load', async (e) => {
  const mazes = await pb.collection('mazes').getFullList()
  for (const maze of mazes) {
    const cloneMazeOption = templateMazeOption.content.cloneNode(true)
    const elementMazeOption = cloneMazeOption.querySelector('.maze-select')
    elementMazeOption.setAttribute('value', maze.id)
    elementMazeOption.innerText = maze.name
    domMazeSelect.appendChild(elementMazeOption)
  }
})

const form = document.getElementById('form')
form.addEventListener('submit', async (e) => {
  e.preventDefault()
  const maze = e.target.querySelector('#maze').value
  const savename = e.target.querySelector('#savename').value
  console.log(maze)
  console.log(savename)
  const data = {
    "name": savename,
    "player": pb.authStore.record.id,
    "maze": maze,
  }
  console.log(data)
  const record = await pb.collection('saves').create(data)
  console.log(record)
  window.location.href = "/home/saves"
})