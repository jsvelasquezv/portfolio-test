'use strict';

const { MONGO_SRV } = require('../../config');

const mongoose = require('mongoose');

let connection;

const connect = async () => {
  if (!connection) {
    connection = await mongoose.connect(MONGO_SRV);
  }

  return connection;
};

module.exports = { connect };
