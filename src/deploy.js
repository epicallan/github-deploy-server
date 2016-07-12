
const exec = require('child_process').exec;
/* eslint-disable no-param-reassign */
module.exports = function deploy(repo, callback) {
  repo.count ++;
  const deployCb = callback.bind(repo);
  exec(repo.deploy, deployCb);
};
