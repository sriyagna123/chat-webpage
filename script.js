const socket = io();

function createMessageElement(msg) {
    const item = document.createElement('div');
    item.textContent = msg;
    item.style.backgroundColor = getRandomColor();
    item.style.color = "#fff";
    item.style.padding = '8px';
    item.style.borderRadius = '5px';
    return item;
}

document.getElementById('sendMessage').onclick = function() {
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value;
    if (message) {
        socket.emit('chat message', message);
        messageInput.value = '';
    }
};

socket.on('chat message', function(msg) {
    const messagesDiv = document.getElementById('messages');
    const messageElement = createMessageElement(msg);
    messagesDiv.appendChild(messageElement);
    messagesDiv.scrollTop = messagesDiv.scrollHeight; // Scroll to the bottom
});

// Generate a random color
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}