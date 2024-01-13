document.addEventListener('DOMContentLoaded', () => {
  // Fetch and display rooms
  fetchRooms();

  // Event listeners
  document.getElementById('createRoomBtn').addEventListener('click', createRoom);
  document.getElementById('roomsList').addEventListener('click', joinRoom);
  document.getElementById('sendMessageBtn').addEventListener('click', sendMessage);
});

async function fetchRooms() {
  const response = await fetch('http://localhost:5000/rooms');
  const data = await response.json();
  const roomsList = document.getElementById('roomsList');
  console.log(data)
  roomsList.innerHTML = '';
  data.result.forEach(room => {
    const roomElement = document.createElement('div');
    roomElement.classList.add('room');
    roomElement.innerText = room.roomName;
    roomElement.dataset.roomId = room.id;
    roomsList.appendChild(roomElement);
  });
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

  usersList.innerHTML = 'Users in the room:';
  data.users.forEach(user => {
    const userElement = document.createElement('div');
    userElement.innerText = user.username;
    usersList.appendChild(userElement);
  });
}

async function fetchMessages(roomId) {
  const response = await fetch(`http://localhost:5000/rooms/${roomId}/messages`);
  const data = await response.json();
  const messagesList = document.getElementById('messagesList');

  messagesList.innerHTML = 'Previous messages:';
  data.messages.forEach(message => {
    const messageElement = document.createElement('div');
    messageElement.innerText = `${message.sender}: ${message.content}`;
    messagesList.appendChild(messageElement);
  });
}

async function createRoom() {
  const roomName = prompt('Enter the room name:');
  if (roomName) {
    await fetch('http://localhost:5000/rooms', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
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
    const response = await fetch(`http://localhost:5000/rooms/${roomId}/messages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
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
