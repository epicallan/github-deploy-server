const express = require('express');
const repos = require('./configs/repos');
const deploy = require('./deploy');
const ping = require('node-http-ping');
const mailer = require('./mailer');
/* eslint-disable new-cap */
const router = express.Router();

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
  }, 10000);
}

function deploymentCb(error) {
  const repo = this;
  if (error && repo.count < 3) return deploy(repo, deploymentCb);
  if (error && repo.count === 3 && repo.domain) return mailer(error.toString(), repo.domain);
  return checkDomainStatus(repo);
}

router.get('/', (req, res) => {
  res.send('deploy server is running');
});
/* eslint-disable no-param-reassign */
router.post('/deploy', (req, res) => {
  const payload = req.body;
  repos.forEach((repo) => {
    if (repo.name === payload.repository.name && payload.ref === repo.ref) {
      repo.count = 0;
      deploy(repo, deploymentCb);
    }
  });
  res.send('deployed');
});

module.exports = router;
