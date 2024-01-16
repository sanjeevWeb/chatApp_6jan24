document.addEventListener('DOMContentLoaded', () => {
  // Fetch and display rooms
  fetchRooms();

  // Event listeners
  document.getElementById('createRoomBtn').addEventListener('click', createRoom);
  // document.getElementById('roomsList').addEventListener('click', () => joinRoom());
  document.getElementById('sendMessageBtn').addEventListener('click', sendMessage);
});

async function fetchRooms() {
  const response = await fetch('http://localhost:5000/rooms');
  const data = await response.json();
  const roomsList = document.getElementById('roomsList');
  console.log(data)
  roomsList.innerHTML = '';
  if (data.result.length == 0) {
    roomsList.innerHTML = 'No Table Created';
    return;
  }
  data.result.forEach(room => {
    const roomElement = document.createElement('div');
    roomElement.classList.add('room');
    roomElement.innerText = room.roomName;
    roomElement.dataset.roomId = room.id;
    roomElement.addEventListener('click', () => roomElementClickHandler( room.id,room.roomName ))
    roomsList.appendChild(roomElement);
  });
}

function roomElementClickHandler (roomId,roomName) {
  const roomHeading = document.querySelector('#roomHeading');
  roomHeading.innerText = roomName
  const joinBtn = document.createElement('button');
  joinBtn.innerText = 'join';
  joinBtn.addEventListener('click', async () => {
    const data = await addUserToRoom(roomId)
    console.log('new user', data);
    await fetchUsers(roomId);
    await fetchMessages(roomId);
    alert('you joined ' + roomName + 'group')
  })
  roomHeading.appendChild(joinBtn)

}

async function addUserToRoom (roomId) {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`http://localhost:5000/rooms/${roomId}/adduser`, {method: 'POST','Content-type': 'application/json', headers: { 'Authorization': token}})
    const data = response.json();
    
  }
   catch (error) {
    console.log(error)  
  }
}

async function joinRoom(event) {
  if (event.target.classList.contains('room')) {
    const roomId = event.target.dataset.roomId;
    // Fetch and display users in the selected room
    fetchUsers(roomId);

    // Fetch and display messages in the selected room
    fetchMessages(roomId);
  }
}

async function fetchUsers(roomId) {
  const response = await fetch(`http://localhost:5000/rooms/${roomId}/users`);
  const data = await response.json();
  const usersList = document.getElementById('usersList');
  if (!data.users) {
    usersList.innerHTML = 'You are the admin now';
    return;
  }

  usersList.innerHTML = 'Users in the room:';
  data.users.forEach(user => {
    const userElement = document.createElement('div');
    userElement.innerText = user.username;
    usersList.appendChild(userElement);
  });
}

async function fetchMessages(roomId) {
  const response = await fetch(`http://localhost:5000/rooms/${roomId}/chats`);
  const data = await response.json();
  const messagesList = document.getElementById('messagesList');
  if (!data.messages) {
    messagesList.innerHTML = 'No messages to show';
    return;
  }
  messagesList.innerHTML = 'Previous messages:';
  data.messages.forEach(message => {
    const messageElement = document.createElement('div');
    messageElement.innerText = `${message.sender}: ${message.content}`;
    messagesList.appendChild(messageElement);
  });
}

async function createRoom() {
  const roomName = prompt('Enter the room name:');
  const token = localStorage.getItem('token');
  if (roomName) {
    await fetch('http://localhost:5000/rooms', {
      method: 'POST',
      headers: { 'Content-type': 'application/json','Authorization': token },
      body: JSON.stringify({ roomName }),
    });

    // Refresh the rooms list after creating a new room
    fetchRooms();
  }
}

async function sendMessage() {
  const roomId = document.querySelector('.room.active')?.dataset.roomId;
  const messageInput = document.getElementById('messageInput');
  const messageContent = messageInput.value;

  if (roomId && messageContent) {
    const response = await fetch(`http://localhost:5000/rooms/${roomId}/chats`, {
      method: 'POST',
      headers: { 'Content-type': 'application/json','Authorization': token },
      body: JSON.stringify({ content: messageContent }),
    });

    if (response.ok) {
      // Refresh messages after sending a new message
      fetchMessages(roomId);
    } else {
      alert('Failed to send message');
    }

    messageInput.value = '';
  }
}
