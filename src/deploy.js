const exec = require('child_process').exec;
/* eslint-disable no-param-reassign */
module.exports = function deploy(repo, callback) {
  exec(repo.deploy, (err, stdout, stderr) => {
    repo.count ++;
    callback(err, repo);
    if (err) console.log(`error occured ${err}: ${stderr}`);
    console.log(stdout);
  });
};
