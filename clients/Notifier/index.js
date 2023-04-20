'use strict';

const { io } = require('socket.io-client');
const { handleNewEvent } = require('./handler');
const SERVER_URL = process.env.PORT || 'http://localhost:3001';

let notificationSocket = io(SERVER_URL + '/calendar');

notificationSocket.on('new-event', handleNewEvent(notificationSocket));
notificationSocket.emit('catch-up', {random: 'payload'});