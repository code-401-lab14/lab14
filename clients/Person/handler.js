'use strict';

const Chance = require('chance');
const chance = new Chance();

function generatePayload () {
  let payload = {
    eventName: 'FLOWERS',
    id: chance.guid(),
    person: chance.name(),
    date: chance.date(),
  };
  return payload;
}

function handleDelivered (socket) {
  return function(payload){
    console.log(`FLOWER-VENDOR: Thank you for delivering for ${payload.customer}, order ${payload.orderId}`);
    socket.emit('delivered', payload);
  };
}

function makeEvent(socket, payload){
  socket.emit('new-event', payload);
}

function catchUp (socket){
  socket.emit('catch-up', {on: 'deliveries', store: 'FLOWERS'});
}

module.exports = {generatePayload, handleDelivered, sendPickup, catchUp};