const express = require('express')
// const fs = require('fs')

// FILE = '/usr/src/app/data/pings.txt'

const app = express()

let counter = 0

app.get('/', (request, response) => {
  counter++
  // fs.writeFileSync(FILE, String(counter))
  return response.json({ 'pong': counter })
})

app.listen(3000, () => {
  console.log('Application listening on port 3000.')
})
