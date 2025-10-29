// MongoDB Collection Schemas for VitaData

// Users Collection - Base user information
export interface User {
  _id?: string
  uid: string // Firebase Auth UID
  email: string
  role: 'patient' | 'doctor' | 'guardian' | 'pharmacy'
  createdAt: Date
  updatedAt: Date
  isActive: boolean
}

// Patients Collection
export interface Patient {
  _id?: string
  userId: string // Reference to User._id
  healthId: string
  name: string
  dateOfBirth: Date
  gender: 'male' | 'female' | 'other'
  phone: string
  address: {
    street: string
    city: string
    state: string
    zipCode: string
    country: string
  }
  emergencyContact: {
    name: string
    relationship: string
    phone: string
  }
  vitals?: {
    bp: string
    sugar: number
    temp: number
    weight: number
    height: number
  }
  medicalHistory: string[]
  allergies: string[]
  createdAt: Date
  updatedAt: Date
}

// Doctors Collection
export interface Doctor {
  _id?: string
  userId: string // Reference to User._id
  name: string
  specialization: string
  licenseNumber: string
  qualification: string
  experience: number // years
  hospital: string
  phone: string
  email: string
  consultationFee: number
  availableDays: string[]
  workingHours: {
    start: string
    end: string
  }
  createdAt: Date
  updatedAt: Date
}

// Guardians Collection
export interface Guardian {
  _id?: string
  userId: string // Reference to User._id
  name: string
  phone: string
  email: string
  relationship: string
  linkedPatients: string[] // Array of Patient._id
  createdAt: Date
  updatedAt: Date
}

// Pharmacies Collection
export interface Pharmacy {
  _id?: string
  userId: string // Reference to User._id
  name: string
  licenseNumber: string
  phone: string
  email: string
  address: {
    street: string
    city: string
    state: string
    zipCode: string
    country: string
  }
  workingHours: {
    start: string
    end: string
  }
  deliveryAvailable: boolean
  createdAt: Date
  updatedAt: Date
}

// Appointments Collection
export interface Appointment {
  _id?: string
  patientId: string // Reference to Patient._id
  doctorId: string // Reference to Doctor._id
  datetime: Date
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  type: 'in-person' | 'video' | 'phone'
  symptoms: string
  notes?: string
  prescriptionId?: string // Reference to Prescription._id
  createdAt: Date
  updatedAt: Date
}

// Prescriptions Collection
export interface Prescription {
  _id?: string
  patientId: string // Reference to Patient._id
  doctorId: string // Reference to Doctor._id
  appointmentId?: string // Reference to Appointment._id
  title: string
  diagnosis: string
  medicines: {
    name: string
    dosage: string
    frequency: string
    duration: string
    timing: string[]
    adherence?: number
  }[]
  instructions: string
  issuedOn: Date
  validUntil: Date
  status: 'active' | 'completed' | 'cancelled'
  createdAt: Date
  updatedAt: Date
}

// Orders Collection (Medicine Delivery)
export interface Order {
  _id?: string
  prescriptionId: string // Reference to Prescription._id
  patientId: string // Reference to Patient._id
  pharmacyId: string // Reference to Pharmacy._id
  status: 'pending' | 'in_progress' | 'delivered' | 'cancelled'
  orderDate: Date
  deliveryDate?: Date
  deliveryAddress: {
    street: string
    city: string
    state: string
    zipCode: string
    country: string
  }
  totalAmount: number
  paymentStatus: 'pending' | 'paid' | 'refunded'
  deliveryPartnerId?: string
  trackingId?: string
  createdAt: Date
  updatedAt: Date
}

// Vitals History Collection
export interface VitalsHistory {
  _id?: string
  patientId: string // Reference to Patient._id
  bp: string
  sugar: number
  temp: number
  weight: number
  height: number
  pulse: number
  recordedAt: Date
  recordedBy: string // doctor or self
  notes?: string
}

// Notifications Collection
export interface Notification {
  _id?: string
  userId: string // Reference to User._id
  title: string
  message: string
  type: 'medication' | 'appointment' | 'lab_result' | 'general'
  isRead: boolean
  priority: 'low' | 'medium' | 'high'
  actionUrl?: string
  createdAt: Date
}

// Lab Reports Collection
export interface LabReport {
  _id?: string
  patientId: string // Reference to Patient._id
  doctorId: string // Reference to Doctor._id
  testName: string
  testDate: Date
  results: {
    parameter: string
    value: string
    unit: string
    normalRange: string
    status: 'normal' | 'abnormal'
  }[]
  reportUrl?: string
  notes?: string
  createdAt: Date
}

// MongoDB Collection Names
export const COLLECTIONS = {
  USERS: 'users',
  PATIENTS: 'patients',
  DOCTORS: 'doctors',
  GUARDIANS: 'guardians',
  PHARMACIES: 'pharmacies',
  APPOINTMENTS: 'appointments',
  PRESCRIPTIONS: 'prescriptions',
  ORDERS: 'orders',
  VITALS_HISTORY: 'vitals_history',
  NOTIFICATIONS: 'notifications',
  LAB_REPORTS: 'lab_reports'
} as const

