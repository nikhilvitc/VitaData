// Data fetcher utility with MongoDB integration and fallback to mock data
import mongoApi, { patientApi, appointmentApi, prescriptionApi, vitalsHistoryApi, labReportApi, notificationApi, orderApi, doctorApi } from './mongoApi';
import { getPatients, getAppointments, getPrescriptions, getOrders, formatDatetime } from './mockData';

// Helper to safely fetch from MongoDB, fallback to mock data
async function safeMongoFetch<T>(fetchFn: () => Promise<T>, mockFn: () => T): Promise<T> {
  try {
    const result = await fetchFn();
    return result;
  } catch (error) {
    console.warn('MongoDB fetch failed, using mock data:', error);
    return mockFn();
  }
}

// Patient data fetchers
export const dataFetcher = {
  // Get all patients
  async getPatients() {
    return safeMongoFetch(
      async () => {
        const patients = await patientApi.findAll();
        return patients.map((p: any) => ({
          id: p._id?.toString() || '',
          name: p.name || 'Unknown',
          healthId: p.healthId || `P-${p._id?.toString().slice(-6)}`,
          age: p.dateOfBirth ? Math.floor((Date.now() - new Date(p.dateOfBirth).getTime()) / (365.25 * 24 * 60 * 60 * 1000)) : 0,
          contact: p.phone || '',
          vitals: p.vitals || undefined,
          ...p
        }));
      },
      () => getPatients()
    );
  },

  // Get appointments for patient
  async getPatientAppointments(patientId: string) {
    return safeMongoFetch(
      async () => {
        const appointments = await appointmentApi.findByPatient(patientId as any);
        const doctors = await doctorApi.findAll();
        const doctorMap = new Map(doctors.map((d: any) => [d._id?.toString(), d]));
        
        return appointments.map((apt: any) => {
          const doctor = doctorMap.get(apt.doctorId?.toString());
          return {
            id: apt._id?.toString() || '',
            patientId: apt.patientId?.toString() || patientId,
            doctor: doctor?.name || 'Dr. Unknown',
            datetime: apt.datetime || apt.scheduledAt,
            status: apt.status || 'scheduled',
            type: apt.type || 'in-person',
            symptoms: apt.symptoms || '',
            notes: apt.notes || ''
          };
        });
      },
      () => getAppointments().filter(a => a.patientId === patientId)
    );
  },

  // Get prescriptions for patient
  async getPatientPrescriptions(patientId: string) {
    return safeMongoFetch(
      async () => {
        const prescriptions = await prescriptionApi.findByPatient(patientId as any);
        const doctors = await doctorApi.findAll();
        const doctorMap = new Map(doctors.map((d: any) => [d._id?.toString(), d]));
        
        return prescriptions.map((presc: any) => {
          const doctor = doctorMap.get(presc.doctorId?.toString());
          return {
            id: presc._id?.toString() || '',
            patientId: presc.patientId?.toString() || patientId,
            title: presc.title || presc.diagnosis || 'Prescription',
            doctor: doctor?.name || 'Dr. Unknown',
            issuedOn: presc.issuedOn || presc.createdAt,
            medicines: presc.medicines?.map((m: any) => ({
              name: m.name,
              dose: m.dosage || m.dose,
              schedule: m.frequency || m.timing?.join(', ') || 'As prescribed',
              color: 'bg-blue-300',
              adherence: m.adherence || 90
            })) || [],
            diagnosis: presc.diagnosis || '',
            status: presc.status || 'active',
            validUntil: presc.validUntil
          };
        });
      },
      () => getPrescriptions(patientId)
    );
  },

  // Get vitals history for patient
  async getPatientVitals(patientId: string) {
    return safeMongoFetch(
      async () => {
        const vitals = await vitalsHistoryApi.findByPatient(patientId);
        return vitals.map((v: any) => ({
          id: v._id?.toString() || '',
          bp: v.bp || '120/80',
          sugar: v.sugar || 95,
          temp: v.temp || 98.6,
          weight: v.weight || 70,
          height: v.height || 170,
          pulse: v.pulse || 72,
          recordedAt: v.recordedAt || v.createdAt,
          recordedBy: v.recordedBy || 'self',
          notes: v.notes || ''
        }));
      },
      () => []
    );
  },

  // Get lab reports for patient
  async getPatientLabReports(patientId: string) {
    return safeMongoFetch(
      async () => {
        const reports = await labReportApi.findByPatient(patientId);
        return reports.map((r: any) => ({
          id: r._id?.toString() || '',
          testName: r.testName || 'Lab Test',
          testDate: r.testDate || r.createdAt,
          results: r.results || [],
          notes: r.notes || '',
          doctorId: r.doctorId?.toString() || ''
        }));
      },
      () => []
    );
  },

  // Get notifications for user
  async getUserNotifications(userId: string) {
    return safeMongoFetch(
      async () => {
        const notifications = await notificationApi.findByUserId(userId);
        return notifications.map((n: any) => ({
          id: n._id?.toString() || '',
          title: n.title || '',
          message: n.message || '',
          type: n.type || 'general',
          isRead: n.isRead || false,
          priority: n.priority || 'low',
          actionUrl: n.actionUrl,
          createdAt: n.createdAt
        }));
      },
      () => []
    );
  },

  // Get orders for patient
  async getPatientOrders(patientId: string) {
    return safeMongoFetch(
      async () => {
        const orders = await orderApi.findByPatient(patientId);
        return orders.map((o: any) => ({
          id: o._id?.toString() || '',
          prescriptionId: o.prescriptionId?.toString() || '',
          patientId: o.patientId?.toString() || patientId,
          pharmacy: 'Pharmacy', // Would need to fetch pharmacy name
          status: o.status || 'pending',
          createdAt: o.orderDate || o.createdAt,
          totalAmount: o.totalAmount || 0,
          trackingId: o.trackingId
        }));
      },
      () => getOrders().filter(o => o.prescriptionId)
    );
  },

  // Get all appointments (for doctor)
  async getAllAppointments(doctorId?: string) {
    return safeMongoFetch(
      async () => {
        if (doctorId) {
          const appointments = await appointmentApi.findByDoctor(doctorId as any);
          const patients = await patientApi.findAll();
          const patientMap = new Map(patients.map((p: any) => [p._id?.toString(), p]));
          
          return appointments.map((apt: any) => {
            const patient = patientMap.get(apt.patientId?.toString());
            return {
              id: apt._id?.toString() || '',
              patientId: apt.patientId?.toString() || '',
              patientName: patient?.name || 'Unknown Patient',
              datetime: apt.datetime || apt.scheduledAt,
              status: apt.status || 'scheduled',
              type: apt.type || 'in-person',
              symptoms: apt.symptoms || '',
              notes: apt.notes || ''
            };
          });
        } else {
          return getAppointments();
        }
      },
      () => getAppointments()
    );
  },

  // Get all patients (for doctor)
  async getAllPatientsForDoctor() {
    return safeMongoFetch(
      async () => {
        const patients = await patientApi.findAll();
        return patients.map((p: any) => ({
          id: p._id?.toString() || '',
          name: p.name || 'Unknown',
          healthId: p.healthId || `P-${p._id?.toString().slice(-6)}`,
          age: p.dateOfBirth ? Math.floor((Date.now() - new Date(p.dateOfBirth).getTime()) / (365.25 * 24 * 60 * 60 * 1000)) : 0,
          contact: p.phone || '',
          vitals: p.vitals || undefined,
          ...p
        }));
      },
      () => getPatients()
    );
  },

  // Utility function
  formatDatetime
};

