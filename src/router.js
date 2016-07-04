var express = require ('express');
var repos = require ('./repos');
var cmd = require ('./cmd').cmd;
var ping = require('node-http-ping');
var nodemailer = require('nodemailer');
var router = express.Router();

function email(time){
  // TODO
}

function checkDeployement(repo){
  if (repo.domain === undefined) return false
  var port = repo.port || 80;
  setTimeOut(()=>{
    ping(repo.domain, port)
    .then(time => {
      email(time);
      if (time === -1) cmd(repo.deploy);
    })
    .catch(error => {
      console.log(`Failed to ping: ${error}`);
    });
  }, 10000)
}


router.get('/', function(req, res) {
  res.send('deploy server is running')
});

router.post('/deploy', function(req, res) {
  var payload = req.body;
  repos.forEach((repo) => {
    if (repo.name === payload.repository.name && payload.ref === repo.ref){
      cmd(repo.deploy);
    }
  });
  res.send('deployed');
});
module.exports = router;
