const express = require('express')
const fs = require('fs')

const FILE = '/usr/src/app/data/application.log'

let lines = []
let lastSize = 0

fs.watch(FILE, () => {
  const { size } = fs.statSync(FILE)

  if (size > lastSize) {
    const buffer = Buffer.alloc(size - lastSize)
    const fd = fs.openSync(FILE, 'r')

    fs.readSync(fd, buffer, 0, buffer.length, lastSize)
    fs.closeSync(fd)

    lastSize = size

    const newLines = buffer.toString('utf8').split('\n').filter(Boolean)
    lines = [...lines, ...newLines]
  }
})

const app = express()

app.get('/', (request, response) => {
  return response.json({ lines })
})

app.listen(3001, () => {
  console.log('Application listening on port 3001.')
})
