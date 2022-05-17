'use strict';

const mongoose = require('mongoose');
const { connect } = require('./');

jest.mock('mongoose');
jest.mock('../../config', () => ({
  MONGO_SRV: 'mongo_connection_string',
}));

describe('connect', () => {
  it('should call mongoose.connect with the connection string', async () => {
    const connection = {};
    mongoose.connect.mockResolvedValue(connection);
    const result = await connect();

    expect(result).toEqual(connection);
    expect(mongoose.connect).toHaveBeenCalledWith('mongo_connection_string');
    expect(mongoose.connect).toHaveBeenCalledTimes(1);
  });

  it('should call mongoose.connect only once if was already called', async () => {
    await connect();
    await connect();

    expect(mongoose.connect).toHaveBeenCalledWith('mongo_connection_string');
    expect(mongoose.connect).toHaveBeenCalledTimes(1);
  });
});
