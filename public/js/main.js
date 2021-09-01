// brining the chatbox from UI
const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');



const socket = io();
// catches the message from the server io.on() method where we have given the socket.emit() function call for the message 

socket.on('message' , message => {
  console.log(message);

  outputMessage(message);

  // for the scroll part
  chatMessages.scrollTop = chatMessages.scrollHeight;


});

// now we create a event listener for submitting the chat form 


chatForm.addEventListener('submit', e => {

   e.preventDefault();
   
   const msg = e.target.elements.msg.value;
   
   // emit message to server  
  socket.emit('chatMessage',msg);

  // clearing the message box 

  e.target.elements.msg.value = '';
  e.target.elements.msg.focus();
  



});


// output message to DOM

function outputMessage(message) {

    const div  = document.createElement('div');

    div.classList.add('message');

    div.innerHTML = `<p class = "meta">Brad <span>9:12 pm </span> </p>
                     <p class = "text">
                     ${message}
                     </p>      
                    `;
   
   // putting the message in DOM

   document.querySelector('.chat-messages').appendChild(div);

}