'use strict';

const Chance = require('chance');
const chance = new Chance();

function generatePayload () {
  let payload = {
    date: 'some date',
    id: chance.guid(),
    time: 'some time',
    person: chance.name(),
    name: 'some Event Name',
  };
  return payload;
}

function handleUpcomingEvent (socket) {
  return function(payload){
    console.log(`${payload.person} GOING TO NEW EVENT: ${payload.name}`);
    socket.emit('event-complete', payload);
  };
}

function makeEvent(socket, payload){
  socket.emit('new-event', payload);
}

module.exports = {generatePayload, handleUpcomingEvent, makeEvent};