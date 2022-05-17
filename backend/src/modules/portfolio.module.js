'use strict';

const { ERROR_MESSAGES } = require('../constants');
const {
  Types: { ObjectId },
} = require('mongoose');
const portfolioModel = require('../persistence/mongo/models/portfolio.model');
const { getLastTweets } = require('../services/twitter.service');

const getById = async id => {
  if (!ObjectId.isValid(id)) {
    throw new Error(ERROR_MESSAGES.INVALID_ID);
  }

  const portfolio = await portfolioModel.findById(id).lean();
  if (portfolio) {
    const tweets = await getLastTweets(portfolio.twitter_user_id);
    return { ...portfolio, tweets };
  }
  return portfolio;
};

const updateOne = (id, data = {}) => {
  if (!ObjectId.isValid(id)) {
    throw new Error(ERROR_MESSAGES.INVALID_ID);
  }

  return portfolioModel.findByIdAndUpdate(id, JSON.parse(data), {
    returnDocument: 'after',
  });
};

module.exports = { getById, updateOne };
