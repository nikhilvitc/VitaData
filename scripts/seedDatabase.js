// Script to seed the MongoDB database with dummy data
// Run this with: node scripts/seedDatabase.js

import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: resolve(__dirname, '../.env') });

const MONGODB_URI = process.env.VITE_MONGODB_URI;
const DB_NAME = process.env.VITE_MONGODB_DB_NAME || 'vitadata';

if (!MONGODB_URI) {
  console.error('❌ VITE_MONGODB_URI not found in environment variables');
  console.error('Please create a .env file with your MongoDB connection string');
  process.exit(1);
}

// Seed data
const seedUsers = [
  {
    email: 'admin@vitadata.com',
    name: 'Admin User',
    role: 'admin',
    password: 'admin123',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    email: 'john.doe@patient.com',
    name: 'John Doe',
    role: 'patient',
    password: 'patient123',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    email: 'jane.smith@patient.com',
    name: 'Jane Smith',
    role: 'patient',
    password: 'patient123',
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-20'),
  },
  {
    email: 'dr.wilson@hospital.com',
    name: 'Dr. Sarah Wilson',
    role: 'doctor',
    password: 'doctor123',
    specialization: 'Cardiology',
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-05'),
  },
  {
    email: 'dr.brown@hospital.com',
    name: 'Dr. Michael Brown',
    role: 'doctor',
    password: 'doctor123',
    specialization: 'General Medicine',
    createdAt: new Date('2024-01-06'),
    updatedAt: new Date('2024-01-06'),
  },
  {
    email: 'guardian@family.com',
    name: 'Mary Johnson',
    role: 'guardian',
    password: 'guardian123',
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-10'),
  },
  {
    email: 'pharmacy@medplus.com',
    name: 'MedPlus Pharmacy',
    role: 'pharmacy',
    password: 'pharmacy123',
    address: '123 Main St, City, State 12345',
    phone: '+1-555-0123',
    createdAt: new Date('2024-01-03'),
    updatedAt: new Date('2024-01-03'),
  },
];

const seedPatients = [
  {
    email: 'john.doe@patient.com',
    name: 'John Doe',
    dateOfBirth: new Date('1985-05-15'),
    gender: 'Male',
    bloodType: 'A+',
    allergies: ['Penicillin', 'Peanuts'],
    conditions: ['Hypertension', 'Type 2 Diabetes'],
    phone: '+1-555-1001',
    address: '456 Oak Avenue, Springfield',
    emergencyContact: {
      name: 'Emma Doe',
      relationship: 'Spouse',
      phone: '+1-555-1002',
    },
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    email: 'jane.smith@patient.com',
    name: 'Jane Smith',
    dateOfBirth: new Date('1990-08-22'),
    gender: 'Female',
    bloodType: 'O-',
    allergies: ['Sulfa drugs'],
    conditions: ['Asthma'],
    guardianEmail: 'guardian@family.com',
    phone: '+1-555-1003',
    address: '789 Pine Street, Springfield',
    emergencyContact: {
      name: 'Mary Johnson',
      relationship: 'Mother',
      phone: '+1-555-1004',
    },
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-20'),
  },
];

const seedDoctors = [
  {
    email: 'dr.wilson@hospital.com',
    name: 'Dr. Sarah Wilson',
    specialization: 'Cardiology',
    licenseNumber: 'MD-123456',
    yearsOfExperience: 15,
    hospital: 'Springfield General Hospital',
    phone: '+1-555-2001',
    consultationFee: 150,
    availableDays: ['Monday', 'Wednesday', 'Friday'],
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-05'),
  },
  {
    email: 'dr.brown@hospital.com',
    name: 'Dr. Michael Brown',
    specialization: 'General Medicine',
    licenseNumber: 'MD-789012',
    yearsOfExperience: 10,
    hospital: 'Springfield General Hospital',
    phone: '+1-555-2002',
    consultationFee: 100,
    availableDays: ['Tuesday', 'Thursday', 'Saturday'],
    createdAt: new Date('2024-01-06'),
    updatedAt: new Date('2024-01-06'),
  },
];

