const messageInput = document.querySelector('#messageInput')
const sendMessageBtn = document.querySelector('#sendMessageBtn')

//global variables;
const baseUrl = 'http://localhost:5000';
let activeRoomId;
let alreadyJoinedRooms = []
let usersOfActiveRoom = []
let currentAdminId;
let commonRoomUsers = []

document.addEventListener('DOMContentLoaded', async () => {
    const allRooms = await getAllRooms()
    if(!allRooms || allRooms.length == 0){
        alert('create new room')
        return
    }
    const joinedRooms = await getAllJoinedRooms()
    alreadyJoinedRooms = [...joinedRooms]

    // making common rooom active just after login
    const commonRoom = document.querySelector('.rooms[data-room-id="4"]')
    commonRoom.classList.add('active')
    currentAdminId = commonRoom.AdminId
    commonRoom.click()
    // document.querySelector('#joinBtn').remove()
    await joinBtnHandler(1, 'common room')
    isSignedUserAdmin()
    await getAllUsersOfRoom()
    commonRoomUsers = [...usersOfActiveRoom]
})

// getting message without refreshing page
// setInterval(() => {
//     getMessageOfAllUsers()
// }, 5000)


//------------------------------------------------------------------//
// room related operations

const createRoomBtn = document.querySelector('#createRoomBtn');

createRoomBtn.addEventListener('click', async() => {
    const roomName = prompt('Enter the name of room');
    if(!roomName){
        return alert('not a valid roomName')
    }
    const token = localStorage.getItem('token');
    const response = await axios.post(`${baseUrl}/room/create`, { roomName }, { headers: { 'Authorization': token}})
    console.log('room res:', response.data)
    await getAllRooms()
})

async function getAllRooms () {
    const response = await axios.get(`${baseUrl}/room/getall`)
    if(response.data.message){
        return alert(response.data.message)
    }
    console.log(response)
    const allRooms = response.data.allRooms
    const roomList = document.querySelector('#roomsList')
    roomList.innerHTML = ''
    const div = document.createElement('div') //onclick="makeActive(${element.id}, ${element.roomName})"
    response.data.allRooms.forEach(element => {
        let html = `<p class="rooms" data-room-id="${element.id}" onclick="makeActive(${element.id}, '${element.roomName}', ${element.AdminId})">${element.id}: ${element.roomName}</p>`;
        div.innerHTML += html
    })
    roomList.appendChild(div)
    return allRooms;
}

async function makeActive (roomId,roomName,adminId) {
    const h3 = document.createElement('h3')
    h3.textContent = roomName
    const joinBtn = document.createElement('button')
    joinBtn.setAttribute('id','joinBtn')
    joinBtn.innerText = 'join';
    joinBtn.addEventListener('click', async () => {
        console.log(`Joining room ${roomId}`);
        activeRoomId = roomId;
        await joinBtnHandler(roomId,roomName)
    });

    activeRoomId = roomId
    if(h3.textContent !=='common room'){
        h3.appendChild(joinBtn)
    }
    else{
        h3.textContent = roomName

    }
    
    // appending to dom
    const room = document.querySelector('#roomName')
    room.innerHTML = ''
    room.insertAdjacentElement('afterbegin', h3)
    
    for(let i=0; i<alreadyJoinedRooms.length;i++){
        if(alreadyJoinedRooms[i].roomName == roomName){
            document.querySelector('#joinBtn').remove()
        }
    }
    // Remove 'active' class from all rooms
    document.querySelectorAll('.rooms').forEach(room => {
        room.classList.remove('active');
    });

    // Add 'active' class to the clicked room
    const clickedRoom = document.querySelector(`.rooms[data-room-id="${roomId}"]`);
    if (clickedRoom) {
        clickedRoom.classList.add('active');
    }
    currentAdminId = adminId
    isSignedUserAdmin()
    await getAllUsersOfRoom()
}

//--------------------------sending messages in particular rooms-------------------

async function joinBtnHandler (roomId, roomName) {
    const token = localStorage.getItem('token')
    const response = await axios.post(`${baseUrl}/room/join`,{ roomId },{ headers: { 'Authorization': token}})
    console.log(response)
    if( response.data.message ){
        await getMessageOfAllUsers()
        return;
    }

    alert('welcome to '+ roomName + 'room')
    if( roomName !== 'common room'){
        document.querySelector('#joinBtn').remove()
    }
    await getMessageOfAllUsers()
}

