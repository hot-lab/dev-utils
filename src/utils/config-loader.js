"use strict";

const exec = require("child_process").exec;

const _ = require("lodash");

const {
  requireRootModule,
  requireLocalModule,
} = require("./require-module.cjs");

const getPackageRoot = async (packageName) => {
  return new Promise((resolve, reject) => {
    exec(`npm ls ${packageName} --parseable`, (err, stdout, stderr) => {
      if (err) {
        reject(err);
      }
      if (stderr) {
        reject(stderr);
      }
      resolve(stdout.trim());
    });
  });
};

const configLoader = async (
  [packageName, defaultConfigName],
  packageJsonConfigName,
  fileConfigName
) => {
  const packageRoot = await getPackageRoot(packageName);
  const defaultConfig = requireLocalModule(packageRoot, defaultConfigName);
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