const seedPrescriptions = [
  {
    patientEmail: 'john.doe@patient.com',
    doctorEmail: 'dr.wilson@hospital.com',
    medications: [
      {
        name: 'Lisinopril',
        dosage: '10mg',
        frequency: 'Once daily',
        duration: '30 days',
        instructions: 'Take in the morning with water',
      },
      {
        name: 'Metformin',
        dosage: '500mg',
        frequency: 'Twice daily',
        duration: '30 days',
        instructions: 'Take with meals',
      },
    ],
    diagnosis: 'Hypertension and Type 2 Diabetes management',
    notes: 'Monitor blood pressure and blood sugar regularly. Follow up in 4 weeks.',
    prescribedAt: new Date('2024-03-01'),
    expiresAt: new Date('2024-04-01'),
    status: 'active',
    createdAt: new Date('2024-03-01'),
    updatedAt: new Date('2024-03-01'),
  },
  {
    patientEmail: 'jane.smith@patient.com',
    doctorEmail: 'dr.brown@hospital.com',
    medications: [
      {
        name: 'Albuterol Inhaler',
        dosage: '90mcg',
        frequency: 'As needed',
        duration: '90 days',
        instructions: 'Use when experiencing breathing difficulties',
      },
    ],
    diagnosis: 'Asthma control',
    notes: 'Avoid triggers. Keep rescue inhaler accessible.',
    prescribedAt: new Date('2024-02-15'),
    expiresAt: new Date('2024-05-15'),
    status: 'active',
    createdAt: new Date('2024-02-15'),
    updatedAt: new Date('2024-02-15'),
  },
];

const seedAppointments = [
  {
    patientEmail: 'john.doe@patient.com',
    doctorEmail: 'dr.wilson@hospital.com',
    scheduledAt: new Date('2024-04-15T10:00:00'),
    duration: 30,
    type: 'in-person',
    status: 'scheduled',
    reason: 'Regular checkup for hypertension',
    notes: 'Bring recent blood pressure readings',
    createdAt: new Date('2024-03-20'),
    updatedAt: new Date('2024-03-20'),
  },
  {
    patientEmail: 'jane.smith@patient.com',
    doctorEmail: 'dr.brown@hospital.com',
    scheduledAt: new Date('2024-04-10T14:00:00'),
    duration: 20,
    type: 'telemedicine',
    status: 'scheduled',
    reason: 'Asthma follow-up',
    notes: 'Virtual consultation',
    createdAt: new Date('2024-03-15'),
    updatedAt: new Date('2024-03-15'),
  },
  {
    patientEmail: 'john.doe@patient.com',
    doctorEmail: 'dr.wilson@hospital.com',
    scheduledAt: new Date('2024-03-01T09:00:00'),
    duration: 30,
    type: 'in-person',
    status: 'completed',
    reason: 'Initial consultation',
    notes: 'First visit - completed successfully',
    createdAt: new Date('2024-02-20'),
    updatedAt: new Date('2024-03-01'),
  },
];

const seedHealthRecords = [
  {
    patientEmail: 'john.doe@patient.com',
    recordType: 'vitals',
    data: {
      bloodPressure: { systolic: 128, diastolic: 82 },
      heartRate: 72,
      temperature: 98.6,
      weight: 180,
      height: 70,
      oxygenSaturation: 98,
    },
    recordedAt: new Date('2024-03-01T09:30:00'),
    recordedBy: 'dr.wilson@hospital.com',
    createdAt: new Date('2024-03-01'),
    updatedAt: new Date('2024-03-01'),
  },
  {
    patientEmail: 'john.doe@patient.com',
    recordType: 'lab-result',
    data: {
      testName: 'HbA1c',
      result: '6.8%',
      normalRange: '4.0-5.6%',
      status: 'Elevated',
      notes: 'Indicates good diabetes control, continue current treatment',
    },
    recordedAt: new Date('2024-03-01T10:00:00'),
    recordedBy: 'dr.wilson@hospital.com',
    createdAt: new Date('2024-03-01'),
    updatedAt: new Date('2024-03-01'),
  },
  {
    patientEmail: 'jane.smith@patient.com',
    recordType: 'vitals',
    data: {
      bloodPressure: { systolic: 118, diastolic: 76 },
      heartRate: 68,
      temperature: 98.4,
      weight: 135,
      height: 65,
      oxygenSaturation: 99,
    },
    recordedAt: new Date('2024-02-15T14:15:00'),
    recordedBy: 'dr.brown@hospital.com',
    createdAt: new Date('2024-02-15'),
    updatedAt: new Date('2024-02-15'),
  },
];

