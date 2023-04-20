'use strict';

const util = require('util');
const { Server } = require('socket.io');
const PackagesQueue = require('./lib/PackagesQueue');
const PORT = process.env.PORT || 3001;
const io = new Server(PORT);

let events = new PackagesQueue();

let server = io.of('/calendar');
server.on('connection', (socket) => {
  console.log('Client is connected to calendar', socket.id);

  socket.on('join-room', (payload) => {
    socket.join(payload.person);
    console.log('Joined Room: ', payload.person, socket.id);
  });

  socket.on('catch-up', payload => {
    if(Object.keys(events.data)){
      Object.keys(events.data).forEach(personKey => {

        let personQueue = events.read(personKey);
        Object.keys(personQueue.data).forEach(eventKey =>{
          socket.emit('new-event', personQueue.read(eventKey));
        });
      });
    }
  });

  socket.on('new-event', payload => {
    let personQueue = events.read(payload.person);
    if(personQueue){
      personQueue.store(payload.id, payload);
    }else{
      let newPersonQueue = new PackagesQueue();
      newPersonQueue.store(payload.id, payload);
      events.store(payload.person, newPersonQueue);
    }

    socket.broadcast.emit('new-event', payload);
    console.log(`NEW EVENT { event: ${payload.name}\n`,
      `payload: \n`, 
      payload);
  });

  socket.on('upcoming-event', payload => {
    console.log(`UPCOMING EVENT { event: ${payload.name}\n`,
      `payload: \n`, 
      payload);
    server.to(payload.person).emit('upcoming-event', payload);
  });

  socket.on('event-complete', payload => {
    let personQueue = events.read(payload.person);
    console.log(util.inspect(personQueue, false, null));
    console.log('Removed event: ', personQueue.remove(payload.id));

    console.log(`EVENT COMPLETE{ event: ${payload.name}\n`,
      `payload: \n`, 
      payload);
  });

});
