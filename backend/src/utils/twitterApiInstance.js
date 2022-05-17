'use strict';

const { TWITTER_API_URL, TWITTER_TOKEN } = require('../config');

const axios = require('axios');

const twitterApiInstance = axios.create({
  baseURL: TWITTER_API_URL,
  headers: {
    Authorization: `Bearer ${TWITTER_TOKEN}`,
  },
});

module.exports = twitterApiInstance;
