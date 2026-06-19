const express = require('express')

const app = express()

let counter = 0

app.get('/', (request, response) => {
  counter++
  return response.json({ 'pong': counter })
})

app.listen(3000, () => {
  console.log('Application listening on port 3000.')
})
