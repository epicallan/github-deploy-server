const express = require('express');
const repos = require('./configs/repos');
const path = require('path');
const child = require('child_process').fork;

const worker = path.resolve(__dirname, 'worker.js');

/* eslint-disable new-cap */
const router = express.Router();
// there should be only one instance of the deployment process
// for some strange reason github sends 2 payloads to the deploy url at almost the same time
// this creates a situation where 2 deployments of the same repo start running at the same time
// hence alot of caos
let isDeployProcessRunning = false; // flag to make sure that we only have one deployement instance


function startDeployWorker(repo) {
  const childProcess = child(worker);

  childProcess.send(repo);

  childProcess.on('disconnect', () => {
    isDeployProcessRunning = false;
    console.log('child process has disconnected we can start another worker process');
  });
}

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
        startDeployWorker(repo);
      }
    }
  });
  res.send('deployement running');
});

module.exports = router;
