const express = require('express')
const fs = require('fs')
const path = require('path')
const cron = require('node-cron')
const axios = require('axios')

const PORT = process.env.PORT || 3000

const FILE = path.join('/usr/src/app/images', 'image.jpg')

const app = express()

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

app.get('/', (req, res) => {
  res.sendFile(FILE, (err) => {
    if (err) res.status(404).send('Image not found')
  })
})

app.use('/images', (request, response) => {
  return response.sendFile(FILE)
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
  setInterval(downloadImage, 600000)
})
