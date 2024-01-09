const chatForm = document.querySelector('#chatForm')
const message = document.querySelector('#message')

chatForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    setAllChatsToServerAndLS();
})

// i can wrap this logic inside a function and call the function also
document.addEventListener('DOMContentLoaded', () => {
    let chats = getChatsFromLS();
    if(chats.length >= 10){
        displayOnScreen(chats)
        getAllChats()
    }
    else{
        displayOnScreen(chats)
    }
})

async function getAllChats() {
    const token = localStorage.getItem('token')
    const response = await axios.get('http://localhost:5000/chat/data', { headers: { 'Authorization': token } })
    console.log(response.data);
    if (response.data.error) {
        alert(response.data.error);
        return;
    }
    displayAfterApiData(response.data.allMessages)

}

// setInterval(() => {
// getAllChats()
// }, 1000);

async function setAllChatsToServerAndLS() {
    let chats = getChatsFromLS();
    if (chats.length >= 10) {
        const token = localStorage.getItem('token')
        console.log(typeof (token))
        const response = await axios.post('http://localhost:5000/chat', { message: message.value }, { headers: { 'Authorization': `${token}` } })
        console.log(response)
        if (response.data.error) {
            alert(response.data.error)
            return;
        }
        getAllChats();
    }
    else {
        chats = [...chats, message.value];
        localStorage.setItem('chats', JSON.stringify(chats.slice(-10)))
        displayOnScreen(chats);
    }
}

function displayOnScreen(displayArray) {
    const displayedDiv = document.querySelector('#displayedDiv');
    displayedDiv.innerHTML = '';
    displayArray.forEach(ele => {
        let html = `<div class="p-1 mb-2 bg-primary-subtle text-emphasis-danger rounded-2 fw-bold">${ele}</div>`;
        displayedDiv.innerHTML += html
    })
    scrollToBottom()
    message.value = ''
}

function displayAfterApiData (displayArray) {
    const displayedDiv = document.querySelector('#displayedDiv');
    displayedDiv.innerHTML = '';
    let chats = getChatsFromLS();
    displayOnScreen(chats)
    displayArray.forEach(ele => {
        let html = `<div class="p-1 mb-2 bg-primary-subtle text-emphasis-danger rounded-2 fw-bold">${ele.message}</div>`;
        displayedDiv.innerHTML += html
    })
    scrollToBottom()
    message.value = ''
}

function getChatsFromLS () {
    return JSON.parse(localStorage.getItem('chats')) || []
}

function scrollToBottom () {
    const outerDiv = document.querySelector('#outer');
    outerDiv.scrollTop = outerDiv.scrollHeight;
}