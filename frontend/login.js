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
    if(response.data.error){
        alert(response.data.error)
        return;
    }
    alert('logged in successfully')
})