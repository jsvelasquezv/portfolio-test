'use strict';

const buildResponse = ({ data, statusCode = 200 }) => ({
  statusCode,
  body: JSON.stringify(data, null, 2),
});

module.exports = { buildResponse };
