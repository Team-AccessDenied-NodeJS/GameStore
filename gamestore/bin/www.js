/* globals process */

/**
 * Module dependencies.
 */
const debug = require('debug')('gamestore:server');
const http = require('http');
const colors = require('colors/safe');
const config = require('../config');

const async = () => {
  return Promise.resolve();
};

async()
  .then(() => require('../db/mongodb').init(config.connectionString))
  .then((db) => require('../data').init(db))
  .then((data) => require('../app').init(data))
  .then((app) => {
    /**
     * Get port from environment and store in Express.
     */
    const port = normalizePort(config.port || '3000');
    app.set('port', port);

    /**
     * Create HTTP server.
     */

    const server = http.createServer(app);

    /**
     * Listen on provided port, on all network interfaces.
     */

    server.listen(port, () =>
    console.log(colors.green(`Server is running at localhost:${port}`)));
    server.on('error', onError);
    server.on('listening', onListening);

    /**
     * Normalize a port into a number, string, or false.
     */

    function normalizePort(val) {
      const portToNormalize = parseInt(val, 10);

      if (isNaN(portToNormalize)) {
        // named pipe
        return val;
      }

      if (portToNormalize >= 0) {
        // port number
        return portToNormalize;
      }

      return false;
    }

    /**
     * Event listener for HTTP server "error" event.
     */

    function onError(error) {
      if (error.syscall !== 'listen') {
        throw error;
      }

      const bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

      // handle specific listen errors with friendly messages
      switch (error.code) {
        case 'EACCES':
          console.error(bind + ' requires elevated privileges');
          process.exit(1);
          break;
        case 'EADDRINUSE':
          console.error(bind + ' is already in use');
          process.exit(1);
          break;
        default:
          throw error;
      }
    }

    /**
     * Event listener for HTTP server "listening" event.
     */

    function onListening() {
      const addr = server.address();
      const bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
      debug('Listening on ' + bind);
    }
});
