const http = require('http')
const next = require('next')

const port = parseInt(process.env.PORT || '3000', 10)
const app = next({ dev: false })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  http.createServer((req, res) => {
    handle(req, res)
  }).listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})

// Graceful shutdown
process.on('SIGINT', () => process.exit(0))
process.on('SIGTERM', () => process.exit(0))
