### How to run this project?
1. Clone the repo [@Github](http://github.com/epicallan/github-deploy-server)<br>
2. Install the NPM dependencies by `npm install`<br>
3. Write your repo settings into [repos.json](https://github.com/epicallan/github-deploy-server/blob/master/src/configs/repos.json)<br>
4. Rename [example.config.js](https://github.com/epicallan/github-deploy-server/blob/master/src/configs/example.config.js) as config.js and input your correct gmail username and password
5. Finally, run `npm start`. If you want to run node process as daemon you could use
[forever](https://github.com/foreverjs/forever) or [pm2](https://github.com/Unitech/pm2)

## TODO
- ~~check status of a deployed service and try re-deploy if service is off~~
- ~~Email specified group of people service status on deploy~~

@ MIT LICENSED
