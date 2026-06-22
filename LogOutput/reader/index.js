const express = require('express')
const fs = require('fs')

const FILE = '/usr/src/app/data/application.log'
const FILE2 = '/usr/src/app/data/pings.txt'

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
  let latestLine = lines[lines.length - 1]
  let pongs = fs.readFileSync(FILE2, 'utf8')
  let timeStamp = new Date().toISOString()
  let returnString = `${timeStamp}: ${latestLine} Pongs:${pongs}`
  return response.json({ returnString })
})

app.listen(3001, () => {
  console.log('Application listening on port 3001.')
})
