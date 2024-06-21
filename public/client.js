const socket = io();

const form = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages');

form.addEventListener('submit', function(e) {
  e.preventDefault();
  if (input.value) {
    socket.emit('chat message', input.value);
    //Show message on the screen immediately after pressing "Send" or enter
    createMessage(input.value)
    input.value = '';
  }
});

socket.on('chat message', (msg) => {
  createMessage(msg)
})

function createMessage(msg) {
  const item = document.createElement('li');
  item.textContent = msg;
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight)
}