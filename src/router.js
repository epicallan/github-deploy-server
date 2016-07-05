const express = require('express');
const repos = require('./configs/repos');
const deploy = require('./deploy');
const ping = require('node-http-ping');
const mailer = require('./mailer');
/* eslint-disable new-cap */
const router = express.Router();

// bug: immediate calls have been found to cause git clone errors
const runDeployCmd = (repo, callback) => setTimeout(() => deploy(repo, callback), 3000);

function checkDomainStatus(repo, callback) {
  if (repo.domain === undefined) return false;
  const port = repo.port || 80;
  return setTimeout(() => {
    ping(repo.domain, port)
    .then(time => {
      mailer('domain is up and running!!, succesful deployment', repo.domain);
      console.log(`succesfully pinged domain: ${time}`, repo.domain);
    })
    .catch(error => {
      console.log(`Failed to ping: ${error}`, repo.domain);
      if (repo.count < 3) return runDeployCmd(repo, callback);
      return mailer(`Failed to ping: ${error}`, repo.domain);
    });
  }, 5000);
}

function deploymentCb(error, repo) {
  console.log(`In deployment callback for : ${repo.name} ${repo.ref}`, repo.count);
  if (error && repo.count < 3) return runDeployCmd(repo, deploymentCb);
  if (error && repo.count === 3 && repo.domain) return mailer(error.toString(), repo.domain);
  return checkDomainStatus(repo, deploymentCb);
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
      runDeployCmd(repo, deploymentCb);
    }
  });
  res.send('deployed');
});

module.exports = router;
