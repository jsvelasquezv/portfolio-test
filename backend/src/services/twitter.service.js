'use strict';

const { MAX_TWEETS_TO_RETURN } = require('../config');

const twitterApiInstance = require('../utils/twitterApiInstance');

const getLastTweets = async userId => {
  try {
    const { data } = await twitterApiInstance.get(`/users/${userId}/tweets`, {
      params: { max_results: MAX_TWEETS_TO_RETURN },
    });

    return data.data ?? [];
  } catch (error) {
    return [];
  }
};

module.exports = { getLastTweets };
