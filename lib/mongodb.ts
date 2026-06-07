import { MongoClient, Db } from 'mongodb'

const uri = process.env.MONGODB_URI!

let clientPromise: Promise<MongoClient>

if (process.env.NODE_ENV === 'development') {
  if (!(global as any)._mongoClientPromise) {
    ;(global as any)._mongoClientPromise = new MongoClient(uri).connect()
  }
  clientPromise = (global as any)._mongoClientPromise
} else {
  clientPromise = new MongoClient(uri).connect()
}

export async function getDb(): Promise<Db> {
  const client = await clientPromise
  return client.db()
}
