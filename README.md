### How to run this project?
1. Clone the repo [@Github](http://github.com/epicallan/github-deploy-server)<br>
2. Install the NPM dependencies by `npm install && npm install forever -g`<br>
3. Write your repo settings into `repos.json`<br>
4. Finally, run  `NODE_ENV=production forever start server.js`

## TODO
- ~~check status of a deployed service and try re-deploy if~~ service is off.
- ~~Email specified group of people service status on deploy~~

@ MIT LICENSED
