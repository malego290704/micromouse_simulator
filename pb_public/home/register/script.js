const pb = new PocketBase()

const form = document.getElementById('form')
form.addEventListener('submit', async (e) => {
  e.preventDefault()
  const name = e.target.querySelector('#name').value
  const email = e.target.querySelector('#email').value
  const password = e.target.querySelector('#password').value
  const password2 = e.target.querySelector('#password2').value
  try {
    const userdata = {
      'email': email,
      'name': name,
      'password': password,
      'passwordConfirm': password2
    }
    const record = await pb.collection('users').create(userdata)
    const authData = await pb.collection('users').authWithPassword(email, password)
    location.href = '/home'
  } catch (error) {
    alert(JSON.stringify(error.response.data, null, 4))
  }
})