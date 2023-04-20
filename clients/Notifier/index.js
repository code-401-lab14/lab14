'use strict';

const { io } = require('socket.io-client');
const { handleNewEvent } = require('./handler');
const SERVER_URL = process.env.PORT || 'http://localhost:3001';

let driverSocket = io(SERVER_URL + '/caps');

driverSocket.on('new-event', handleNewEvent(driverSocket));

