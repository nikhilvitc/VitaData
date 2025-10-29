import { getCollection } from './mongoClient';

// Seed data for all collections

export const seedUsers = [
  {
    email: 'admin@vitadata.com',
    name: 'Admin User',
    role: 'admin' as const,
    password: 'admin123', // In production, this should be hashed
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    email: 'john.doe@patient.com',
    name: 'John Doe',
    role: 'patient' as const,
    password: 'patient123',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    email: 'jane.smith@patient.com',
    name: 'Jane Smith',
    role: 'patient' as const,
    password: 'patient123',
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-20'),
  },
  {
    email: 'dr.wilson@hospital.com',
    name: 'Dr. Sarah Wilson',
    role: 'doctor' as const,
    password: 'doctor123',
    specialization: 'Cardiology',
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-05'),
  },
  {
    email: 'dr.brown@hospital.com',
    name: 'Dr. Michael Brown',
    role: 'doctor' as const,
    password: 'doctor123',
    specialization: 'General Medicine',
    createdAt: new Date('2024-01-06'),
    updatedAt: new Date('2024-01-06'),
  },
  {
    email: 'guardian@family.com',
    name: 'Mary Johnson',
    role: 'guardian' as const,
    password: 'guardian123',
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-10'),
  },
  {
    email: 'pharmacy@medplus.com',
    name: 'MedPlus Pharmacy',
    role: 'pharmacy' as const,
    password: 'pharmacy123',
    address: '123 Main St, City, State 12345',
    phone: '+1-555-0123',
    createdAt: new Date('2024-01-03'),
    updatedAt: new Date('2024-01-03'),
  },
];

