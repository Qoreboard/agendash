'use strict';
const path = require('path');

module.exports = (agenda, options) => {
  options = options || {};
  if (!options.middleware) {
    options.middleware = 'express';
  }
  if (!options.timezone) {
    options.timezone = 'Etc/UTC';
  }

  const agendash = require('./lib/agendash')(agenda, options);

  try {
    const middlewarePath = path.join(__dirname, 'lib/middlewares', options.middleware);
    return require(middlewarePath)(agendash);
  } catch (err) {
    throw new Error('No middleware available for ' + options.middleware);
  }
};
