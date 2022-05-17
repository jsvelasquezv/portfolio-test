'use strict';

const { Schema, model } = require('mongoose');

const portfolioSchema = new Schema(
  {
    description: { type: String, required: true },
    image_url: { type: String, required: true },
    twitter_user_name: { type: String, required: true },
    title: { type: String, required: true },
    experience_summary: { type: String, required: true },
    last_names: { type: String, required: true },
    names: { type: String, required: true },
    twitter_user_id: { type: String, required: true },
  },
  { timestamps: true }
);

const portfolioModel = model('portfolio', portfolioSchema);

module.exports = portfolioModel;
