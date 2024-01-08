const chatForm = document.querySelector('#chatForm')
const message = document.querySelector('#message')

chatForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token')
    console.log(typeof (token))
    const response = await axios.post('http://localhost:5000/chat', { message: message.value }, { headers: { 'Authorization': `${token}` } })
    console.log(response)
    if (response.data.error) {
        alert(response.data.error)
        return;
    }
    // alert(response.data.message)
    getAllChats();
})

// i can wrap this logic inside a function and call the function also
document.addEventListener('DOMContentLoaded', getAllChats)

async function getAllChats() {
    const token = localStorage.getItem('token')
    const response = await axios.get('http://localhost:5000/chat/data', { headers: { 'Authorization': token } })
    console.log(response.data);
    const displayedDiv = document.querySelector('#displayedDiv');
    displayedDiv.innerHTML = '';
    response.data.allMessages.forEach(ele => {
        let html = `<div class="p-1 mb-2 bg-primary-subtle text-emphasis-danger rounded-2 fw-bold">${ele.message}</div>`;
        displayedDiv.innerHTML += html
    })

}