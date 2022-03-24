const http = require('http')

const appServer = require('./app')

const httpServer = http.createServer(appServer)

const PORT = process.env.PORT || 4000

function startServer () {
  // await mongoConnect()

  httpServer.listen(PORT, () => {
    console.log('server listening on port, ', PORT)
  })
}

startServer()
