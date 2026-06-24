const express = require('express')
const cors = require('cors')
const fs = require('fs')
const path = require('path')
const cron = require('node-cron')
const axios = require('axios')
const { randomUUID } = require('crypto')

const PORT = process.env.PORT || 3000

const FILE = path.join('/usr/src/app/images', 'image.jpg')

const app = express()

app.use(express.json())
app.use(
  cors({
    origin: ['http://localhost:8081', 'http://localhost'],
    methods: ['POST', 'GET', 'DELETE', 'PUT', 'PATCH'],
  }),
)

let todos = []

const downloadImage = async () => {
  console.log('Downloading image at', new Date().toISOString())
  try {
    fs.mkdirSync(path.dirname(FILE), { recursive: true })

    const response = await axios.get('https://loremflickr.com/1080/720', {
      responseType: 'stream',
    })

    response.data.pipe(fs.createWriteStream(FILE))

    return new Promise((resolve, reject) => {
      response.data.on('finish', () => {
        console.log(
          'Image downloaded successfully at',
          new Date().toISOString(),
        )
        resolve()
      })
      response.data.on('error', (err) => {
        console.error('Stream error:', err)
        reject(err)
      })
    })
  } catch (err) {
    console.error('Download failed:', err.message)
  }
}

app.get('/api/images', (req, res) => {
  res.sendFile(FILE, (err) => {
    if (err) res.status(404).send('Image not found')
  })
})

app.get('/api/todos', (req, res) => {
  res.json({ todos })
})

app.post('/api/todos', (request, response) => {
  console.log(request.body)
  const { todo } = request.body
  const id = randomUUID()
  todos = todos.concat({ id, todo })
  response.status(201).json({ message: 'Todo Successfully Created!', todos })
})

cron.schedule('*/10 * * * *', async () => {
  try {
    await downloadImage()
  } catch (err) {
    console.error('Cron download failed:', err)
  }
})

app.listen(PORT, async () => {
  console.log(`Server started in port ${PORT}`)
  await downloadImage()
})
