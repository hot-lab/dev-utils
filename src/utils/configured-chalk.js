"use strict";

const chalk = require("chalk");

chalk.error = chalk.bold.red;
chalk.warn = chalk.orange;
chalk.success = chalk.green;

module.exports = chalk;
