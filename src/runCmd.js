exports.run_cmd = function (cmd) {
	var exec = require ('child_process').exec;
	exec (cmd, function (err, stdout, stderr) {
		if (err) console.log ("Error occured while running the cmd: " + stderr);
		console.log (stdout);
	});
}
