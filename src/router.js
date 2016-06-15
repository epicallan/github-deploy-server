var express = require ('express');
var _ = require ('underscore');
var repos = require ('./repos');
var run_cmd = require ('./run_cmd').run_cmd;
var router = express.Router();

router.get('/', function(req, res) {
  res.send('deploy server is running')
});

router.post('/deploy', function(req, res) {
    var payload;
    if (typeof req.body === 'object'){
      payload = req.body.payload;
    } else {
        console.log(req.body);
        payload = JSON.parse(req.body);
    }
    _.each (repos, function (repo) {
        console.log('repository.name: ', payload.repository.name);
        if (repo.name === payload.repository.name &&
            payload.ref.indexOf(repo.ref) >= 0) {
                run_cmd(repo.deploy);
        }
        res.send('deployed');
    });
});
module.exports = router;
