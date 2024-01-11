const chatForm = document.querySelector('#chatForm')
const message = document.querySelector('#message')

// global variables
let flag = false; // used to call getOlderChatBtn only once
const lsLimit = 5;

chatForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    setAllChatsToServerAndLS();
})

// i can wrap this logic inside a function and call the function also
document.addEventListener('DOMContentLoaded', async () => {
    let chats = getChatsFromLS();
    let savedChats = await getAllChats();
    if( (savedChats.length) + (chats.length) > lsLimit) {
        getOlderChatBtn()
    }
    displayOnScreen(chats)
})

async function getAllChats() {
    const token = localStorage.getItem('token')
    const response = await axios.get('http://localhost:5000/chat/data', { headers: { 'Authorization': token } })
    console.log(response.data);
    if (response.data.error) {
        alert(response.data.error);
        return;
    }
    // displayAfterApiData(response.data.allMessages)
    const responseArray = response.data.allMessages
    return responseArray;
}

// setInterval(() => {
// getAllChats()
// }, 1000);

async function setAllChatsToServerAndLS() {
    let chats = getChatsFromLS();
    if (chats.length === lsLimit) {
        // const firstEle = chats.shift();
        const firstEle = chats[0];
        const token = localStorage.getItem('token')
        const response = await axios.post('http://localhost:5000/chat', { message: firstEle }, { headers: { 'Authorization': `${token}` } })
        console.log(response)
        if (response.data.error) {
            alert(response.data.error)
            return;
        }
        let removedEle = chats.shift()
        setChatsToLS(chats);
        if(!flag){
            getOlderChatBtn()
        }
    }
    else {
        setChatsToLS(chats);
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

function getChatsFromLS() {
    return JSON.parse(localStorage.getItem('chats')) || []
}

function setChatsToLS(chats) {
    chats = [...chats, message.value];
    // chats.push(message.value)
    displayOnScreen(chats);
    localStorage.setItem('chats', JSON.stringify(chats.slice(-lsLimit))) //limit the chats to 10
}

function getOlderChatBtn () {
    let html = `<button type="button" onclick="getOlderChatsHandler()" class="p-1 m-2 align-bottom fw-bold" style="background-color: #E9A160;">Get old chats</button>`
    document.querySelector('#sendbtn').insertAdjacentHTML('afterend', html);
    flag = true;
}

async function getOlderChatsHandler () {
    const responseArray = await getAllChats()
    const chats = getChatsFromLS()
    const mergedArray = []
    for(let i=0; i<responseArray.length; i++){
        mergedArray.push(responseArray[i].message)
    }
    console.log('mergedarray: ', mergedArray);
    displayOnScreen([...mergedArray, ...chats])
}

function scrollToBottom() {
    const outerDiv = document.querySelector('#outer');
    outerDiv.scrollTop = outerDiv.scrollHeight;
}