const express = require('express');
const repos = require('./configs/repos');
const deploy = require('./deploy');
const ping = require('node-http-ping');
const mailer = require('./mailer');
const path = require('path');
const forkWorker = require('child_process').fork;

const worker = path.resolve(process.cwd(), 'src/worker.js');

/* eslint-disable new-cap */
const router = express.Router();
// there should be only one instance of the deployment process
// for some strange reason github sends 2 payloads to the deploy url at almost the same time
// this creates a situation where 2 deployments of the same repo start running at the same time
// hence alot of caos
let isDeployProcessRunning = false; // flag to make sure that we only have one deployement instance

function checkDomainStatus(repo) {
  if (repo.domain === undefined) return false;
  isDeployProcessRunning = false;
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
  if (error && repo.count < 3) return deploy(repo, deploymentCb); // try redeploying
  // we give up and email you the error
  if (error && repo.count === 3 && repo.domain) return mailer(error.toString(), repo.domain);
  return checkDomainStatus(repo); // probably all went well and we check whether domain is up
}
router.get('/test', (req, res) => {
  forkWorker(worker);
  res.send('test');
});

router.get('/', (req, res) => {
  res.send('deploy server is running');
});
/* eslint-disable no-param-reassign */
router.post('/deploy', (req, res) => {
  const payload = req.body;
  repos.forEach((repo) => {
    if (repo.name === payload.repository.name && payload.ref === repo.ref) {
      if (!isDeployProcessRunning) {
        isDeployProcessRunning = true;
        const date = new Date();
        console.log(repo.name, date);
        repo.count = 0;
        deploy(repo, deploymentCb);
        // worker(repo, deploymentCb);
        // fork('worker');
      }
    }
  });
  res.send('deployed');
});

module.exports = router;
