'use strict';

const buildResponse = ({ data, statusCode = 200 }) => ({
  statusCode,
  body: JSON.stringify(data, null, 2),
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
  },
});

module.exports = { buildResponse };
