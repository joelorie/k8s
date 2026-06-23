const express = require('express')
// const path = require('path')
// const fs = require('fs/promises')

// const DATA_DIR = '/usr/src/app/data'
// const logFilePath = path.join(DATA_DIR, 'application.log')

const app = express()

let currentString = ''

const PORT = 3000

app.listen(PORT, () => {
  console.log(`Application running on port ${PORT}`)
  generateRandomString()
})

app.get('/', (request, response) => {
  return response.json({ currentString })
})

const generateRandomString = async () => {
  setInterval(async () => {
    let randomString = crypto.randomUUID()
    let timeStamp = new Date().toISOString()
    console.log(timeStamp + ': ' + randomString)
    currentString = timeStamp + ': ' + randomString
    // await fs.appendFile(logFilePath, randomString.concat('\n'), 'utf-8')
  }, 5000)
}
