const exec = require('child_process').exec;

/* eslint-disable no-param-reassign */
module.exports = function deploy(repo, callback) {
  const proc = exec(repo.deploy);

  proc.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });

  proc.stderr.on('data', (data) => {
    console.log(`stderr: ${data}`);
  });

  proc.on('error', (error) => {
    console.log(`error: ${error}`);
  });

  proc.on('close', (code) => {
    console.log('Deploy process exited with code: ', code);
    callback(code, repo);
  });
};
