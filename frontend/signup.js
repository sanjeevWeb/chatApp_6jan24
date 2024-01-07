// signup form fields
const namefield = document.querySelector('#namefield')
const emailfield = document.querySelector('#emailfield')
const phonefield = document.querySelector('#phonefield')
const passwordfield = document.querySelector('#passwordfield')
const loginhere = document.querySelector('a')

const signupForm = document.querySelector('#signupForm');

const baseUrl = 'http://localhost:5000';

// go to login page 
loginhere.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = './login.html'
})

// form submission
signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    if(!namefield.value || !emailfield.value || !phonefield.value || !passwordfield.value){
        alert('all fields are mandatory');
        return;
    }
    const obj = {
        username: namefield.value,
        email: emailfield.value,
        phone_no: phonefield.value,
        password: passwordfield.value
    };
    const response = await axios.post(`${baseUrl}/user/signup`, obj);
    if(response.data.error){
        alert(response.data.error);
        return
    }
    alert(response.data.message)
    window.location.href = './login.html'
})