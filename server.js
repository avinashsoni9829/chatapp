const path  = require('path');
const socketio = require('socket.io');
const http = require('http');

const express = require('express');
const app = express();

const server = http.createServer(app);

const io = socketio(server);


const PORT = 3000 || process.env.PORT ;
// set public folder static 

/*
  1) use the path from node  i,e const path = require ('path')
  2) app.use(path.join(__dirname, 'public'))
   link :  https://expressjs.com/en/starter/static-files.html
*/


app.use(express.static(path.join(__dirname , 'public')));


// this runs when the client is connected 

io.on('connection' , socket => {
    
    // socket.emit - >  this will emit to the single client which is connecting   
  
  
     socket.emit('message', 'Welcome to chatRoom!');

    // broadcast this message when the user connect 
     // socket.broadcast.emit -> this is emit to everyone except the user which is connected 
     
     socket.broadcast.emit('message' , ' A user has joined the chat !');

     // if we want to broadcast to all the clients then use io.emit();


     // this runs when the client is disconnected 

     socket.on('disconnect', () => {
         io.emit('message', 'A user has left the chat !')
     })

})






server.listen(PORT, () => console.log(` server running on ${PORT}`));