export const seedPatients = [
  {
    userId: null, // Will be set after user creation
    email: 'john.doe@patient.com',
    name: 'John Doe',
    dateOfBirth: new Date('1985-05-15'),
    gender: 'Male',
    bloodType: 'A+',
    allergies: ['Penicillin', 'Peanuts'],
    conditions: ['Hypertension', 'Type 2 Diabetes'],
    guardianEmail: null,
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
    userId: null,
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

export const seedDoctors = [
  {
    userId: null,
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
    userId: null,
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

export const seedPrescriptions = [
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
    status: 'active' as const,
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
    status: 'active' as const,
    createdAt: new Date('2024-02-15'),
    updatedAt: new Date('2024-02-15'),
  },
];

export const seedAppointments = [
  {
    patientEmail: 'john.doe@patient.com',
    doctorEmail: 'dr.wilson@hospital.com',
    scheduledAt: new Date('2024-04-15T10:00:00'),
    duration: 30,
    type: 'in-person' as const,
    status: 'scheduled' as const,
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
    type: 'telemedicine' as const,
    status: 'scheduled' as const,
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
    type: 'in-person' as const,
    status: 'completed' as const,
    reason: 'Initial consultation',
    notes: 'First visit - completed successfully',
    createdAt: new Date('2024-02-20'),
    updatedAt: new Date('2024-03-01'),
  },
];

export const seedHealthRecords = [
  {
    patientEmail: 'john.doe@patient.com',
    recordType: 'vitals' as const,
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
    recordType: 'lab-result' as const,
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
    recordType: 'vitals' as const,
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

export const seedMedications = [
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

export const seedPharmacies = [
  {
    email: 'pharmacy@medplus.com',
    name: 'MedPlus Pharmacy',
    licenseNumber: 'PH-567890',
    address: '123 Main St, Springfield, IL 62701',
    phone: '+1-555-0123',
    hours: {
      monday: '8:00 AM - 10:00 PM',
      tuesday: '8:00 AM - 10:00 PM',
      wednesday: '8:00 AM - 10:00 PM',
      thursday: '8:00 AM - 10:00 PM',
      friday: '8:00 AM - 10:00 PM',
      saturday: '9:00 AM - 6:00 PM',
      sunday: '10:00 AM - 4:00 PM',
    },
    services: ['Prescription Filling', 'Vaccinations', 'Health Screenings', 'Medication Counseling'],
    createdAt: new Date('2024-01-03'),
    updatedAt: new Date('2024-01-03'),
  },
];

// Function to seed all data
export async function seedDatabase() {
  try {
    console.log('🌱 Starting database seeding...');

    // Clear existing data
    console.log('Clearing existing collections...');
    const collections = ['users', 'patients', 'doctors', 'prescriptions', 'appointments', 'health_records', 'medications', 'pharmacies'];
    for (const collectionName of collections) {
      const collection = await getCollection(collectionName);
      await collection.deleteMany({});
    }

    // Seed users
    console.log('Seeding users...');
    const usersCollection = await getCollection('users');
    const userResults = await usersCollection.insertMany(seedUsers);
    const userIds = Object.values(userResults.insertedIds);
    console.log(`✅ Created ${userIds.length} users`);

    // Create email to ID mapping
    const userEmailToId = new Map();
    const insertedUsers = await usersCollection.find({}).toArray();
    insertedUsers.forEach(user => {
      userEmailToId.set(user.email, user._id);
    });

    // Seed patients with user IDs
    console.log('Seeding patients...');
    const patientsCollection = await getCollection('patients');
    const patientsWithIds = seedPatients.map(patient => ({
      ...patient,
      userId: userEmailToId.get(patient.email),
      guardianId: patient.guardianEmail ? userEmailToId.get(patient.guardianEmail) : null,
    }));
    const patientResults = await patientsCollection.insertMany(patientsWithIds);
    console.log(`✅ Created ${Object.keys(patientResults.insertedIds).length} patients`);

    // Seed doctors with user IDs
    console.log('Seeding doctors...');
    const doctorsCollection = await getCollection('doctors');
    const doctorsWithIds = seedDoctors.map(doctor => ({
      ...doctor,
      userId: userEmailToId.get(doctor.email),
    }));
    const doctorResults = await doctorsCollection.insertMany(doctorsWithIds);
    console.log(`✅ Created ${Object.keys(doctorResults.insertedIds).length} doctors`);

    // Get patient and doctor IDs
    const insertedPatients = await patientsCollection.find({}).toArray();
    const insertedDoctors = await doctorsCollection.find({}).toArray();
    
    const patientEmailToId = new Map();
    insertedPatients.forEach(patient => {
      patientEmailToId.set(patient.email, patient._id);
    });

    const doctorEmailToId = new Map();
    insertedDoctors.forEach(doctor => {
      doctorEmailToId.set(doctor.email, doctor._id);
    });

    // Seed prescriptions
    console.log('Seeding prescriptions...');
    const prescriptionsCollection = await getCollection('prescriptions');
    const prescriptionsWithIds = seedPrescriptions.map(prescription => ({
      ...prescription,
      patientId: patientEmailToId.get(prescription.patientEmail),
      doctorId: doctorEmailToId.get(prescription.doctorEmail),
    }));
    const prescriptionResults = await prescriptionsCollection.insertMany(prescriptionsWithIds);
    console.log(`✅ Created ${Object.keys(prescriptionResults.insertedIds).length} prescriptions`);

    // Seed appointments
    console.log('Seeding appointments...');
    const appointmentsCollection = await getCollection('appointments');
    const appointmentsWithIds = seedAppointments.map(appointment => ({
      ...appointment,
      patientId: patientEmailToId.get(appointment.patientEmail),
      doctorId: doctorEmailToId.get(appointment.doctorEmail),
    }));
    const appointmentResults = await appointmentsCollection.insertMany(appointmentsWithIds);
    console.log(`✅ Created ${Object.keys(appointmentResults.insertedIds).length} appointments`);

    // Seed health records
    console.log('Seeding health records...');
    const healthRecordsCollection = await getCollection('health_records');
    const healthRecordsWithIds = seedHealthRecords.map(record => ({
      ...record,
      patientId: patientEmailToId.get(record.patientEmail),
      recordedBy: userEmailToId.get(record.recordedBy),
    }));
    const healthRecordResults = await healthRecordsCollection.insertMany(healthRecordsWithIds);
    console.log(`✅ Created ${Object.keys(healthRecordResults.insertedIds).length} health records`);

    // Seed medications
    console.log('Seeding medications...');
    const medicationsCollection = await getCollection('medications');
    const medicationResults = await medicationsCollection.insertMany(seedMedications);
    console.log(`✅ Created ${Object.keys(medicationResults.insertedIds).length} medications`);

    // Seed pharmacies
    console.log('Seeding pharmacies...');
    const pharmaciesCollection = await getCollection('pharmacies');
    const pharmacyResults = await pharmaciesCollection.insertMany(seedPharmacies);
    console.log(`✅ Created ${Object.keys(pharmacyResults.insertedIds).length} pharmacies`);

    console.log('🎉 Database seeding completed successfully!');
    console.log('\n📊 Summary:');
    console.log(`Users: ${userIds.length}`);
    console.log(`Patients: ${Object.keys(patientResults.insertedIds).length}`);
    console.log(`Doctors: ${Object.keys(doctorResults.insertedIds).length}`);
    console.log(`Prescriptions: ${Object.keys(prescriptionResults.insertedIds).length}`);
    console.log(`Appointments: ${Object.keys(appointmentResults.insertedIds).length}`);
    console.log(`Health Records: ${Object.keys(healthRecordResults.insertedIds).length}`);
    console.log(`Medications: ${Object.keys(medicationResults.insertedIds).length}`);
    console.log(`Pharmacies: ${Object.keys(pharmacyResults.insertedIds).length}`);

    return {
      success: true,
      counts: {
        users: userIds.length,
        patients: Object.keys(patientResults.insertedIds).length,
        doctors: Object.keys(doctorResults.insertedIds).length,
        prescriptions: Object.keys(prescriptionResults.insertedIds).length,
        appointments: Object.keys(appointmentResults.insertedIds).length,
        healthRecords: Object.keys(healthRecordResults.insertedIds).length,
        medications: Object.keys(medicationResults.insertedIds).length,
        pharmacies: Object.keys(pharmacyResults.insertedIds).length,
      },
    };
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  }
}

