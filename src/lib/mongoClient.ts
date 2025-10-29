import { MongoClient, Db } from 'mongodb';

// MongoDB connection string from environment variables
const MONGODB_URI = import.meta.env.VITE_MONGODB_URI as string;
const DB_NAME = import.meta.env.VITE_MONGODB_DB_NAME || 'vitadata';

if (!MONGODB_URI) {
  console.warn('MongoDB URI not found in env. Set VITE_MONGODB_URI in your .env file');
}

let client: MongoClient | null = null;
let clientPromise: Promise<MongoClient> | null = null;

// Create a singleton MongoDB client
function getMongoClient(): Promise<MongoClient> {
  if (clientPromise) {
    return clientPromise;
  }

  if (!MONGODB_URI) {
    throw new Error('Please define VITE_MONGODB_URI environment variable');
  }

  client = new MongoClient(MONGODB_URI);
  clientPromise = client.connect();

  return clientPromise;
}

// Get database instance
export async function getDatabase(): Promise<Db> {
  const client = await getMongoClient();
  return client.db(DB_NAME);
}

// Helper function to get a collection
export async function getCollection<T = any>(collectionName: string) {
  const db = await getDatabase();
  return db.collection<T>(collectionName);
}

// Export the client getter for direct access if needed
export { getMongoClient };

export default {
  getDatabase,
  getCollection,
  getClient: getMongoClient,
};

