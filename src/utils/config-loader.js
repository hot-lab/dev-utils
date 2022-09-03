"use strict";

const path = require("path");

const _ = require("lodash");

const {
  requireRootModule,
  requireLocalModule,
} = require("./require-module.cjs");

const configLoader = (
  defaultConfigName,
  packageJsonConfigName,
  fileConfigName
) => {
  const defaultConfig = requireLocalModule(defaultConfigName); // require(path.resolve("./", defaultConfigName));
  const packageJsonConfig =
    requireRootModule("package.json")[packageJsonConfigName];
  const fileConfig = requireRootModule(fileConfigName);

  const userConfig = fileConfig || packageJsonConfig;

  if (!userConfig) {
    return defaultConfig;
  }

  return _.merge(defaultConfig, userConfig);
};

module.exports = configLoader;
