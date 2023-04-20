'use strict';
let {generatePayload, handleDelivered, sendPickup} = require('./handler');

describe('Testing Vendor: Should log with thank you when event DELIVERED is emitted', () => {
  let payload = generatePayload();

  console.log = jest.fn();
  let socket = {emit: jest.fn()};

  test('Can the vendor generate a payload', () => {
    expect(generatePayload().store).toBeTruthy();
  });

  test('Can the vendor send a pickup to the server', () => {
    sendPickup(socket, payload);
    expect(socket.emit).toHaveBeenCalledWith('pickup', payload);
  });

  test('Can the vendor hear the delivery and console.log a thank you', () => {
    handleDelivered(payload);
    expect(console.log).toHaveBeenCalledWith('VENDOR: Thank you for delivering for Jamal Braun, order e3669048-7313-427b-b6cc-74010ca1f8f0');
  });
});