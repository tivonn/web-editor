const copyFile = (src, dist) => {
  const fs = require('fs')
  fs.createReadStream(src).pipe(fs.createWriteStream(dist))
}

module.exports = {
  copyFile
}
