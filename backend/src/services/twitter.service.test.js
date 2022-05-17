'use strict';

const { MAX_TWEETS_TO_RETURN } = require('../config');

const twitterApiInstance = require('../utils/twitterApiInstance');
const { getLastTweets } = require('./twitter.service');

jest.mock('../utils/twitterApiInstance');
jest.mock('../config', () => ({ MAX_TWEETS_TO_RETURN: 3 }));

describe('twitter service', () => {
  describe('getLastTweets', () => {
    const userId = '1235';

    it('should return the tweets of the user', async () => {
      const tweets = [
        { id: '123', text: 'Hello' },
        { id: '455', text: 'World' },
      ];
      twitterApiInstance.get.mockResolvedValue({ data: { data: tweets } });

      const lastTweets = await getLastTweets(userId);

      expect(twitterApiInstance.get).toHaveBeenCalledWith(
        `/users/${userId}/tweets`,
        { params: { max_results: MAX_TWEETS_TO_RETURN } }
      );
      expect(lastTweets).toEqual(tweets);
    });

    it('should return an empty array if twitter dont returns data', async () => {
      twitterApiInstance.get.mockResolvedValue({ data: {} });

      const lastTweets = await getLastTweets(userId);

      expect(lastTweets).toEqual([]);
    });

    it('should return an empty array if an error occurs', async () => {
      twitterApiInstance.get.mockRejectedValue(new Error('reject'));

      const lastTweets = await getLastTweets(userId);

      expect(lastTweets).toEqual([]);
    });
  });
});
