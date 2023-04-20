'use strict';

const { io } = require('socket.io-client');
const SERVER_URL = process.env.PORT || 'http://localhost:3001';
const {handleUpcomingEvent, makeEvent, generatePayload} = require('./handler');
let personSocket = io(SERVER_URL + '/caps');

let payload = generatePayload();

personSocket.emit('join-room', payload);

personSocket.on('upcoming-event', handleUpcomingEvent(personSocket));

makeEvent(personSocket, payload);