const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()
const tools = require('./tools')

server.use(middlewares)

server.put('/build/:pid', (req, res) => {
  const path = require('path')
  const cwdPath = process.cwd()
  const frontEndPath = path.join(cwdPath, '../frontend')
  const fromPath = path.join(frontEndPath, '/src/components/RenderElement.vue')
  const toPath = path.join(cwdPath, '/codes/1/render.vue')
  tools.copyFile(fromPath, toPath)
  res.send('success', 500)
})

server.use(router)
server.listen(3000, () => {
  console.log('JSON Server is running')
})
