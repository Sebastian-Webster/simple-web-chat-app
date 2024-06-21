const express = require('express')
const http = require('http')
const app = express()
const { Server } = require('socket.io')

const server = http.createServer(app)
const io = new Server(server);

app.use('/public', express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html')
})

//Keep track of usernames with this map
const usersMap = new Map();

io.on('connection', socket => {
  console.log('A user connected')

  //When the user connects, they will use a default nickname (the socket id)
  //Later on the user can change their username
  usersMap.set(socket.id, socket.id)

  socket.on('disconnect', () => {
    console.log('A user disconnected')

    //Remove the username for the user that just connected
    usersMap.delete(socket.id)
  })

  socket.on('chat message', msg => {
    console.log('A message has been sent:', msg)
    //Send the chat message to everyone EXCEPT the person that sent it
    //This is because the client displays the message on the screen as soon
    //as they submit the form
    //Sending it to everyone would cause the sender to see the message twice
    socket.broadcast.emit('chat message', `${usersMap.get(socket.id)}: ${msg}`)
  })

  socket.on('change username', (username) => {
    usersMap.set(socket.id, username)
  })
})

server.listen(3000, () => {
  console.log('A server is listening on port 3000.')
})