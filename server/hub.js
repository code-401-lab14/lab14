'use strict';

const util = require('util');
const { Server } = require('socket.io');
const PackagesQueue = require('./lib/PackagesQueue');
const PORT = process.env.PORT || 3001;
const io = new Server(PORT);

let pickup = new PackagesQueue();
let delivered = new PackagesQueue();

let server = io.of('/caps');
server.on('connection', (socket) => {
  console.log('Client is connected to caps', socket.id);

  socket.on('join-room', (payload) => {
    socket.join(payload.store);
    console.log('Joined Room: ', socket.id);
  });

  socket.on('catch-up', (payload) => {




    if(payload.on==='deliveries'){
      if(delivered.read(payload.store)){
        console.log(delivered.read(payload.store));
        Object.keys(delivered.read(payload.store)).data.forEach(pkg => {
          socket.emit('scanned-delivered', pkg);
        });
      }
      else{console.log('no deliveries');}
    }
    else{//means you are a driver
      console.log(Object.keys(pickup.data));
      if(Object.keys(pickup.data)){
        Object.keys(pickup.data).forEach(store => {
          let currStore = pickup.read(store);
          console.log(currStore);
          Object.keys(currStore.data).forEach(pkg => {
            console.log(currStore.read(pkg));
            socket.emit('pickup', currStore.read(pkg));
          });
        });
      }
    }
  });

  socket.on('pickup', payload => {
    let storeQueue = pickup.read(payload.store);
    if(storeQueue){
      storeQueue.store(payload.orderId, payload);
    }else{
      let newStoreQueue = new PackagesQueue();
      newStoreQueue.store(payload.orderId, payload);
      pickup.store(payload.store, newStoreQueue);
    }

    socket.broadcast.emit('pickup', payload);
    console.log(`EVENT { event: pickup\n`,
      'time: some time\n',
      `payload: \n`, 
      payload);
  });

  socket.on('in-transit', payload => {
    console.log(`EVENT { event: in-transit\n`,
      'time: some time\n',
      `payload: \n`, 
      payload);
  });

  socket.on('scanned-delivered', payload => {
    let storeQueue = pickup.read(payload.store);
    console.log(util.inspect(storeQueue, false, null));
    let order = storeQueue.remove(payload.orderId);
    let deliverStoreQueue = delivered.read(payload.store);
    if(deliverStoreQueue){
      deliverStoreQueue.store(order.orderId, order);
    } else {
      let newStoreDelivered = new PackagesQueue();
      newStoreDelivered.store(order.orderId, order);
      delivered.store(order.store, newStoreDelivered);
    }
    server.to(payload.store).emit('scanned-delivered', payload);

    console.log(`EVENT { event: delivered\n`,
      'time: some time\n',
      `payload: \n`, 
      payload);
  });

  socket.on('delivered', payload => {
    console.log('removed: ', delivered.remove(payload.store));
  });

});
