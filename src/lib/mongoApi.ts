import { getCollection } from './mongoClient';
import type { ObjectId } from 'mongodb';

// Types for VitaData collections
export interface User {
  _id?: ObjectId;
  email: string;
  name: string;
  role: 'patient' | 'doctor' | 'guardian' | 'pharmacy' | 'admin';
  createdAt: Date;
  updatedAt: Date;
}

export interface Patient {
  _id?: ObjectId;
  userId: ObjectId;
  dateOfBirth: Date;
  gender: string;
  bloodType?: string;
  allergies?: string[];
  conditions?: string[];
  guardianId?: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface Doctor {
  _id?: ObjectId;
  userId: ObjectId;
  specialization: string;
  licenseNumber: string;
  yearsOfExperience: number;
  hospital?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Prescription {
  _id?: ObjectId;
  patientId: ObjectId;
  doctorId: ObjectId;
  medications: Array<{
    name: string;
    dosage: string;
    frequency: string;
    duration: string;
  }>;
  diagnosis: string;
  notes?: string;
  prescribedAt: Date;
  expiresAt: Date;
  status: 'active' | 'expired' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}

export interface Appointment {
  _id?: ObjectId;
  patientId: ObjectId;
  doctorId: ObjectId;
  scheduledAt: Date;
  duration: number; // in minutes
  type: 'in-person' | 'telemedicine';
  status: 'scheduled' | 'completed' | 'cancelled' | 'no-show';
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface HealthRecord {
  _id?: ObjectId;
  patientId: ObjectId;
  recordType: 'vitals' | 'lab-result' | 'imaging' | 'note';
  data: Record<string, any>;
  recordedAt: Date;
  recordedBy?: ObjectId; // doctor or healthcare provider
  createdAt: Date;
  updatedAt: Date;
}

// API Functions

// User operations
export const userApi = {
  async create(userData: Omit<User, '_id' | 'createdAt' | 'updatedAt'>) {
    const collection = await getCollection<User>('users');
    const now = new Date();
    const result = await collection.insertOne({
      ...userData,
      createdAt: now,
      updatedAt: now,
    } as User);
    return result.insertedId;
  },

  async findByEmail(email: string) {
    const collection = await getCollection<User>('users');
    return await collection.findOne({ email });
  },

  async findById(id: ObjectId) {
    const collection = await getCollection<User>('users');
    return await collection.findOne({ _id: id });
  },

  async update(id: ObjectId, updates: Partial<User>) {
    const collection = await getCollection<User>('users');
    return await collection.updateOne(
      { _id: id },
      { $set: { ...updates, updatedAt: new Date() } }
    );
  },
};

// Patient operations
export const patientApi = {
  async create(patientData: Omit<Patient, '_id' | 'createdAt' | 'updatedAt'>) {
    const collection = await getCollection<Patient>('patients');
    const now = new Date();
    const result = await collection.insertOne({
      ...patientData,
      createdAt: now,
      updatedAt: now,
    } as Patient);
    return result.insertedId;
  },

  async findByUserId(userId: ObjectId) {
    const collection = await getCollection<Patient>('patients');
    return await collection.findOne({ userId });
  },

  async findByGuardian(guardianId: ObjectId) {
    const collection = await getCollection<Patient>('patients');
    return await collection.find({ guardianId }).toArray();
  },

  async update(id: ObjectId, updates: Partial<Patient>) {
    const collection = await getCollection<Patient>('patients');
    return await collection.updateOne(
      { _id: id },
      { $set: { ...updates, updatedAt: new Date() } }
    );
  },
};

// Prescription operations
export const prescriptionApi = {
  async create(prescriptionData: Omit<Prescription, '_id' | 'createdAt' | 'updatedAt'>) {
    const collection = await getCollection<Prescription>('prescriptions');
    const now = new Date();
    const result = await collection.insertOne({
      ...prescriptionData,
      createdAt: now,
      updatedAt: now,
    } as Prescription);
    return result.insertedId;
  },

  async findByPatient(patientId: ObjectId) {
    const collection = await getCollection<Prescription>('prescriptions');
    return await collection
      .find({ patientId })
      .sort({ prescribedAt: -1 })
      .toArray();
  },

  async findByDoctor(doctorId: ObjectId) {
    const collection = await getCollection<Prescription>('prescriptions');
    return await collection
      .find({ doctorId })
      .sort({ prescribedAt: -1 })
      .toArray();
  },

  async updateStatus(id: ObjectId, status: Prescription['status']) {
    const collection = await getCollection<Prescription>('prescriptions');
    return await collection.updateOne(
      { _id: id },
      { $set: { status, updatedAt: new Date() } }
    );
  },
};

// Appointment operations
export const appointmentApi = {
  async create(appointmentData: Omit<Appointment, '_id' | 'createdAt' | 'updatedAt'>) {
    const collection = await getCollection<Appointment>('appointments');
    const now = new Date();
    const result = await collection.insertOne({
      ...appointmentData,
      createdAt: now,
      updatedAt: now,
    } as Appointment);
    return result.insertedId;
  },

  async findByPatient(patientId: ObjectId) {
    const collection = await getCollection<Appointment>('appointments');
    return await collection
      .find({ patientId })
      .sort({ scheduledAt: -1 })
      .toArray();
  },

  async findByDoctor(doctorId: ObjectId, startDate?: Date, endDate?: Date) {
    const collection = await getCollection<Appointment>('appointments');
    const query: any = { doctorId };
    
    if (startDate || endDate) {
      query.scheduledAt = {};
      if (startDate) query.scheduledAt.$gte = startDate;
      if (endDate) query.scheduledAt.$lte = endDate;
    }

    return await collection
      .find(query)
      .sort({ scheduledAt: 1 })
      .toArray();
  },

  async updateStatus(id: ObjectId, status: Appointment['status']) {
    const collection = await getCollection<Appointment>('appointments');
    return await collection.updateOne(
      { _id: id },
      { $set: { status, updatedAt: new Date() } }
    );
  },
};

// Health Record operations
export const healthRecordApi = {
  async create(recordData: Omit<HealthRecord, '_id' | 'createdAt' | 'updatedAt'>) {
    const collection = await getCollection<HealthRecord>('health_records');
    const now = new Date();
    const result = await collection.insertOne({
      ...recordData,
      createdAt: now,
      updatedAt: now,
    } as HealthRecord);
    return result.insertedId;
  },

  async findByPatient(patientId: ObjectId, recordType?: HealthRecord['recordType']) {
    const collection = await getCollection<HealthRecord>('health_records');
    const query: any = { patientId };
    if (recordType) query.recordType = recordType;

    return await collection
      .find(query)
      .sort({ recordedAt: -1 })
      .toArray();
  },

  async getLatestVitals(patientId: ObjectId) {
    const collection = await getCollection<HealthRecord>('health_records');
    return await collection.findOne(
      { patientId, recordType: 'vitals' },
      { sort: { recordedAt: -1 } }
    );
  },
};

export default {
  user: userApi,
  patient: patientApi,
  prescription: prescriptionApi,
  appointment: appointmentApi,
  healthRecord: healthRecordApi,
};

