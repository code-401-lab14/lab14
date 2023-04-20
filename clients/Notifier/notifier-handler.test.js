'use strict';

let {handleNewEvent} = require('./handler');

describe('Testing Notification: Should log new event added! Lets get ready to rumble!', () => {
  let payload = {name: 'test', id: 'test', person: 'test', date: 'test', time: 'test'};

  console.log = jest.fn();
  let socket = {emit: jest.fn()};

  test('Console.log and emit should fire up', () => {
    handleNewEvent(socket)(payload);
    expect(console.log).toHaveBeenCalledWith('new-event ', payload.orderId);
    expect(socket.emit).toHaveBeenCalledWith('upcoming-event', payload);
    expect(socket.emit).toHaveBeenCalledWith('event-complete', payload);
  });
});