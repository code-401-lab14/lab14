'use strict';

const { io } = require('socket.io-client');
const SERVER_URL = process.env.PORT || 'http://localhost:3001';
const {handleDelivered, generatePayload, sendPickup, catchUp} = require('./handler');
let vendorSocket = io(SERVER_URL + '/caps');

let payload = generatePayload();

vendorSocket.emit('join-room', payload);

vendorSocket.on('scanned-delivered', handleDelivered(vendorSocket));
catchUp(vendorSocket);

//vendorSocket.emit('pickup', generatePayload());
sendPickup(vendorSocket, payload);