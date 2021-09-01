const socket = io();
// catches the message from the server io.on() method where we have given the socket.emit() function call for the message 

socket.on('message' , message => {
  console.log(message);
});
