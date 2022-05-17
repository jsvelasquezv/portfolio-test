'use strict';

const { ERROR_MESSAGES } = require('../constants');

const { connect } = require('../persistence/mongo');
const portfolioModule = require('../modules/portfolio.module');
const { buildResponse } = require('../utils');

const getById = async event => {
  const {
    pathParameters: { id },
  } = event;

  try {
    await connect();
    const portfolio = await portfolioModule.getById(id);

    if (!portfolio) {
      return buildResponse({
        data: { message: ERROR_MESSAGES.PORTFOLIO_NOT_FOUND },
        statusCode: 404,
      });
    }
    return buildResponse({ data: { portfolio } });
  } catch (error) {
    return buildResponse({
      data: {
        message: error.message,
        error,
      },
      statusCode: 500,
    });
  }
};

const updateOne = async event => {
  const {
    pathParameters: { id },
    body,
  } = event;
  try {
    await connect();
    const portfolio = await portfolioModule.updateOne(id, body);

    return buildResponse({ data: { portfolio } });
  } catch (error) {
    return buildResponse({
      data: {
        message: error.message,
        error,
      },
      statusCode: 500,
    });
  }
};

module.exports = { getById, updateOne };