const seedMedications = [
  {
    name: 'Lisinopril',
    genericName: 'Lisinopril',
    brandNames: ['Prinivil', 'Zestril'],
    category: 'Antihypertensive',
    description: 'ACE inhibitor used to treat high blood pressure',
    commonDosages: ['5mg', '10mg', '20mg', '40mg'],
    sideEffects: ['Dizziness', 'Headache', 'Fatigue', 'Dry cough'],
    contraindications: ['Pregnancy', 'Angioedema history'],
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    name: 'Metformin',
    genericName: 'Metformin',
    brandNames: ['Glucophage', 'Fortamet'],
    category: 'Antidiabetic',
    description: 'Oral diabetes medication that helps control blood sugar',
    commonDosages: ['500mg', '850mg', '1000mg'],
    sideEffects: ['Nausea', 'Diarrhea', 'Stomach upset'],
    contraindications: ['Severe kidney disease', 'Liver disease'],
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    name: 'Albuterol',
    genericName: 'Albuterol',
    brandNames: ['Proventil', 'Ventolin'],
    category: 'Bronchodilator',
    description: 'Inhaler used to treat or prevent bronchospasm',
    commonDosages: ['90mcg/spray'],
    sideEffects: ['Nervousness', 'Shakiness', 'Headache', 'Fast heartbeat'],
    contraindications: ['Heart rhythm disorders'],
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
];

async function seedDatabase() {
  const client = new MongoClient(MONGODB_URI);

  try {
    console.log('🔌 Connecting to MongoDB...');
    await client.connect();
    console.log('✅ Connected to MongoDB');

    const db = client.db(DB_NAME);
    console.log(`📊 Using database: ${DB_NAME}`);

    // Clear existing collections
    console.log('\n🗑️  Clearing existing collections...');
    const collections = ['users', 'patients', 'doctors', 'prescriptions', 'appointments', 'health_records', 'medications'];
    for (const collectionName of collections) {
      await db.collection(collectionName).deleteMany({});
    }
    console.log('✅ Collections cleared');

    // Seed users
    console.log('\n👥 Seeding users...');
    const usersResult = await db.collection('users').insertMany(seedUsers);
    console.log(`✅ Created ${Object.keys(usersResult.insertedIds).length} users`);

    // Create email to ID mapping
    const users = await db.collection('users').find({}).toArray();
    const userEmailToId = new Map();
    users.forEach(user => userEmailToId.set(user.email, user._id));

    // Seed patients
    console.log('\n🏥 Seeding patients...');
    const patientsWithIds = seedPatients.map(patient => ({
      ...patient,
      userId: userEmailToId.get(patient.email),
      guardianId: patient.guardianEmail ? userEmailToId.get(patient.guardianEmail) : null,
    }));
    const patientsResult = await db.collection('patients').insertMany(patientsWithIds);
    console.log(`✅ Created ${Object.keys(patientsResult.insertedIds).length} patients`);

    // Seed doctors
    console.log('\n⚕️  Seeding doctors...');
    const doctorsWithIds = seedDoctors.map(doctor => ({
      ...doctor,
      userId: userEmailToId.get(doctor.email),
    }));
    const doctorsResult = await db.collection('doctors').insertMany(doctorsWithIds);
    console.log(`✅ Created ${Object.keys(doctorsResult.insertedIds).length} doctors`);

    // Get patient and doctor IDs
    const patients = await db.collection('patients').find({}).toArray();
    const doctors = await db.collection('doctors').find({}).toArray();

    const patientEmailToId = new Map();
    patients.forEach(patient => patientEmailToId.set(patient.email, patient._id));

    const doctorEmailToId = new Map();
    doctors.forEach(doctor => doctorEmailToId.set(doctor.email, doctor._id));

    // Seed prescriptions
    console.log('\n💊 Seeding prescriptions...');
    const prescriptionsWithIds = seedPrescriptions.map(prescription => ({
      ...prescription,
      patientId: patientEmailToId.get(prescription.patientEmail),
      doctorId: doctorEmailToId.get(prescription.doctorEmail),
    }));
    const prescriptionsResult = await db.collection('prescriptions').insertMany(prescriptionsWithIds);
    console.log(`✅ Created ${Object.keys(prescriptionsResult.insertedIds).length} prescriptions`);

    // Seed appointments
    console.log('\n📅 Seeding appointments...');
    const appointmentsWithIds = seedAppointments.map(appointment => ({
      ...appointment,
      patientId: patientEmailToId.get(appointment.patientEmail),
      doctorId: doctorEmailToId.get(appointment.doctorEmail),
    }));
    const appointmentsResult = await db.collection('appointments').insertMany(appointmentsWithIds);
    console.log(`✅ Created ${Object.keys(appointmentsResult.insertedIds).length} appointments`);

    // Seed health records
    console.log('\n📋 Seeding health records...');
    const healthRecordsWithIds = seedHealthRecords.map(record => ({
      ...record,
      patientId: patientEmailToId.get(record.patientEmail),
      recordedBy: userEmailToId.get(record.recordedBy),
    }));
    const healthRecordsResult = await db.collection('health_records').insertMany(healthRecordsWithIds);
    console.log(`✅ Created ${Object.keys(healthRecordsResult.insertedIds).length} health records`);

    // Seed medications
    console.log('\n💉 Seeding medications...');
    const medicationsResult = await db.collection('medications').insertMany(seedMedications);
    console.log(`✅ Created ${Object.keys(medicationsResult.insertedIds).length} medications`);

    console.log('\n\n🎉 Database seeding completed successfully!');
    console.log('\n📊 Summary:');
    console.log(`   Users: ${Object.keys(usersResult.insertedIds).length}`);
    console.log(`   Patients: ${Object.keys(patientsResult.insertedIds).length}`);
    console.log(`   Doctors: ${Object.keys(doctorsResult.insertedIds).length}`);
    console.log(`   Prescriptions: ${Object.keys(prescriptionsResult.insertedIds).length}`);
    console.log(`   Appointments: ${Object.keys(appointmentsResult.insertedIds).length}`);
    console.log(`   Health Records: ${Object.keys(healthRecordsResult.insertedIds).length}`);
    console.log(`   Medications: ${Object.keys(medicationsResult.insertedIds).length}`);

    console.log('\n👤 Test Users Created:');
    console.log('   Admin: admin@vitadata.com / admin123');
    console.log('   Patient 1: john.doe@patient.com / patient123');
    console.log('   Patient 2: jane.smith@patient.com / patient123');
    console.log('   Doctor 1: dr.wilson@hospital.com / doctor123');
    console.log('   Doctor 2: dr.brown@hospital.com / doctor123');
    console.log('   Guardian: guardian@family.com / guardian123');
    console.log('   Pharmacy: pharmacy@medplus.com / pharmacy123');

  } catch (error) {
    console.error('\n❌ Error seeding database:', error);
    process.exit(1);
  } finally {
    await client.close();
    console.log('\n👋 Disconnected from MongoDB');
  }
}

// Run the seed function
seedDatabase();

