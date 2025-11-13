const pb = new PocketBase()

const form = document.getElementById('form')
form.addEventListener('submit', async (e) => {
  e.preventDefault()
  const email = e.target.querySelector('#email').value
  const password = e.target.querySelector('#password').value
  try {
    const authData = await pb.collection('admins').authWithPassword(email, password)
    location.href = '/admin'
  } catch (error) {
    alert('Wrong email or password!')
  }
})