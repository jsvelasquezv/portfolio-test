'use strict';

const mongodb = require('../persistence/mongo');
const portfolioModule = require('../modules/portfolio.module');
const { getById, updateOne } = require('./portfolio');

jest.mock('../persistence/mongo');
jest.mock('../modules/portfolio.module');

describe('Portfolio handler', () => {
  describe('getById', () => {
    it('should call connect and return a 200 status code', async () => {
      portfolioModule.getById.mockResolvedValue({});
      const event = {
        pathParameters: { id: '1234' },
      };

      const result = await getById(event);
      expect(mongodb.connect).toHaveBeenCalled();
      expect(result.statusCode).toEqual(200);
    });

    it('should call connect and return a 400 status code if no portfolio is found', async () => {
      portfolioModule.getById.mockResolvedValue(null);
      const event = {
        pathParameters: { id: '1234' },
      };

      const result = await getById(event);
      expect(mongodb.connect).toHaveBeenCalled();
      expect(result.statusCode).toEqual(404);
    });

    it('should return a 500 status code if an error occurs', async () => {
      const error = new Error('error');
      portfolioModule.getById.mockRejectedValue(error);
      const event = {
        pathParameters: { id: '1234' },
      };

      try {
        await getById(event);
      } catch (error) {
        expect(mongodb.connect).toHaveBeenCalled();
        expect(result.statusCode).toEqual(500);
      }
    });
  });

  describe('updateOne', () => {
    it('should call connect and return a 200 status code', async () => {
      portfolioModule.updateOne.mockResolvedValue({});
      const event = {
        pathParameters: { id: '1234' },
        body: { names: 'Juan' },
      };

      const result = await updateOne(event);
      expect(mongodb.connect).toHaveBeenCalled();
      expect(result.statusCode).toEqual(200);
    });

    it('should return a 500 status code if an error occurs', async () => {
      const error = new Error('error');
      portfolioModule.updateOne.mockRejectedValue(error);
      const event = {
        pathParameters: { id: '1234' },
      };

      try {
        await updateOne(event);
      } catch (error) {
        expect(mongodb.connect).toHaveBeenCalled();
        expect(result.statusCode).toEqual(500);
      }
    });
  });
});
