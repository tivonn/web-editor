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
  const systemId = Number(req.params.sid)
  const systemPath = path.join(serverPath, `/codes/${systemId}`)
  const generateCode = () => {
    removeCode()  // todo 有时候会报operation not permitted的错误
    copyCode()
    outputCode()
  }
  const removeCode = () => {
    fs.removeSync(systemPath)
  }
  const copyCode = () => {
    fs.copySync(frontEndPath, systemPath, {
      filter: src => {
        const exceptList = ['node_modules', /m-[a-z]+\\[a-z]+.js/, /views\\/, 'router.js']
        return !exceptList.some(exceptItem => src.match(exceptItem))
      }
    })
  }
  const outputCode = () => {
    fs.outputFileSync(path.join(systemPath, '/src/app.mixin.js'), require(path.join(serverPath, '/template/app.mixin.js'))(systemId))
    const pages = router.db.get('pages').value().filter(page => page.systemId === systemId)
    fs.outputFileSync(path.join(systemPath, '/src/router.js'), require(path.join(serverPath, '/template/router.js'))(pages))
    pages.forEach(page => {
      const pageId = page.id
      const pagePath = path.join(systemPath, `/src/views/${pageId}`)
      fs.copySync(path.join(frontEndPath, '/src/views/system/preview.vue'), path.join(pagePath, '/index.vue'))
      fs.outputFileSync(path.join(pagePath, '/data.js'), `export default ${JSON.stringify(page.elements)}`)
    })
  }
  generateCode()
  res.sendStatus(200)
})

server.use(router)
server.listen(3000, () => {
  console.log('JSON Server is running')
})