async function getAllUsersOfRoom () {
    const token = localStorage.getItem('token')
    const response = await axios.get(`${baseUrl}/room/getusers?roomId=${activeRoomId}`, { headers: {'Authorization': token}})
    console.log(response)
    if(response.data.message){
        return alert(response.data.message)
    }
    usersOfActiveRoom = response.data.allUsers
    const usersList = document.querySelector('#usersList')
    usersList.innerHTML = ''
    const div = document.createElement('div')
    response.data.allUsers.forEach(ele => {
        let html = `<p>${ele.username}</p>`
        div.innerHTML += html
    })
    usersList.appendChild(div)
}

async function getAllJoinedRooms () {
    const token = localStorage.getItem('token')
    const response = await axios.get(`${baseUrl}/room/joinedrooms`, { headers: {'Authorization': token}})
    // console.log(response)
    if(response.data.message){
        return alert(response.data.message)
    }
    return response.data.joinedRooms;
}

//-----------------sending messages operations--------------------------------------------->

sendMessageBtn.addEventListener('click', async () => {
    const token = localStorage.getItem('token')
    if(!activeRoomId){
        return alert('choose a room first')
    }
    const obj = {
        message:messageInput.value,
        roomId: activeRoomId
    }
    const response = await axios.post(`${baseUrl}/chat/savechat`, obj, { headers: { 'Authorization': token}})
    console.log(response)
    // await getMessage()
    await getMessageOfAllUsers()
})

// getting message of a logged in user only
// async function getMessage () {
//     const token = localStorage.getItem('token');
//     const response = await axios.get(`${baseUrl}/chat/getchat`, { headers: { 'Authorization': token }})
//     console.log(response)
//     displayOnScreen(response.data.allChats)
// }

// getting messages of all users of that room
async function getMessageOfAllUsers () {
    const token = localStorage.getItem('token');
    // const response = await axios.get(`${baseUrl}/chat/getallchats?roomid=${activeRoomId}`, { headers: { 'Authorization': token }})
    const response = await axios.get(`${baseUrl}/room/getchats?roomId=${activeRoomId}`, { headers: { 'Authorization': token }})
    console.log(response)
    if(response.data.message){
        return alert(response.data.message)
    }
    displayOnScreen(response.data.allChats)
}

function displayOnScreen ( passedArray ) {
    const messageListDiv = document.querySelector('#messagesList')
    const div = document.createElement('div')
    messageListDiv.innerHTML = ''
    passedArray.forEach(element => {
        let html = `<p>id: ${element.UserId} - ${element.message}</p>`;
        div.innerHTML += html
    });
    messageListDiv.appendChild(div)
}



//-------------admin superpowers-------------------------------------------------------------//

//extracting data from jwt token

function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

function isSignedUserAdmin () {
    const token = localStorage.getItem('token')
    const decodedData = parseJwt(token)
    if(decodedData.id == currentAdminId){
        let html = `<input type="search" style="float: right;" name="searchField" id="searchField">`
        document.querySelector('#searchField').innerHTML = html
    }
    else {
        document.querySelector('#searchField').innerHTML = ''
    }
}

function searchUser () {
    const searchField = document.querySelector('#searchField')
    const searchTerm = searchField.value.trim().toLowerCase()
    const searchedUsers = commonRoomUsers.filter(user => {
        user.username.toLowerCase().includes(searchTerm)
    })
    console.log('searchedUsers', searchedUsers);
    const searchResultDiv = document.querySelector('#searchResults')
    searchResultDiv.innerHTML = ''

    // displaying searched user below searchField
    if(searchedUsers.length == 0){
        return searchResultDiv.innerHTML = '<p>No matching found</p>'
    }
    else {
        searchedUsers.forEach(user => {
            const p = document.createElement('p')
            p.textContent = user.username
            // -------add functionality to add or remove to or from active room------
            usersOfActiveRoom.some(ele => {
                if(ele.id == user.id){
                    //user alredy in the active room so remove it
                }
                else{
                    // not in active room so add it
                }
            })
            searchResultDiv.appendChild(p)
        })
    }
}

async function removeUserFromRoom (userId) {
    const token = localStorage.getItem('token')
    const response = await axios.delete(`${baseUrl}/room/remove?roomId=${activeRoomId}&userId=${userId}`, { headers: {'Authorization': token}})
    if(response.ok){
        alert('user removed successfully')
    }
}