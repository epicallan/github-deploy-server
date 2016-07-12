
/* eslint-disable no-param-reassign */
const exec = require('child_process').exec;

module.exports = function deploy(repo, callback) {
  repo.count ++;
  const deployCb = callback.bind(repo);
  exec(repo.deploy, deployCb);
};
