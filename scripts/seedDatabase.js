// Script to seed the MongoDB database with dummy data using Indian names
// Run this with: npm run seed

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

// Indian names and data for seed
const seedUsers = [
  // Admin
  {
    uid: 'admin-001',
    email: 'admin@vitadata.in',
    role: 'admin',
    isActive: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  // Patients
  {
    uid: 'patient-001',
    email: 'ramesh.kumar@example.com',
    role: 'patient',
    isActive: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    uid: 'patient-002',
    email: 'priya.sharma@example.com',
    role: 'patient',
    isActive: true,
    createdAt: new Date('2024-01-16'),
    updatedAt: new Date('2024-01-16'),
  },
  {
    uid: 'patient-003',
    email: 'arjun.patel@example.com',
    role: 'patient',
    isActive: true,
    createdAt: new Date('2024-01-17'),
    updatedAt: new Date('2024-01-17'),
  },
  {
    uid: 'patient-004',
    email: 'kavita.singh@example.com',
    role: 'patient',
    isActive: true,
    createdAt: new Date('2024-01-18'),
    updatedAt: new Date('2024-01-18'),
  },
  {
    uid: 'patient-005',
    email: 'vijay.reddy@example.com',
    role: 'patient',
    isActive: true,
    createdAt: new Date('2024-01-19'),
    updatedAt: new Date('2024-01-19'),
  },
  // Doctors
  {
    uid: 'doctor-001',
    email: 'dr.ananya.rao@hospital.com',
    role: 'doctor',
    isActive: true,
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-05'),
  },
  {
    uid: 'doctor-002',
    email: 'dr.rajesh.verma@hospital.com',
    role: 'doctor',
    isActive: true,
    createdAt: new Date('2024-01-06'),
    updatedAt: new Date('2024-01-06'),
  },
  {
    uid: 'doctor-003',
    email: 'dr.meera.iyer@hospital.com',
    role: 'doctor',
    isActive: true,
    createdAt: new Date('2024-01-07'),
    updatedAt: new Date('2024-01-07'),
  },
  {
    uid: 'doctor-004',
    email: 'dr.aditya.gupta@hospital.com',
    role: 'doctor',
    isActive: true,
    createdAt: new Date('2024-01-08'),
    updatedAt: new Date('2024-01-08'),
  },
  // Guardians
  {
    uid: 'guardian-001',
    email: 'neha.sharma@example.com',
    role: 'guardian',
    isActive: true,
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-10'),
  },
  {
    uid: 'guardian-002',
    email: 'suresh.patel@example.com',
    role: 'guardian',
    isActive: true,
    createdAt: new Date('2024-01-11'),
    updatedAt: new Date('2024-01-11'),
  },
  // Pharmacies
  {
    uid: 'pharmacy-001',
    email: 'apollo.pharmacy@example.com',
    role: 'pharmacy',
    isActive: true,
    createdAt: new Date('2024-01-03'),
    updatedAt: new Date('2024-01-03'),
  },
  {
    uid: 'pharmacy-002',
    email: 'chemist.wellness@example.com',
    role: 'pharmacy',
    isActive: true,
    createdAt: new Date('2024-01-04'),
    updatedAt: new Date('2024-01-04'),
  },
  {
    uid: 'pharmacy-003',
    email: 'medplus.pharmacy@example.com',
    role: 'pharmacy',
    isActive: true,
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-05'),
  },
];

const seedPatients = [
  {
    email: 'ramesh.kumar@example.com',
    healthId: 'P-2024-001',
    name: 'Ramesh Kumar',
    dateOfBirth: new Date('1966-03-15'),
    gender: 'male',
    phone: '+91-9876543210',
    address: {
      street: '15, MG Road',
      city: 'Bangalore',
      state: 'Karnataka',
      zipCode: '560001',
      country: 'India',
    },
    emergencyContact: {
      name: 'Lakshmi Kumar',
      relationship: 'Spouse',
      phone: '+91-9876543211',
    },
    vitals: {
      bp: '138/88',
      sugar: 142,
      temp: 98.6,
      weight: 78,
      height: 170,
    },
    medicalHistory: ['Hypertension', 'Type 2 Diabetes'],
    allergies: ['Penicillin'],
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    email: 'priya.sharma@example.com',
    healthId: 'P-2024-002',
    name: 'Priya Sharma',
    dateOfBirth: new Date('1992-07-22'),
    gender: 'female',
    phone: '+91-9876543220',
    address: {
      street: '42, Residency Road',
      city: 'Bangalore',
      state: 'Karnataka',
      zipCode: '560025',
      country: 'India',
    },
    emergencyContact: {
      name: 'Neha Sharma',
      relationship: 'Sister',
      phone: '+91-9876543221',
    },
    vitals: {
      bp: '118/76',
      sugar: 98,
      temp: 98.4,
      weight: 58,
      height: 162,
    },
    medicalHistory: ['Asthma'],
    allergies: ['Dust', 'Pollen'],
    createdAt: new Date('2024-01-16'),
    updatedAt: new Date('2024-01-16'),
  },
  {
    email: 'arjun.patel@example.com',
    healthId: 'P-2024-003',
    name: 'Arjun Patel',
    dateOfBirth: new Date('1988-11-10'),
    gender: 'male',
    phone: '+91-9876543230',
    address: {
      street: '78, Koramangala 7th Block',
      city: 'Bangalore',
      state: 'Karnataka',
      zipCode: '560095',
      country: 'India',
    },
    emergencyContact: {
      name: 'Suresh Patel',
      relationship: 'Father',
      phone: '+91-9876543231',
    },
    vitals: {
      bp: '125/82',
      sugar: 110,
      temp: 98.7,
      weight: 72,
      height: 175,
    },
    medicalHistory: ['Hypertension'],
    allergies: [],
    createdAt: new Date('2024-01-17'),
    updatedAt: new Date('2024-01-17'),
  },
  {
    email: 'kavita.singh@example.com',
    healthId: 'P-2024-004',
    name: 'Kavita Singh',
    dateOfBirth: new Date('1975-05-18'),
    gender: 'female',
    phone: '+91-9876543240',
    address: {
      street: '23, Indiranagar',
      city: 'Bangalore',
      state: 'Karnataka',
      zipCode: '560038',
      country: 'India',
    },
    emergencyContact: {
      name: 'Rajesh Singh',
      relationship: 'Husband',
      phone: '+91-9876543241',
    },
    vitals: {
      bp: '132/85',
      sugar: 135,
      temp: 98.5,
      weight: 68,
      height: 158,
    },
    medicalHistory: ['Type 2 Diabetes', 'Arthritis'],
    allergies: ['Sulfa drugs'],
    createdAt: new Date('2024-01-18'),
    updatedAt: new Date('2024-01-18'),
  },
  {
    email: 'vijay.reddy@example.com',
    healthId: 'P-2024-005',
    name: 'Vijay Reddy',
    dateOfBirth: new Date('1990-09-25'),
    gender: 'male',
    phone: '+91-9876543250',
    address: {
      street: '56, Whitefield',
      city: 'Bangalore',
      state: 'Karnataka',
      zipCode: '560066',
      country: 'India',
    },
    emergencyContact: {
      name: 'Deepika Reddy',
      relationship: 'Wife',
      phone: '+91-9876543251',
    },
    vitals: {
      bp: '120/78',
      sugar: 95,
      temp: 98.3,
      weight: 75,
      height: 178,
    },
    medicalHistory: [],
    allergies: ['Nuts'],
    createdAt: new Date('2024-01-19'),
    updatedAt: new Date('2024-01-19'),
  },
];

const seedDoctors = [
  {
    email: 'dr.ananya.rao@hospital.com',
    name: 'Dr. Ananya Rao',
    specialization: 'Cardiology',
    licenseNumber: 'MCI-KA-12345',
    qualification: 'MBBS, MD (Cardiology)',
    experience: 15,
    hospital: 'Apollo Hospital, Bangalore',
    phone: '+91-80-26204567',
    email: 'dr.ananya.rao@hospital.com',
    consultationFee: 1500,
    availableDays: ['Monday', 'Wednesday', 'Friday'],
    workingHours: {
      start: '09:00',
      end: '17:00',
    },
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-05'),
  },
  {
    email: 'dr.rajesh.verma@hospital.com',
    name: 'Dr. Rajesh Verma',
    specialization: 'General Medicine',
    licenseNumber: 'MCI-KA-12346',
    qualification: 'MBBS, MD (General Medicine)',
    experience: 12,
    hospital: 'Fortis Hospital, Bangalore',
    phone: '+91-80-26401999',
    email: 'dr.rajesh.verma@hospital.com',
    consultationFee: 800,
    availableDays: ['Tuesday', 'Thursday', 'Saturday'],
    workingHours: {
      start: '10:00',
      end: '18:00',
    },
    createdAt: new Date('2024-01-06'),
    updatedAt: new Date('2024-01-06'),
  },
  {
    email: 'dr.meera.iyer@hospital.com',
    name: 'Dr. Meera Iyer',
    specialization: 'Pediatrics',
    licenseNumber: 'MCI-KA-12347',
    qualification: 'MBBS, MD (Pediatrics)',
    experience: 10,
    hospital: 'Narayana Health, Bangalore',
    phone: '+91-80-27835000',
    email: 'dr.meera.iyer@hospital.com',
    consultationFee: 1000,
    availableDays: ['Monday', 'Wednesday', 'Friday', 'Saturday'],
    workingHours: {
      start: '09:30',
      end: '16:30',
    },
    createdAt: new Date('2024-01-07'),
    updatedAt: new Date('2024-01-07'),
  },
  {
    email: 'dr.aditya.gupta@hospital.com',
    name: 'Dr. Aditya Gupta',
    specialization: 'Orthopedics',
    licenseNumber: 'MCI-KA-12348',
    qualification: 'MBBS, MS (Orthopedics)',
    experience: 18,
    hospital: 'Manipal Hospital, Bangalore',
    phone: '+91-80-25024444',
    email: 'dr.aditya.gupta@hospital.com',
    consultationFee: 1200,
    availableDays: ['Monday', 'Tuesday', 'Thursday', 'Friday'],
    workingHours: {
      start: '09:00',
      end: '17:30',
    },
    createdAt: new Date('2024-01-08'),
    updatedAt: new Date('2024-01-08'),
  },
];

const seedGuardians = [
  {
    email: 'neha.sharma@example.com',
    name: 'Neha Sharma',
    phone: '+91-9876543221',
    email: 'neha.sharma@example.com',
    relationship: 'Sister',
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-10'),
  },
  {
    email: 'suresh.patel@example.com',
    name: 'Suresh Patel',
    phone: '+91-9876543231',
    email: 'suresh.patel@example.com',
    relationship: 'Father',
    createdAt: new Date('2024-01-11'),
    updatedAt: new Date('2024-01-11'),
  },
];

const seedPharmacies = [
  {
    email: 'apollo.pharmacy@example.com',
    name: 'Apollo Pharmacy',
    licenseNumber: 'PH-KA-001',
    phone: '+91-80-26304567',
    email: 'apollo.pharmacy@example.com',
    address: {
      street: 'MG Road, Near Metro Station',
      city: 'Bangalore',
      state: 'Karnataka',
      zipCode: '560001',
      country: 'India',
    },
    workingHours: {
      start: '08:00',
      end: '22:00',
    },
    deliveryAvailable: true,
    createdAt: new Date('2024-01-03'),
    updatedAt: new Date('2024-01-03'),
  },
  {
    email: 'chemist.wellness@example.com',
    name: 'Chemist & Wellness',
    licenseNumber: 'PH-KA-002',
    phone: '+91-80-26674567',
    email: 'chemist.wellness@example.com',
    address: {
      street: 'Koramangala 7th Block',
      city: 'Bangalore',
      state: 'Karnataka',
      zipCode: '560095',
      country: 'India',
    },
    workingHours: {
      start: '09:00',
      end: '21:00',
    },
    deliveryAvailable: true,
    createdAt: new Date('2024-01-04'),
    updatedAt: new Date('2024-01-04'),
  },
  {
    email: 'medplus.pharmacy@example.com',
    name: 'MedPlus Pharmacy',
    licenseNumber: 'PH-KA-003',
    phone: '+91-80-41234567',
    email: 'medplus.pharmacy@example.com',
    address: {
      street: 'Indiranagar 100 Feet Road',
      city: 'Bangalore',
      state: 'Karnataka',
      zipCode: '560038',
      country: 'India',
    },
    workingHours: {
      start: '08:00',
      end: '23:00',
    },
    deliveryAvailable: true,
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-05'),
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
    const collections = [
      'users',
      'patients',
      'doctors',
      'guardians',
      'pharmacies',
      'appointments',
      'prescriptions',
      'orders',
      'vitals_history',
      'notifications',
      'lab_reports',
    ];
    for (const collectionName of collections) {
      await db.collection(collectionName).deleteMany({});
    }
    console.log('✅ Collections cleared');

    // Seed users
    console.log('\n👥 Seeding users...');
    const usersResult = await db.collection('users').insertMany(seedUsers);
    console.log(`✅ Created ${usersResult.insertedCount} users`);

    // Create email to ID mapping
    const users = await db.collection('users').find({}).toArray();
    const userEmailToId = new Map();
    users.forEach((user) => userEmailToId.set(user.email, user._id));

    // Seed patients
    console.log('\n🏥 Seeding patients...');
    const patientsWithIds = seedPatients.map((patient) => ({
      ...patient,
      userId: userEmailToId.get(patient.email),
    }));
    const patientsResult = await db.collection('patients').insertMany(patientsWithIds);
    console.log(`✅ Created ${patientsResult.insertedCount} patients`);

    // Seed doctors
    console.log('\n⚕️  Seeding doctors...');
    const doctorsWithIds = seedDoctors.map((doctor) => ({
      ...doctor,
      userId: userEmailToId.get(doctor.email),
    }));
    const doctorsResult = await db.collection('doctors').insertMany(doctorsWithIds);
    console.log(`✅ Created ${doctorsResult.insertedCount} doctors`);

    // Seed guardians
    console.log('\n👨‍👩‍👧 Seeding guardians...');
    const guardiansWithIds = seedGuardians.map((guardian) => ({
      ...guardian,
      userId: userEmailToId.get(guardian.email),
      linkedPatients: [],
    }));
    const guardiansResult = await db.collection('guardians').insertMany(guardiansWithIds);
    console.log(`✅ Created ${guardiansResult.insertedCount} guardians`);

    // Link guardians to patients
    const patients = await db.collection('patients').find({}).toArray();
    const patientEmailToId = new Map();
    patients.forEach((patient) => patientEmailToId.set(patient.email, patient._id));

    await db.collection('guardians').updateOne(
      { email: 'neha.sharma@example.com' },
      {
        $set: {
          linkedPatients: [patientEmailToId.get('priya.sharma@example.com')],
        },
      }
    );

    await db.collection('guardians').updateOne(
      { email: 'suresh.patel@example.com' },
      {
        $set: {
          linkedPatients: [patientEmailToId.get('arjun.patel@example.com')],
        },
      }
    );

    // Seed pharmacies
    console.log('\n💊 Seeding pharmacies...');
    const pharmaciesWithIds = seedPharmacies.map((pharmacy) => ({
      ...pharmacy,
      userId: userEmailToId.get(pharmacy.email),
    }));
    const pharmaciesResult = await db.collection('pharmacies').insertMany(pharmaciesWithIds);
    console.log(`✅ Created ${pharmaciesResult.insertedCount} pharmacies`);

    // Get IDs for relationships
    const doctors = await db.collection('doctors').find({}).toArray();
    const doctorEmailToId = new Map();
    doctors.forEach((doctor) => doctorEmailToId.set(doctor.email, doctor._id));

    const pharmacies = await db.collection('pharmacies').find({}).toArray();
    const pharmacyEmailToId = new Map();
    pharmacies.forEach((pharmacy) => pharmacyEmailToId.set(pharmacy.email, pharmacy._id));

    // Seed appointments
    console.log('\n📅 Seeding appointments...');
    const appointments = [
      {
        patientId: patientEmailToId.get('ramesh.kumar@example.com'),
        doctorId: doctorEmailToId.get('dr.ananya.rao@hospital.com'),
        datetime: new Date('2024-03-15T10:00:00'),
        status: 'confirmed',
        type: 'in-person',
        symptoms: 'Chest pain and shortness of breath',
        notes: 'Regular follow-up for hypertension',
        createdAt: new Date('2024-03-10'),
        updatedAt: new Date('2024-03-10'),
      },
      {
        patientId: patientEmailToId.get('priya.sharma@example.com'),
        doctorId: doctorEmailToId.get('dr.rajesh.verma@hospital.com'),
        datetime: new Date('2024-03-20T14:00:00'),
        status: 'pending',
        type: 'video',
        symptoms: 'Asthma symptoms worsening',
        notes: 'Telemedicine consultation',
        createdAt: new Date('2024-03-12'),
        updatedAt: new Date('2024-03-12'),
      },
      {
        patientId: patientEmailToId.get('arjun.patel@example.com'),
        doctorId: doctorEmailToId.get('dr.aditya.gupta@hospital.com'),
        datetime: new Date('2024-03-18T11:00:00'),
        status: 'confirmed',
        type: 'in-person',
        symptoms: 'Knee pain',
        notes: 'Sports injury follow-up',
        createdAt: new Date('2024-03-13'),
        updatedAt: new Date('2024-03-13'),
      },
      {
        patientId: patientEmailToId.get('kavita.singh@example.com'),
        doctorId: doctorEmailToId.get('dr.rajesh.verma@hospital.com'),
        datetime: new Date('2024-03-22T09:30:00'),
        status: 'pending',
        type: 'in-person',
        symptoms: 'Diabetes management',
        notes: 'Regular checkup',
        createdAt: new Date('2024-03-14'),
        updatedAt: new Date('2024-03-14'),
      },
      {
        patientId: patientEmailToId.get('vijay.reddy@example.com'),
        doctorId: doctorEmailToId.get('dr.meera.iyer@hospital.com'),
        datetime: new Date('2024-03-25T15:00:00'),
        status: 'confirmed',
        type: 'video',
        symptoms: 'General health checkup',
        notes: 'Annual health screening',
        createdAt: new Date('2024-03-15'),
        updatedAt: new Date('2024-03-15'),
      },
      {
        patientId: patientEmailToId.get('ramesh.kumar@example.com'),
        doctorId: doctorEmailToId.get('dr.ananya.rao@hospital.com'),
        datetime: new Date('2024-03-01T09:00:00'),
        status: 'completed',
        type: 'in-person',
        symptoms: 'Hypertension follow-up',
        notes: 'Patient responded well to medication',
        createdAt: new Date('2024-02-25'),
        updatedAt: new Date('2024-03-01'),
      },
    ];
    const appointmentsResult = await db.collection('appointments').insertMany(appointments);
    console.log(`✅ Created ${appointmentsResult.insertedCount} appointments`);

    // Get appointment IDs - the last one is the completed appointment for Ramesh Kumar
    const appointmentIds = Object.values(appointmentsResult.insertedIds);
    const completedAppointmentId = appointmentIds[appointmentIds.length - 1]; // Last appointment is the completed one

    // Seed prescriptions
    console.log('\n💊 Seeding prescriptions...');
    const prescriptions = [
      {
        patientId: patientEmailToId.get('ramesh.kumar@example.com'),
        doctorId: doctorEmailToId.get('dr.ananya.rao@hospital.com'),
        appointmentId: completedAppointmentId,
        title: 'Hypertension and Diabetes Management',
        diagnosis: 'Hypertension and Type 2 Diabetes',
        medicines: [
          {
            name: 'Amlodipine',
            dosage: '5mg',
            frequency: 'Once daily',
            duration: '30 days',
            timing: ['morning'],
            adherence: 95,
          },
          {
            name: 'Metformin',
            dosage: '500mg',
            frequency: 'Twice daily',
            duration: '30 days',
            timing: ['morning', 'evening'],
            adherence: 92,
          },
          {
            name: 'Glimepiride',
            dosage: '2mg',
            frequency: 'Once daily',
            duration: '30 days',
            timing: ['morning'],
            adherence: 90,
          },
        ],
        instructions: 'Take medicines after meals. Monitor blood pressure and blood sugar regularly.',
        issuedOn: new Date('2024-03-01'),
        validUntil: new Date('2024-04-01'),
        status: 'active',
        createdAt: new Date('2024-03-01'),
        updatedAt: new Date('2024-03-01'),
      },
      {
        patientId: patientEmailToId.get('priya.sharma@example.com'),
        doctorId: doctorEmailToId.get('dr.rajesh.verma@hospital.com'),
        title: 'Asthma Management',
        diagnosis: 'Bronchial Asthma',
        medicines: [
          {
            name: 'Salbutamol Inhaler',
            dosage: '100mcg',
            frequency: 'As needed',
            duration: '90 days',
            timing: ['as_needed'],
            adherence: 88,
          },
          {
            name: 'Montelukast',
            dosage: '10mg',
            frequency: 'Once daily',
            duration: '30 days',
            timing: ['evening'],
            adherence: 85,
          },
        ],
        instructions: 'Use inhaler during asthma attacks. Take Montelukast every evening.',
        issuedOn: new Date('2024-02-15'),
        validUntil: new Date('2024-05-15'),
        status: 'active',
        createdAt: new Date('2024-02-15'),
        updatedAt: new Date('2024-02-15'),
      },
      {
        patientId: patientEmailToId.get('kavita.singh@example.com'),
        doctorId: doctorEmailToId.get('dr.rajesh.verma@hospital.com'),
        title: 'Diabetes and Arthritis Treatment',
        diagnosis: 'Type 2 Diabetes with Rheumatoid Arthritis',
        medicines: [
          {
            name: 'Metformin',
            dosage: '850mg',
            frequency: 'Twice daily',
            duration: '30 days',
            timing: ['morning', 'evening'],
            adherence: 93,
          },
          {
            name: 'Methotrexate',
            dosage: '10mg',
            frequency: 'Once weekly',
            duration: '60 days',
            timing: ['weekly'],
            adherence: 87,
          },
        ],
        instructions: 'Take Metformin with meals. Methotrexate once a week on Sundays.',
        issuedOn: new Date('2024-02-20'),
        validUntil: new Date('2024-04-20'),
        status: 'active',
        createdAt: new Date('2024-02-20'),
        updatedAt: new Date('2024-02-20'),
      },
    ];
    const prescriptionsResult = await db.collection('prescriptions').insertMany(prescriptions);
    console.log(`✅ Created ${prescriptionsResult.insertedCount} prescriptions`);

    // Seed orders
    console.log('\n📦 Seeding orders...');
    const prescriptionsList = await db.collection('prescriptions').find({}).toArray();
    const orders = [
      {
        prescriptionId: prescriptionsList[0]._id,
        patientId: prescriptionsList[0].patientId,
        pharmacyId: pharmacyEmailToId.get('apollo.pharmacy@example.com'),
        status: 'delivered',
        orderDate: new Date('2024-03-02'),
        deliveryDate: new Date('2024-03-03'),
        deliveryAddress: {
          street: '15, MG Road',
          city: 'Bangalore',
          state: 'Karnataka',
          zipCode: '560001',
          country: 'India',
        },
        totalAmount: 1250,
        paymentStatus: 'paid',
        trackingId: 'ORD-2024-001',
        createdAt: new Date('2024-03-02'),
        updatedAt: new Date('2024-03-03'),
      },
      {
        prescriptionId: prescriptionsList[1]._id,
        patientId: prescriptionsList[1].patientId,
        pharmacyId: pharmacyEmailToId.get('chemist.wellness@example.com'),
        status: 'in_progress',
        orderDate: new Date('2024-03-10'),
        deliveryAddress: {
          street: '42, Residency Road',
          city: 'Bangalore',
          state: 'Karnataka',
          zipCode: '560025',
          country: 'India',
        },
        totalAmount: 850,
        paymentStatus: 'paid',
        trackingId: 'ORD-2024-002',
        createdAt: new Date('2024-03-10'),
        updatedAt: new Date('2024-03-10'),
      },
      {
        prescriptionId: prescriptionsList[2]._id,
        patientId: prescriptionsList[2].patientId,
        pharmacyId: pharmacyEmailToId.get('medplus.pharmacy@example.com'),
        status: 'pending',
        orderDate: new Date('2024-03-12'),
        deliveryAddress: {
          street: '23, Indiranagar',
          city: 'Bangalore',
          state: 'Karnataka',
          zipCode: '560038',
          country: 'India',
        },
        totalAmount: 1200,
        paymentStatus: 'pending',
        trackingId: 'ORD-2024-003',
        createdAt: new Date('2024-03-12'),
        updatedAt: new Date('2024-03-12'),
      },
    ];
    const ordersResult = await db.collection('orders').insertMany(orders);
    console.log(`✅ Created ${ordersResult.insertedCount} orders`);

    // Seed vitals_history
    console.log('\n📊 Seeding vitals history...');
    const vitalsHistory = [
      {
        patientId: patientEmailToId.get('ramesh.kumar@example.com'),
        bp: '140/90',
        sugar: 145,
        temp: 98.6,
        weight: 79,
        height: 170,
        pulse: 78,
        recordedAt: new Date('2024-03-01T09:30:00'),
        recordedBy: 'doctor',
        notes: 'Routine checkup',
      },
      {
        patientId: patientEmailToId.get('ramesh.kumar@example.com'),
        bp: '138/88',
        sugar: 142,
        temp: 98.5,
        weight: 78,
        height: 170,
        pulse: 75,
        recordedAt: new Date('2024-03-08T09:00:00'),
        recordedBy: 'self',
        notes: 'Self-recorded',
      },
      {
        patientId: patientEmailToId.get('priya.sharma@example.com'),
        bp: '118/76',
        sugar: 98,
        temp: 98.4,
        weight: 58,
        height: 162,
        pulse: 72,
        recordedAt: new Date('2024-02-15T14:15:00'),
        recordedBy: 'doctor',
        notes: 'Asthma follow-up',
      },
      {
        patientId: patientEmailToId.get('arjun.patel@example.com'),
        bp: '125/82',
        sugar: 110,
        temp: 98.7,
        weight: 72,
        height: 175,
        pulse: 68,
        recordedAt: new Date('2024-02-20T10:00:00'),
        recordedBy: 'doctor',
        notes: 'General checkup',
      },
      {
        patientId: patientEmailToId.get('kavita.singh@example.com'),
        bp: '132/85',
        sugar: 135,
        temp: 98.5,
        weight: 68,
        height: 158,
        pulse: 80,
        recordedAt: new Date('2024-02-20T11:30:00'),
        recordedBy: 'doctor',
        notes: 'Diabetes management',
      },
      {
        patientId: patientEmailToId.get('vijay.reddy@example.com'),
        bp: '120/78',
        sugar: 95,
        temp: 98.3,
        weight: 75,
        height: 178,
        pulse: 65,
        recordedAt: new Date('2024-03-01T16:00:00'),
        recordedBy: 'doctor',
        notes: 'Health screening',
      },
    ];
    const vitalsResult = await db.collection('vitals_history').insertMany(vitalsHistory);
    console.log(`✅ Created ${vitalsResult.insertedCount} vitals records`);

    // Seed notifications
    console.log('\n🔔 Seeding notifications...');
    const notifications = [
      {
        userId: userEmailToId.get('ramesh.kumar@example.com'),
        title: 'Medication Reminder',
        message: 'Time to take Amlodipine 5mg',
        type: 'medication',
        isRead: false,
        priority: 'high',
        actionUrl: '/patient/prescriptions',
        createdAt: new Date('2024-03-15T08:00:00'),
      },
      {
        userId: userEmailToId.get('ramesh.kumar@example.com'),
        title: 'Appointment Reminder',
        message: 'You have an appointment with Dr. Ananya Rao on March 15, 2024 at 10:00 AM',
        type: 'appointment',
        isRead: true,
        priority: 'medium',
        actionUrl: '/patient/appointments',
        createdAt: new Date('2024-03-14T18:00:00'),
      },
      {
        userId: userEmailToId.get('priya.sharma@example.com'),
        title: 'Lab Results Available',
        message: 'Your recent lab test results are now available in your health records',
        type: 'lab_result',
        isRead: false,
        priority: 'medium',
        actionUrl: '/patient/records',
        createdAt: new Date('2024-03-13T12:00:00'),
      },
      {
        userId: userEmailToId.get('priya.sharma@example.com'),
        title: 'Order Status Update',
        message: 'Your medicine order (ORD-2024-002) is out for delivery',
        type: 'general',
        isRead: false,
        priority: 'low',
        actionUrl: '/patient/orders',
        createdAt: new Date('2024-03-11T14:30:00'),
      },
      {
        userId: userEmailToId.get('neha.sharma@example.com'),
        title: 'Family Member Health Update',
        message: 'Priya Sharma recorded new vital signs today',
        type: 'general',
        isRead: true,
        priority: 'low',
        actionUrl: '/guardian/family',
        createdAt: new Date('2024-03-08T10:00:00'),
      },
      {
        userId: userEmailToId.get('dr.ananya.rao@hospital.com'),
        title: 'New Appointment Request',
        message: 'Ramesh Kumar has requested an appointment for March 22',
        type: 'appointment',
        isRead: false,
        priority: 'medium',
        actionUrl: '/doctor/appointments',
        createdAt: new Date('2024-03-13T09:00:00'),
      },
    ];
    const notificationsResult = await db.collection('notifications').insertMany(notifications);
    console.log(`✅ Created ${notificationsResult.insertedCount} notifications`);

    // Seed lab_reports
    console.log('\n🔬 Seeding lab reports...');
    const labReports = [
      {
        patientId: patientEmailToId.get('ramesh.kumar@example.com'),
        doctorId: doctorEmailToId.get('dr.ananya.rao@hospital.com'),
        testName: 'Complete Blood Count (CBC)',
        testDate: new Date('2024-03-01'),
        results: [
          {
            parameter: 'Hemoglobin',
            value: '14.2',
            unit: 'g/dL',
            normalRange: '13.5-17.5',
            status: 'normal',
          },
          {
            parameter: 'White Blood Cells',
            value: '7.2',
            unit: '×10³/μL',
            normalRange: '4.5-11.0',
            status: 'normal',
          },
          {
            parameter: 'Platelets',
            value: '250',
            unit: '×10³/μL',
            normalRange: '150-450',
            status: 'normal',
          },
        ],
        notes: 'All parameters within normal range',
        createdAt: new Date('2024-03-02'),
      },
      {
        patientId: patientEmailToId.get('ramesh.kumar@example.com'),
        doctorId: doctorEmailToId.get('dr.ananya.rao@hospital.com'),
        testName: 'HbA1c (Glycosylated Hemoglobin)',
        testDate: new Date('2024-03-01'),
        results: [
          {
            parameter: 'HbA1c',
            value: '6.8',
            unit: '%',
            normalRange: '4.0-5.6',
            status: 'abnormal',
          },
        ],
        notes: 'Diabetes management - continue current medication',
        createdAt: new Date('2024-03-02'),
      },
      {
        patientId: patientEmailToId.get('priya.sharma@example.com'),
        doctorId: doctorEmailToId.get('dr.rajesh.verma@hospital.com'),
        testName: 'Pulmonary Function Test',
        testDate: new Date('2024-02-15'),
        results: [
          {
            parameter: 'FEV1',
            value: '75',
            unit: '%',
            normalRange: '≥80',
            status: 'abnormal',
          },
          {
            parameter: 'FVC',
            value: '82',
            unit: '%',
            normalRange: '≥80',
            status: 'normal',
          },
        ],
        notes: 'Mild obstructive pattern consistent with asthma',
        createdAt: new Date('2024-02-16'),
      },
      {
        patientId: patientEmailToId.get('kavita.singh@example.com'),
        doctorId: doctorEmailToId.get('dr.rajesh.verma@hospital.com'),
        testName: 'Blood Glucose (Fasting)',
        testDate: new Date('2024-02-20'),
        results: [
          {
            parameter: 'Fasting Blood Glucose',
            value: '135',
            unit: 'mg/dL',
            normalRange: '70-100',
            status: 'abnormal',
          },
        ],
        notes: 'Elevated fasting glucose - diabetes management required',
        createdAt: new Date('2024-02-21'),
      },
    ];
    const labReportsResult = await db.collection('lab_reports').insertMany(labReports);
    console.log(`✅ Created ${labReportsResult.insertedCount} lab reports`);

    console.log('\n\n🎉 Database seeding completed successfully!');
    console.log('\n📊 Summary:');
    console.log(`   Users: ${usersResult.insertedCount}`);
    console.log(`   Patients: ${patientsResult.insertedCount}`);
    console.log(`   Doctors: ${doctorsResult.insertedCount}`);
    console.log(`   Guardians: ${guardiansResult.insertedCount}`);
    console.log(`   Pharmacies: ${pharmaciesResult.insertedCount}`);
    console.log(`   Appointments: ${appointmentsResult.insertedCount}`);
    console.log(`   Prescriptions: ${prescriptionsResult.insertedCount}`);
    console.log(`   Orders: ${ordersResult.insertedCount}`);
    console.log(`   Vitals History: ${vitalsResult.insertedCount}`);
    console.log(`   Notifications: ${notificationsResult.insertedCount}`);
    console.log(`   Lab Reports: ${labReportsResult.insertedCount}`);

    console.log('\n👤 Sample Users Created (All with Indian Names):');
    console.log('   Admin: admin@vitadata.in');
    console.log('   Patient 1: ramesh.kumar@example.com - Ramesh Kumar');
    console.log('   Patient 2: priya.sharma@example.com - Priya Sharma');
    console.log('   Patient 3: arjun.patel@example.com - Arjun Patel');
    console.log('   Patient 4: kavita.singh@example.com - Kavita Singh');
    console.log('   Patient 5: vijay.reddy@example.com - Vijay Reddy');
    console.log('   Doctor 1: dr.ananya.rao@hospital.com - Dr. Ananya Rao (Cardiology)');
    console.log('   Doctor 2: dr.rajesh.verma@hospital.com - Dr. Rajesh Verma (General Medicine)');
    console.log('   Doctor 3: dr.meera.iyer@hospital.com - Dr. Meera Iyer (Pediatrics)');
    console.log('   Doctor 4: dr.aditya.gupta@hospital.com - Dr. Aditya Gupta (Orthopedics)');
    console.log('   Guardian 1: neha.sharma@example.com - Neha Sharma');
    console.log('   Guardian 2: suresh.patel@example.com - Suresh Patel');
    console.log('   Pharmacy 1: apollo.pharmacy@example.com - Apollo Pharmacy');
    console.log('   Pharmacy 2: chemist.wellness@example.com - Chemist & Wellness');
    console.log('   Pharmacy 3: medplus.pharmacy@example.com - MedPlus Pharmacy');
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
