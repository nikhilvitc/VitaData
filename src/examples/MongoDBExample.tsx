import React, { useState, useEffect } from 'react';
import { userApi, patientApi, prescriptionApi } from '../lib/mongoApi';

/**
 * Example component demonstrating MongoDB integration
 * This shows how to use the MongoDB API in React components
 */
const MongoDBExample: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Example: Fetch users from MongoDB
  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // This would need to be implemented as an API endpoint
      // For now, this is a demonstration of how you might structure it
      
      console.log('MongoDB connection ready');
      setLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setLoading(false);
    }
  };

  // Example: Create a new user
  const createUser = async () => {
    try {
      // In a real app, you'd call an API endpoint that uses userApi.create
      console.log('Creating user with MongoDB API');
      
      // Example of what the backend would do:
      // const userId = await userApi.create({
      //   email: 'user@example.com',
      //   name: 'John Doe',
      //   role: 'patient',
      // });
      
    } catch (err) {
      console.error('Error creating user:', err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">MongoDB Integration Example</h2>
      
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <h3 className="font-semibold text-blue-900 mb-2">Important Note:</h3>
        <p className="text-blue-800 text-sm">
          Direct MongoDB access from the browser is not recommended for security reasons.
          You should create API endpoints (serverless functions or a backend server) that
          use the MongoDB API functions from <code>src/lib/mongoApi.ts</code>
        </p>
      </div>

      <div className="space-y-4">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="font-semibold mb-3">API Structure</h3>
          <div className="space-y-2 text-sm">
            <p><code className="bg-gray-100 px-2 py-1 rounded">userApi.create()</code> - Create a new user</p>
            <p><code className="bg-gray-100 px-2 py-1 rounded">userApi.findByEmail()</code> - Find user by email</p>
            <p><code className="bg-gray-100 px-2 py-1 rounded">patientApi.create()</code> - Create patient record</p>
            <p><code className="bg-gray-100 px-2 py-1 rounded">prescriptionApi.findByPatient()</code> - Get prescriptions</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="font-semibold mb-3">Recommended Setup</h3>
          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li>Create API routes (e.g., using Vercel Serverless Functions or Express.js)</li>
            <li>Use the MongoDB API functions in your API routes</li>
            <li>Call these API routes from your React components</li>
            <li>Never expose MongoDB credentials to the frontend</li>
          </ol>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="font-semibold mb-3">Example API Route (Vercel Serverless)</h3>
          <pre className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto text-xs">
{`// api/users.ts
import { userApi } from '../src/lib/mongoApi';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const userId = await userApi.create(req.body);
    res.json({ id: userId });
  } else if (req.method === 'GET') {
    const user = await userApi.findByEmail(req.query.email);
    res.json(user);
  }
}`}
          </pre>
        </div>

        {loading && <p className="text-gray-600">Loading...</p>}
        {error && <p className="text-red-600">Error: {error}</p>}
      </div>
    </div>
  );
};

export default MongoDBExample;

