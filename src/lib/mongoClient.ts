// MongoDB client - Browser-safe with lazy loading
// Note: MongoDB driver requires Node.js and cannot run in browsers
// This will always fail in browser and should fallback to mock data

const isBrowser = typeof window !== 'undefined';
let MongoClient: any = null;
let Db: any = null;

// Lazy load MongoDB only if not in browser
async function loadMongoDB() {
  if (isBrowser) {
    throw new Error('MongoDB cannot be used in browser. Use API endpoints or mock data.');
  }
  
  if (!MongoClient) {
    try {
      const mongodb = await import('mongodb');
      MongoClient = mongodb.MongoClient;
      Db = mongodb.Db;
    } catch (error) {
      throw new Error('MongoDB package not available. Use mock data instead.');
    }
  }
}

// MongoDB connection string from environment variables
const MONGODB_URI = (import.meta as any).env.VITE_MONGODB_URI as string;
const DB_NAME = (import.meta as any).env.VITE_MONGODB_DB_NAME || 'vitadata';

let client: any = null;
let clientPromise: Promise<any> | null = null;

// Create a singleton MongoDB client
async function getMongoClient(): Promise<any> {
  if (isBrowser) {
    throw new Error('MongoDB cannot be used in browser environment');
  }

  await loadMongoDB();

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
export async function getDatabase(): Promise<any> {
  if (isBrowser) {
    throw new Error('MongoDB cannot be used in browser environment');
  }
  
  await loadMongoDB();
  const client = await getMongoClient();
  return client.db(DB_NAME);
}

// Helper function to get a collection
export async function getCollection<T = any>(collectionName: string): Promise<any> {
  if (isBrowser) {
    throw new Error('MongoDB cannot be used in browser environment');
  }
  
  const db = await getDatabase();
  return db.collection(collectionName);
}

// Export the client getter for direct access if needed
export { getMongoClient };

export default {
  getDatabase,
  getCollection,
  getClient: getMongoClient,
};

