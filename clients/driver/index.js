'use strict';

const { io } = require('socket.io-client');
const { handlePickup, catchUp } = require('./handler');
const SERVER_URL = process.env.PORT || 'http://localhost:3001';

let driverSocket = io(SERVER_URL + '/caps');

driverSocket.on('pickup', handlePickup(driverSocket));
catchUp(driverSocket);
