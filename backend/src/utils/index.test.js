'use strict';

const { buildResponse } = require('./');

describe('utils', () => {
  describe('buildResponse', () => {
    it('should return the data with the correct shape', () => {
      const data = { last_names: 'Velasquez' };
      const response = buildResponse({ data });

      expect(response).toEqual({
        statusCode: 200,
        body: JSON.stringify(data, null, 2),
      });
    });
  });
});
