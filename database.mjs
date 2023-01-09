import { MongoClient } from 'mongodb'

const MONGO_URL = 'mongodb://localhost:27017'

async function connect() {
  const mongoClient = new MongoClient(MONGO_URL)

  try {
    const mongoConnection = await mongoClient.connect()
    console.info('[mongodb] Connected successfully')
    return mongoConnection
  } catch (error) {
    console.error('[mongodb] Error connecting to database')
    console.error(error)
    await mongoClient.close()
  }
}

export const mongoConnection = await connect()
