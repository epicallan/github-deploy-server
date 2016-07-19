const exec = require('child_process').exec;

/* eslint-disable no-param-reassign */
module.exports = function deploy(repo, callback) {
  repo.count ++;
  const deployCb = callback.bind(repo);

  const proc = exec(repo.deploy);

  proc.stdout.on('data', (data) => {
    deployCb(null);
    console.log(`stdout: ${data}`);
  });

  proc.stderr.on('data', (data) => {
    console.log(`stderr: ${data}`);
  });

  proc.on('error', (error) => {
    console.log(`error: ${error}`);
    deployCb(error);
  });

  proc.on('close', (code) => {
    console.log('exit code', code);
    deployCb(code);
  });
};
