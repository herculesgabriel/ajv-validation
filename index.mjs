import express from 'express'

import { mongoConnection } from './database.mjs'

const app = express()

app.get('/characters', async (_request, response) => {
  const db = mongoConnection.db('CHALLENGE')
  const collection = db.collection('characters')

  const characters = await collection.find().toArray()

  response.status(200).json({ characters })
})

app.listen(3000, () => {
  console.info('[server] Running at port 3000')
})
