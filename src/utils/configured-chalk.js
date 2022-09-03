"use strict";

const chalk = require("chalk");

chalk.error = chalk.bold.red;
chalk.warn = chalk.bold.yellow;
chalk.success = chalk.bold.green;

module.exports = chalk;
