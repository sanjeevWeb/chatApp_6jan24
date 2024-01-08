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
    // showToast(null, 'logged in successfully')
})

function showToast(error,message) {
    let html = `<div class="toast align-items-center" role="alert" aria-live="assertive" aria-atomic="true">
                    <div class="d-flex">
                    <div class="toast-body" style="${ error ? 'background-color: #DC3545;' : 'background-color: #2D8A45;'}">
                        ${ error ? error : message}
                    </div>
                    <button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                    </div>
                </div>`;
    document.querySelector('#toastdiv').innerHTML += html
}