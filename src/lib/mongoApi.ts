// Browser-safe MongoDB API - All functions will gracefully fail in browser
import type { ObjectId } from 'mongodb';

// Lazy import to avoid loading MongoDB in browser
async function getCollectionSafe(collectionName: string) {
  try {
    const { getCollection } = await import('./mongoClient');
    return await getCollection(collectionName);
  } catch (error) {
    // In browser, MongoDB will always fail, so we return a mock collection
    throw new Error('MongoDB not available in browser');
  }
}

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
    const collection = await getCollectionSafeSafe<User>('users');
    const now = new Date();
    const result = await collection.insertOne({
      ...userData,
      createdAt: now,
      updatedAt: now,
    } as User);
    return result.insertedId;
  },

  async findByEmail(email: string) {
    const collection = await getCollectionSafeSafe<User>('users');
    return await collection.findOne({ email });
  },

  async findById(id: ObjectId) {
    const collection = await getCollectionSafe<User>('users');
    return await collection.findOne({ _id: id });
  },

  async update(id: ObjectId, updates: Partial<User>) {
    const collection = await getCollectionSafe<User>('users');
    return await collection.updateOne(
      { _id: id },
      { $set: { ...updates, updatedAt: new Date() } }
    );
  },
};

// Patient operations
export const patientApi = {
  async create(patientData: Omit<Patient, '_id' | 'createdAt' | 'updatedAt'>) {
    const collection = await getCollectionSafe<Patient>('patients');
    const now = new Date();
    const result = await collection.insertOne({
      ...patientData,
      createdAt: now,
      updatedAt: now,
    } as Patient);
    return result.insertedId;
  },

  async findByUserId(userId: ObjectId) {
    const collection = await getCollectionSafe<Patient>('patients');
    return await collection.findOne({ userId });
  },

  async findByGuardian(guardianId: ObjectId) {
    const collection = await getCollectionSafe<Patient>('patients');
    return await collection.find({ guardianId }).toArray();
  },

  async update(id: ObjectId, updates: Partial<Patient>) {
    const collection = await getCollectionSafe<Patient>('patients');
    return await collection.updateOne(
      { _id: id },
      { $set: { ...updates, updatedAt: new Date() } }
    );
  },
};

// Prescription operations
export const prescriptionApi = {
  async create(prescriptionData: Omit<Prescription, '_id' | 'createdAt' | 'updatedAt'>) {
    const collection = await getCollectionSafe<Prescription>('prescriptions');
    const now = new Date();
    const result = await collection.insertOne({
      ...prescriptionData,
      createdAt: now,
      updatedAt: now,
    } as Prescription);
    return result.insertedId;
  },

  async findByPatient(patientId: ObjectId) {
    const collection = await getCollectionSafe<Prescription>('prescriptions');
    return await collection
      .find({ patientId })
      .sort({ prescribedAt: -1 })
      .toArray();
  },

  async findByDoctor(doctorId: ObjectId) {
    const collection = await getCollectionSafe<Prescription>('prescriptions');
    return await collection
      .find({ doctorId })
      .sort({ prescribedAt: -1 })
      .toArray();
  },

  async updateStatus(id: ObjectId, status: Prescription['status']) {
    const collection = await getCollectionSafe<Prescription>('prescriptions');
    return await collection.updateOne(
      { _id: id },
      { $set: { status, updatedAt: new Date() } }
    );
  },
};

// Appointment operations
export const appointmentApi = {
  async create(appointmentData: Omit<Appointment, '_id' | 'createdAt' | 'updatedAt'>) {
    const collection = await getCollectionSafe<Appointment>('appointments');
    const now = new Date();
    const result = await collection.insertOne({
      ...appointmentData,
      createdAt: now,
      updatedAt: now,
    } as Appointment);
    return result.insertedId;
  },

  async findByPatient(patientId: ObjectId) {
    const collection = await getCollectionSafe<Appointment>('appointments');
    return await collection
      .find({ patientId })
      .sort({ scheduledAt: -1 })
      .toArray();
  },

  async findByDoctor(doctorId: ObjectId, startDate?: Date, endDate?: Date) {
    const collection = await getCollectionSafe<Appointment>('appointments');
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
    const collection = await getCollectionSafe<Appointment>('appointments');
    return await collection.updateOne(
      { _id: id },
      { $set: { status, updatedAt: new Date() } }
    );
  },
};

