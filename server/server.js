const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

server.use(middlewares)

server.put('/build/:sid', (req, res) => {
  const fs = require('fs-extra')
  const path = require('path')
  const serverPath = process.cwd()
  const frontEndPath = path.join(serverPath, '../frontend')
  const systemId = req.params.sid
  const systemPath = path.join(serverPath, `/codes/${systemId}`)
  const copyFrontendCode = () => {
    fs.removeSync(systemPath)
    fs.copySync(frontEndPath, systemPath, {
      filter: src => {
        const exceptList = ['node_modules', /m-[a-z]+\\[a-z]+.js/, /views\\/, 'router.js']
        return !exceptList.some(exceptItem => src.match(exceptItem))
      }
    })
  }
  const genratePages = () => {
    const pages = router.db.get('pages').value().filter(page => page.systemId === systemId)
  }
  copyFrontendCode()
  genratePages()
  res.sendStatus(200)
})

server.use(router)
server.listen(3000, () => {
  console.log('JSON Server is running')
})
