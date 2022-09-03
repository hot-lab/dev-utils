"use strict";

const _ = require("lodash");

const requireRootModule = require("./require-module.cjs");

const defaultConfig = require("./config.default");

const packageJsonConfig = requireRootModule("package.json").mmconfig;

const fileConfig = requireRootModule("mmconfig.js");

const userConfig = fileConfig || packageJsonConfig;

if (!userConfig) {
  module.exports = defaultConfig;
}

const loadConfig = (
  defaultConfigRoot,
  packageJsonConfigName,
  fileConfigName
) => {
  const defaultConfig = require(defaultConfigRoot);
  const packageJsonConfig =
    requireRootModule("package.json")[packageJsonConfigName];
  const fileConfig = requireRootModule(fileConfigName);

  const userConfig = fileConfig || packageJsonConfig;

  if (!userConfig) {
    return defaultConfig;
  }

  return _.merge(defaultConfig, userConfig);
};

module.exports = loadConfig;
