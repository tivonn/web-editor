const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

server.use(middlewares)

server.get('/userinfo', (req, res) => {
  res.send({
    name: 'tivonn',
    time: new Date()
  })
})

server.get('/id', (req, res) => {
  const { db } = router
  const { type } = req.query
  const typeItem = db.get('ids').find({ type })
  let { max } = typeItem.value()
  typeItem.update('max', i => ++max).write()
  res.send({ id: max })
})

server.put('/build/:sid', (req, res) => {
  const fs = require('fs-extra')
  const path = require('path')
  const serverPath = process.cwd()
  const frontEndPath = path.join(serverPath, '../frontend')
  const systemId = Number(req.params.sid)
  const systemPath = path.join(serverPath, `/codes/${systemId}`)
  const generateCode = () => {
    removeCode()
    copyCode()
    outputCode()
  }
  const removeCode = () => {
    fs.removeSync(systemPath)
  }
  const copyCode = () => {
    fs.copySync(frontEndPath, systemPath, {
      filter: src => {
        const exceptList = [
          /node_modules/, // node_modules
          /package[-lock]*.json/, // package.json
          /packages\\m-[a-z]+\\(?!index.vue)/, // 元件
          /store\\modules\\(?!common.js)/, // vuex
          /views\\system\\(?!components)/,  // views
          /views\\homepage.vue/,  // homepage
          /router.js/ // router.js
        ]
        return exceptList.every(exceptItem => !src.match(exceptItem))
      }
    })
  }
  const outputCode = () => {
    // app.mixin.js
    fs.outputFileSync(path.join(systemPath, '/src/app.mixin.js'), require(path.join(serverPath, '/template/app.mixin.js'))(systemId))
    const { db } = router
    // system
    const system = db.get('systems').find({ id: systemId }).value()
    console.log(system)
    fs.outputFileSync(path.join(systemPath, '/src/views/system/data.js'), `export default ${JSON.stringify(system, null, 2)}`)
    // pages
    const pages = db.get('pages').filter({ systemId }).value()
    fs.outputFileSync(path.join(systemPath, '/src/router.js'), require(path.join(serverPath, '/template/router.js'))(pages))
    pages.forEach(page => {
      const pageId = page.id
      const pagePath = path.join(systemPath, `/src/views/${pageId}`)
      fs.copySync(path.join(frontEndPath, '/src/views/system/preview.vue'), path.join(pagePath, '/index.vue'))
      fs.outputFileSync(path.join(pagePath, '/data.js'), `export default ${JSON.stringify(page.elements, null, 2)}`)
    })
    // package.json
    const packageJson = fs.readJsonSync(path.join(frontEndPath, '/package.json'))
    const exceptPackageList = [
      'dependencies.mousetrap'
    ]
    exceptPackageList.forEach(exceptItem => {
      const keyList = exceptItem.split('.')
      let obj = packageJson
      let keyItem
      while (keyList.length) {
        keyItem = keyList.shift()
        if (keyList.length) {
          obj = obj[keyItem]
        }
      }
      delete obj[keyItem]
    })
    fs.outputJsonSync(path.join(systemPath, '/package.json'), packageJson)
  }
  generateCode()
  res.sendStatus(200)
})

server.post('/proxy', (req, res) => {
  const { db } = router
  const type = 'res'
  const typeItem = db.get('ids').find({ type })
  let { max } = typeItem.value()
  typeItem.update('max', i => ++max).write()
  res.send({ data: `按钮文本${max}` })
})

server.use(router)
server.listen(3000, () => {
  console.log('JSON Server is running')
})
