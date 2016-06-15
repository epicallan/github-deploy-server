/**
 * Module dependencies.
 */
var app = require('./src/app');

/**
 * Get port from environment and store in Express.
 */
var PORT = process.env.PORT || '7777';
// Use the Express application instance to listen to the '3000' port
app.listen(PORT);

// Log the server status to the console
console.log(`Server running at ${PORT}`);
