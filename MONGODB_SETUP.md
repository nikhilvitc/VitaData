# MongoDB Setup Instructions

## Environment Variables

Create a `.env` file in the root directory of your project with the following variables:

```env
# Supabase Configuration (if using)
VITE_SUPABASE_URL=your_supabase_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here

# MongoDB Configuration
VITE_MONGODB_URI=mongodb+srv://nikhilkumarofficial770_db_user:cnzbGbVYDfvIckCl@cluster0.x39mzo5.mongodb.net/?appName=Cluster0
VITE_MONGODB_DB_NAME=vitadata
```

## MongoDB Connection Details

- **Cluster**: Cluster0
- **Database Name**: vitadata
- **Connection String**: `mongodb+srv://nikhilkumarofficial770_db_user:cnzbGbVYDfvIckCl@cluster0.x39mzo5.mongodb.net/?appName=Cluster0`

## Usage

The MongoDB client is available in `src/lib/mongoClient.ts`. Here's how to use it:

### Import the client

```typescript
import { getDatabase, getCollection } from './lib/mongoClient';
```

### Get a database instance

```typescript
const db = await getDatabase();
```

### Get a collection

```typescript
// Get a specific collection
const usersCollection = await getCollection('users');

// Insert a document
await usersCollection.insertOne({
  name: 'John Doe',
  email: 'john@example.com',
  createdAt: new Date()
});

// Find documents
const users = await usersCollection.find({}).toArray();

// Find one document
const user = await usersCollection.findOne({ email: 'john@example.com' });

// Update a document
await usersCollection.updateOne(
  { email: 'john@example.com' },
  { $set: { name: 'Jane Doe' } }
);

// Delete a document
await usersCollection.deleteOne({ email: 'john@example.com' });
```

## Collections Schema

Based on your VitaData application, you may want to create these collections:

- `users` - User accounts (patients, doctors, guardians, pharmacies)
- `patients` - Patient health records
- `doctors` - Doctor profiles and specializations
- `guardians` - Guardian/caretaker profiles
- `pharmacies` - Pharmacy information
- `prescriptions` - Prescription records
- `appointments` - Appointment scheduling
- `medications` - Medication tracking
- `health_records` - Patient health records and vitals
- `chat_messages` - Chatbot conversation history

## Next Steps

1. Create a `.env` file with your MongoDB credentials
2. Restart your development server (`npm run dev`)
3. The MongoDB client will automatically connect when you use it
4. Update your components to use MongoDB instead of or alongside Supabase

## Important Notes

- The connection string includes your password. Keep the `.env` file secure and never commit it to version control.
- The `.env` file should be in your `.gitignore` file.
- For production, use environment variables in your hosting platform (Vercel, Netlify, etc.)

