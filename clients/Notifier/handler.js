'use strict';

function handleNewEvent (socket){
  return function (payload){
    console.log(payload);
  
    console.log('new-event ', payload.name);
    socket.emit('upcoming-event', payload);

  };
}

module.exports = {handleNewEvent};