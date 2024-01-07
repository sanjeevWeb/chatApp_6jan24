const emailfield = document.querySelector('#emailfield');
const passwordfield = document.querySelector('#passwordfield');
const reghere = document.querySelector('a');

const loginForm = document.querySelector('#loginForm');

const baseUrl = 'http://localhost:5000';

reghere.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = './signup.html'
})

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    if(!emailfield.value || !passwordfield.value){
        alert('all fields are mandatory')
        return;
    }
    const obj = { email: emailfield.value, password: passwordfield.value };
    const response = await axios.post(`${baseUrl}/user/login`, obj);
    console.log(response)
    if(response.status === 401 || response.status === 404 || response.data.error){
        alert(response.data.error)
        return;
    }
    if(response.data.token){
        localStorage.setItem('token',JSON.stringify(response.data.token))
    }

    alert('logged in successfully')
})