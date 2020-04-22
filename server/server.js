const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')

server.get('/build', (req, res) => {
  var fs = require('fs')
  function copyFile(src, dist) {
    fs.createReadStream(src).pipe(fs.createWriteStream(dist))
  }
  copyFile('./a.txt', './aa.txt')
  res.send('success', 500)
})

server.use(router)
server.listen(3000, () => {
  console.log('JSON Server is running')
})
