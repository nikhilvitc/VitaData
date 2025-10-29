# MongoDB Database Setup for VitaData

## Collections Overview

VitaData uses the following MongoDB collections:

### 1. **users** - Base user authentication
- Stores Firebase UID and user role
- Links to role-specific collections

### 2. **patients** - Patient information
- Health ID, demographics, vitals
- Medical history and allergies

### 3. **doctors** - Doctor profiles
- Specialization, qualifications
- Availability and fees

### 4. **guardians** - Guardian accounts
- Links to multiple patients
- Emergency contact information

### 5. **pharmacies** - Pharmacy information
- License details, location
- Delivery availability

### 6. **appointments** - Medical appointments
- Patient-Doctor linkage
- Status tracking

### 7. **prescriptions** - Medicine prescriptions
- Medicine details with dosage
- Adherence tracking

### 8. **orders** - Medicine delivery orders
- Prescription to delivery tracking
- Payment status

### 9. **vitals_history** - Patient vitals over time
- BP, sugar, temperature records
- Trend analysis

### 10. **notifications** - User notifications
- Medication reminders
- Appointment alerts

### 11. **lab_reports** - Lab test results
- Test parameters and results
- Normal range comparisons

---

## MongoDB Atlas Setup

### Step 1: Create Collections

```javascript
// Connect to your MongoDB database
use vitadata

// Create collections with validation
db.createCollection("users")
db.createCollection("patients")
db.createCollection("doctors")
db.createCollection("guardians")
db.createCollection("pharmacies")
db.createCollection("appointments")
db.createCollection("prescriptions")
db.createCollection("orders")
db.createCollection("vitals_history")
db.createCollection("notifications")
db.createCollection("lab_reports")
```

### Step 2: Create Indexes

```javascript
// Users collection indexes
db.users.createIndex({ "uid": 1 }, { unique: true })
db.users.createIndex({ "email": 1 }, { unique: true })
db.users.createIndex({ "role": 1 })

// Patients collection indexes
db.patients.createIndex({ "userId": 1 })
db.patients.createIndex({ "healthId": 1 }, { unique: true })
db.patients.createIndex({ "name": "text" })

// Doctors collection indexes
db.doctors.createIndex({ "userId": 1 })
db.doctors.createIndex({ "specialization": 1 })
db.doctors.createIndex({ "hospital": 1 })
db.doctors.createIndex({ "name": "text" })

// Guardians collection indexes
db.guardians.createIndex({ "userId": 1 })
db.guardians.createIndex({ "linkedPatients": 1 })

// Pharmacies collection indexes
db.pharmacies.createIndex({ "userId": 1 })
db.pharmacies.createIndex({ "name": "text" })
db.pharmacies.createIndex({ "licenseNumber": 1 }, { unique: true })

// Appointments collection indexes
db.appointments.createIndex({ "patientId": 1, "datetime": -1 })
db.appointments.createIndex({ "doctorId": 1, "datetime": -1 })
db.appointments.createIndex({ "status": 1 })

// Prescriptions collection indexes
db.prescriptions.createIndex({ "patientId": 1, "issuedOn": -1 })
db.prescriptions.createIndex({ "doctorId": 1 })
db.prescriptions.createIndex({ "status": 1 })

// Orders collection indexes
db.orders.createIndex({ "patientId": 1, "orderDate": -1 })
db.orders.createIndex({ "pharmacyId": 1 })
db.orders.createIndex({ "status": 1 })
db.orders.createIndex({ "prescriptionId": 1 })

// Vitals History indexes
db.vitals_history.createIndex({ "patientId": 1, "recordedAt": -1 })

// Notifications indexes
db.notifications.createIndex({ "userId": 1, "createdAt": -1 })
db.notifications.createIndex({ "isRead": 1 })

// Lab Reports indexes
db.lab_reports.createIndex({ "patientId": 1, "testDate": -1 })
db.lab_reports.createIndex({ "doctorId": 1 })
```

### Step 3: Insert Sample Data