// Health Record operations
export const healthRecordApi = {
  async create(recordData: Omit<HealthRecord, '_id' | 'createdAt' | 'updatedAt'>) {
    const collection = await getCollectionSafe<HealthRecord>('health_records');
    const now = new Date();
    const result = await collection.insertOne({
      ...recordData,
      createdAt: now,
      updatedAt: now,
    } as HealthRecord);
    return result.insertedId;
  },

  async findByPatient(patientId: ObjectId, recordType?: HealthRecord['recordType']) {
    const collection = await getCollectionSafe<HealthRecord>('health_records');
    const query: any = { patientId };
    if (recordType) query.recordType = recordType;

    return await collection
      .find(query)
      .sort({ recordedAt: -1 })
      .toArray();
  },

  async getLatestVitals(patientId: ObjectId) {
    const collection = await getCollectionSafe<HealthRecord>('health_records');
    return await collection.findOne(
      { patientId, recordType: 'vitals' },
      { sort: { recordedAt: -1 } }
    );
  },
};

// Vitals History operations
export const vitalsHistoryApi = {
  async findByPatient(patientId: ObjectId | string) {
    const collection = await getCollectionSafe<any>('vitals_history');
    const query = typeof patientId === 'string' ? { patientId } : { patientId: patientId };
    return await collection
      .find(query)
      .sort({ recordedAt: -1 })
      .toArray();
  },
  
  async getLatest(patientId: ObjectId | string) {
    const collection = await getCollectionSafe<any>('vitals_history');
    const query = typeof patientId === 'string' ? { patientId } : { patientId: patientId };
    return await collection.findOne(query, { sort: { recordedAt: -1 } });
  },
};

// Lab Reports operations
export const labReportApi = {
  async findByPatient(patientId: ObjectId | string) {
    const collection = await getCollectionSafe<any>('lab_reports');
    const query = typeof patientId === 'string' ? { patientId } : { patientId: patientId };
    return await collection
      .find(query)
      .sort({ testDate: -1 })
      .toArray();
  },
};

// Notifications operations
export const notificationApi = {
  async findByUserId(userId: ObjectId | string) {
    const collection = await getCollectionSafe<any>('notifications');
    const query = typeof userId === 'string' ? { userId } : { userId: userId };
    return await collection
      .find(query)
      .sort({ createdAt: -1 })
      .limit(50)
      .toArray();
  },
  
  async getUnreadCount(userId: ObjectId | string) {
    const collection = await getCollectionSafe<any>('notifications');
    const query: any = typeof userId === 'string' ? { userId, isRead: false } : { userId: userId, isRead: false };
    return await collection.countDocuments(query);
  },
};

// Orders operations
export const orderApi = {
  async findByPatient(patientId: ObjectId | string) {
    const collection = await getCollectionSafe<any>('orders');
    const query = typeof patientId === 'string' ? { patientId } : { patientId: patientId };
    return await collection
      .find(query)
      .sort({ orderDate: -1 })
      .toArray();
  },
  
  async findByPharmacy(pharmacyId: ObjectId | string) {
    const collection = await getCollectionSafe<any>('orders');
    const query = typeof pharmacyId === 'string' ? { pharmacyId } : { pharmacyId: pharmacyId };
    return await collection
      .find(query)
      .sort({ orderDate: -1 })
      .toArray();
  },
};

// Doctor operations
export const doctorApi = {
  async findAll() {
    const collection = await getCollectionSafe<any>('doctors');
    return await collection.find({}).toArray();
  },
  
  async findById(id: ObjectId | string) {
    const collection = await getCollectionSafe<any>('doctors');
    const query = typeof id === 'string' ? { _id: id } : { _id: id };
    return await collection.findOne(query);
  },
  
  async findByUserId(userId: ObjectId | string) {
    const collection = await getCollectionSafe<any>('doctors');
    const query = typeof userId === 'string' ? { userId } : { userId: userId };
    return await collection.findOne(query);
  },
};

// Patient extended operations
export const patientApiExtended = {
  ...patientApi,
  async findAll() {
    const collection = await getCollectionSafe<Patient>('patients');
    return await collection.find({}).toArray();
  },
  
  async findById(id: ObjectId | string) {
    const collection = await getCollectionSafe<Patient>('patients');
    const query = typeof id === 'string' ? { _id: id } : { _id: id };
    return await collection.findOne(query);
  },
};

export default {
  user: userApi,
  patient: patientApiExtended,
  prescription: prescriptionApi,
  appointment: appointmentApi,
  healthRecord: healthRecordApi,
  vitalsHistory: vitalsHistoryApi,
  labReport: labReportApi,
  notification: notificationApi,
  order: orderApi,
  doctor: doctorApi,
};

