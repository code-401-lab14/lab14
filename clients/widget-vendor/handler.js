'use strict';

const Chance = require('chance');
const chance = new Chance();

function generatePayload () {
  let payload = {
    store: 'WIDGET',
    orderId: chance.guid(),
    customer: chance.name(),
    address: chance.address(),
  };
  return payload;
}

function handleDelivered (socket) {
  return function(payload){
    console.log(`WIDGET-VENDOR: Thank you for delivering for ${payload.customer}, order ${payload.orderId}`);
    socket.emit('delivered', payload);
  };
}

function sendPickup(socket, payload){
  socket.emit('pickup', payload);
}

function catchUp (socket){
  socket.emit('catch-up', {on: 'deliveries', store: 'WIDGET'});
}

module.exports = {generatePayload, handleDelivered, sendPickup, catchUp};