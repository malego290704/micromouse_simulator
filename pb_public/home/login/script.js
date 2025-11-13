const pb = new PocketBase()

const form = document.getElementById('form')
form.addEventListener('submit', async (e) => {
  e.preventDefault()
  const email = e.target.querySelector('#email').value
  const password = e.target.querySelector('#password').value
  try {
    const authData = await pb.collection('users').authWithPassword(email, password)
    location.href = '/home'
  } catch (error) {
    alert('Wrong email or password!')
  }
})