```javascript
// Sample User (Patient)
db.users.insertOne({
  uid: "firebase_uid_patient_1",
  email: "demo@patient.com",
  role: "patient",
  createdAt: new Date(),
  updatedAt: new Date(),
  isActive: true
})

// Sample Patient
db.patients.insertOne({
  userId: "user_id_reference",
  healthId: "VH123456",
  name: "John Doe",
  dateOfBirth: new Date("1990-05-15"),
  gender: "male",
  phone: "+91 9876543210",
  address: {
    street: "123 Main Street",
    city: "Bangalore",
    state: "Karnataka",
    zipCode: "560001",
    country: "India"
  },
  emergencyContact: {
    name: "Jane Doe",
    relationship: "Spouse",
    phone: "+91 9876543211"
  },
  vitals: {
    bp: "120/80",
    sugar: 95,
    temp: 98.4,
    weight: 75,
    height: 175
  },
  medicalHistory: ["Hypertension"],
  allergies: ["Penicillin"],
  createdAt: new Date(),
  updatedAt: new Date()
})

// Sample Doctor
db.doctors.insertOne({
  userId: "user_id_reference_doctor",
  name: "Dr. Ananya Rao",
  specialization: "Cardiology",
  licenseNumber: "MCI12345",
  qualification: "MBBS, MD Cardiology",
  experience: 15,
  hospital: "CityCare Hospital",
  phone: "+91 9876543212",
  email: "ananya.rao@citycare.com",
  consultationFee: 500,
  availableDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  workingHours: {
    start: "09:00",
    end: "17:00"
  },
  createdAt: new Date(),
  updatedAt: new Date()
})

// Sample Prescription
db.prescriptions.insertOne({
  patientId: "patient_id_reference",
  doctorId: "doctor_id_reference",
  title: "Hypertension Management",
  diagnosis: "Essential Hypertension",
  medicines: [
    {
      name: "Amlodipine",
      dosage: "5mg",
      frequency: "Once daily",
      duration: "30 days",
      timing: ["Morning"],
      adherence: 100
    }
  ],
  instructions: "Take medication after breakfast",
  issuedOn: new Date(),
  validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  status: "active",
  createdAt: new Date(),
  updatedAt: new Date()
})
```

---

## Environment Configuration

Make sure your `.env` file contains:

```env
VITE_MONGODB_URI=mongodb+srv://nikhilkumarofficial770_db_user:cnzbGbVYDfvIckCl@cluster0.x39mzo5.mongodb.net/?appName=Cluster0
VITE_MONGODB_DB_NAME=vitadata
```

---

## Firebase Authentication Integration

After creating a user in Firebase Auth:

1. **Get the Firebase UID** from the auth response
2. **Create a user document** in MongoDB `users` collection
3. **Create a role-specific document** (patient, doctor, guardian, or pharmacy)
4. **Link the documents** using the user ID

Example workflow:
```javascript
// 1. User signs up via Firebase
const userCredential = await createUserWithEmailAndPassword(auth, email, password)
const firebaseUid = userCredential.user.uid

// 2. Create user in MongoDB
const userDoc = {
  uid: firebaseUid,
  email: email,
  role: 'patient',
  createdAt: new Date(),
  updatedAt: new Date(),
  isActive: true
}

// 3. Create patient profile
const patientDoc = {
  userId: userDoc._id,
  healthId: generateHealthId(),
  name: fullName,
  // ... other patient fields
}
```

---

## MongoDB Compass Connection

Use MongoDB Compass to visually manage your database:

**Connection String:**
```
mongodb+srv://nikhilkumarofficial770_db_user:cnzbGbVYDfvIckCl@cluster0.x39mzo5.mongodb.net/vitadata
```

---

## Next Steps

1. ✅ Collections created in MongoDB Atlas
2. ✅ Indexes added for performance
3. ✅ Sample data inserted for testing
4. ✅ Firebase Authentication set up
5. 🔄 Backend API to connect Firebase Auth with MongoDB (Future)
6. 🔄 CRUD operations for each collection (Future)

---

**Status**: MongoDB schema ready ✅  
**Firebase Auth**: Configured ✅  
**Login Pages**: Created for all roles ✅

