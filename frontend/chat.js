const chatForm = document.querySelector('#chatForm')
const message = document.querySelector('#message')

chatForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token')
    console.log(typeof(token))
    const response = await axios.post('http://localhost:5000/chat', { message: message.value}, {headers:{ 'Authorization': `${token}`}})
    console.log(response)
    if(response.data.error){
        alert(response.data.error)
        return;
    }
    alert(response.data.message)
})