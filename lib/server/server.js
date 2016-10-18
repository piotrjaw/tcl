'use strict';

const chalk = require('chalk');
const express = require('express');
const utils = require('./utils');
const favicon = require('serve-favicon');

let app = express();

module.exports = function (config) {
  config = config || {};

  let otherRoute = '*';

  app.get(otherRoute, utils.sendLocal);

  app.disable('etag');
  app.use(favicon(process.cwd() + '/favicon.ico'));

  app.listen(config.port);

  console.log(chalk.green('Local server running on port ' + config.port));
};
