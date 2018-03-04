#! /usr/bin/env node

'use strict';

const program = require('commander');
const tests = require('./lib/tests');
const server = require('./lib/server');
const _ = require('lodash');
const chalk = require('chalk');

function checkInvalid () {
  let cmd = process.argv[2];
  let valid = _.some(program.commands, {_name: cmd});

  if (!valid) {
    console.log(chalk.red('Invalid command'));
    program.help();
  }
}

program
  .version('1.0.0')
  .option('-p, --port [number]', 'listen on port [9000]', 9000);

program
  .command('test')
  .description('Run unit tests')
  .action(() => {
    tests.run()
      .then((result) => process.exit(result));
  });

program
  .command('server')
  .description('Run local server')
  .action(() => server.run({ port: program.port }));

program
  .parse(process.argv);

checkInvalid();
