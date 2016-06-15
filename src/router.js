var express = require ('express');
var _ = require ('underscore');
var repos = require ('./repos');
var run_cmd = require ('./runCmd').run_cmd;
var router = express.Router();

router.get('/', function(req, res) {
  res.send('deploy server is running')
});

router.post('/deploy', function(req, res) {
    var payload = req.body;
    _.each(repos, function (repo) {
        if (repo.name === payload.repository.name && payload.ref === repo.ref) run_cmd(repo.deploy);
        res.send('deployed');
    });
});
module.exports = router;