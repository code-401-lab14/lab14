'use strict';

function handlePickup (socket){
  return function (payload){
    console.log(payload);
    socket.emit('join-room', payload);
    console.log('DRIVER: picked up ', payload.orderId);
    socket.emit('in-transit', payload);
    console.log('DRIVER: delivered up ', payload.orderId);
    socket.emit('scanned-delivered', payload);
  };
}

function catchUp (socket){
  socket.emit('catch-up', {on: 'pickups', store: ''});
}

module.exports = {handlePickup, catchUp};