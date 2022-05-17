'use strict';

const { ERROR_MESSAGES } = require('../constants');
const portfolioModel = require('../persistence/mongo/models/portfolio.model');
const { getById, updateOne } = require('./portfolio.module');
const { getLastTweets } = require('../services/twitter.service');

jest.mock('../persistence/mongo/models/portfolio.model', () => ({
  findById: jest.fn().mockReturnThis(),
  findByIdAndUpdate: jest.fn(),
  lean: jest.fn(),
}));
jest.mock('../services/twitter.service');

describe('Portfolio module', () => {
  describe('getById', () => {
    it('should return the portfilio and the user tweets ', async () => {
      const id = '6282ce2efe163b00c61486db';
      const portFolio = { _id: id, names: 'Juan S' };
      portfolioModel.lean.mockResolvedValue(portFolio);
      getLastTweets.mockResolvedValue([]);

      const result = await getById(id);

      expect(result).toEqual({ ...portFolio, tweets: [] });
      expect(portfolioModel.findById).toHaveBeenCalledWith(id);
    });

    it('should return the result of portfolioModel.findById when it returns null', async () => {
      const id = '6282ce2efe163b00c61486db';
      portfolioModel.lean.mockResolvedValue(null);

      const result = await getById(id);

      expect(result).toEqual(null);
      expect(portfolioModel.findById).toHaveBeenCalledWith(id);
    });

    it('should throw an error if the id is not a valid ObjectId', async () => {
      try {
        await getById('123');
      } catch (error) {
        expect(error.message).toEqual(ERROR_MESSAGES.INVALID_ID);
      }
    });
  });

  describe('updateOne', () => {
    it('should return ', () => {
      const id = '6282ce2efe163b00c61486db';
      const portFolio = { _id: id, names: 'Juan S' };
      portfolioModel.findByIdAndUpdate.mockReturnValue(portFolio);
      const data = JSON.stringify({ last_names: 'Velasquez' });

      const result = updateOne(id, data);

      expect(result).toEqual(portFolio);
      expect(portfolioModel.findByIdAndUpdate).toHaveBeenCalledWith(
        id,
        JSON.parse(data),
        {
          returnDocument: 'after',
        }
      );
    });

    it('should throw an error if the id is not a valid ObjectId', () => {
      try {
        updateOne('123');
      } catch (error) {
        expect(error.message).toEqual(ERROR_MESSAGES.INVALID_ID);
      }
    });
  });
});
