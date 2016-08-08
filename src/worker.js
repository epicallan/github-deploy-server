const ping = require('node-http-ping');
const mailer = require('./mailer');
const deploy = require('./deploy');

function checkDomainStatus(repo) {
  if (repo.domain === undefined) return false;
  const port = repo.port || 80;
  return setTimeout(() => {
    ping(repo.domain, port)
    .then(time => {
      mailer('domain is up and running!!, succesful deployment', repo.domain);
      console.log(`succesfully pinged domain at ${port} for time ${time}`, repo.domain);
    })
    .catch(error => {
      console.log(`Failed to ping: ${error}`, repo.domain);
      mailer(`Domain is down on port ${port}`, repo.domain);
    });
  }, 3000);
}

function deploymentCb(code, repo) {
  if (code !== 0) return mailer(code.toString(), repo.domain);
  process.disconnect(); // process will prepare to exit if it has no more work
  return checkDomainStatus(repo);
}

process.on('message', (repo) => {
  const date = new Date();
  console.log(date, `${repo.name} : ${repo.ref}`);
  deploy(repo, deploymentCb);
});

process.send({ foo: 'bar' });

process.on('exit', (code) => {
  // this child processes exits in the mailer function
  console.log('Worker Process exited:', code);
});
