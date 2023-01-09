import express from 'express'

import { mongoConnection } from './database.mjs'
import { characterValidation } from './character-validation.mjs'

const app = express()

app.use(express.json())

app
  .route('/characters')
  .get(async (_request, response) => {
    const collection = mongoConnection.collection('characters')

    const characters = await collection.find().toArray()

    response.status(200).json({ characters })
  })
  .post(async (request, response) => {
    const { real_name, nickname, description } = request.body
    const characterData = { real_name, nickname, description }

    const valid = characterValidation(characterData)

    if (!valid) {
      return response.status(400).json({ error: characterValidation.errors })
    }

    const collection = mongoConnection.collection('characters')
    const { insertedId, acknowledged } = await collection.insertOne(characterData)

    if (!acknowledged) {
      return response.status(500).json({ error: 'Internal server error' })
    }

    response.status(201).json({ character: insertedId })
  })

app.listen(3000, () => {
  console.info('[server] Running at port 3000')
})
