'use strict';

const Chance = require('chance');
const chance = new Chance();

function generatePayload () {
  let payload = {
    store: 'FLOWERS',
    orderId: chance.guid(),
    customer: chance.name(),
    address: chance.address(),
  };
  return payload;
}

function handleDelivered (socket) {
  return function(payload){
    console.log(`FLOWER-VENDOR: Thank you for delivering for ${payload.customer}, order ${payload.orderId}`);
    socket.emit('delivered', payload);
  };
}

function sendPickup(socket, payload){
  socket.emit('pickup', payload);
}

function catchUp (socket){
  socket.emit('catch-up', {on: 'deliveries', store: 'FLOWERS'});
}

module.exports = {generatePayload, handleDelivered, sendPickup, catchUp};