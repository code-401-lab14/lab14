'use strict';
let {handlePickup} = require('./handler');

describe('Testing Driver: Should log with thank you when event PICKUP and IN TRANSIT is emitted', () => {
  let payload = {store: 'test', orderId: 'test', customer: 'test', address: 'test'};

  console.log = jest.fn();
  let socket = {emit: jest.fn()};

  test('Console.log and emit should fire up', () => {
    handlePickup(socket)(payload);
    expect(console.log).toHaveBeenCalledWith('DRIVER: picked up ', payload.orderId);
    expect(socket.emit).toHaveBeenCalledWith('in-transit', payload);
    expect(socket.emit).toHaveBeenCalledWith('delivered', payload);
  });
});