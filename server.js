const express = require('express');

const projectsRouter = require('./projects/projects-router')
const actionsRouter = require('./actions/actions-router')


const server = express();

server.use(express.json())


server.use(logger)
server.get('/', (req, res) => {
  res.send('server running');
});

server.use('/api/projects', projectsRouter)
server.use('/api/actions', actionsRouter)


function logger(req, res, next) {
    console.log(`You made a ${req.method} request to the  ${req.url} endpoint at ${new Date()}`)
    next()
}

module.exports = server;
