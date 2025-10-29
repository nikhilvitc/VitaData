// Simple localStorage-backed mock data layer for dashboards and VitaBot
export type Patient = {
  id: string
  name: string
  age: number
  healthId: string
  contact: string
  vitals?: { bp?: string; sugar?: number; temp?: number; lastUpdated?: string }
}

export type Appointment = {
  id: string
  patientId: string
  doctor: string
  datetime: string // ISO
  status?: 'booked' | 'confirmed' | 'rescheduled' | 'cancelled' | 'completed'
}

export type Prescription = {
  id: string
  patientId: string
  title: string
  issuedOn: string // ISO
  medicines: Array<{ name: string; dose: string; schedule: string; color?: string; adherence?: number }>
}

export type Order = {
  id: string
  prescriptionId: string
  pharmacy: string
  status: 'pending' | 'in_progress' | 'delivered'
  createdAt: string
}

const PATIENTS_KEY = 'vitadata_patients'
const APPTS_KEY = 'vitadata_appointments'
const PRESC_KEY = 'vitadata_prescriptions'
const ORDERS_KEY = 'vitadata_orders'

function read<T>(key: string): T | null {
  const raw = localStorage.getItem(key)
  if (!raw) return null
  try { return JSON.parse(raw) as T } catch { return null }
}

function write<T>(key: string, v: T) {
  localStorage.setItem(key, JSON.stringify(v))
}

function ensureDefaults() {
  if (!read<Patient[]>(PATIENTS_KEY)) {
    const patients: Patient[] = [
      {
        id: 'p-1',
        name: 'John Doe',
        age: 34,
        healthId: 'H-123456',
        contact: '+91 98765 43210',
        vitals: { bp: '120/80', sugar: 95, temp: 98.4, lastUpdated: new Date().toISOString() }
      },
    ]
    write(PATIENTS_KEY, patients)
  }

  if (!read<Appointment[]>(APPTS_KEY)) {
    const appts: Appointment[] = [
      { id: 'a-1', patientId: 'p-1', doctor: 'Dr. Ananya Rao', datetime: new Date(Date.now() + 7*24*3600*1000).toISOString(), status: 'booked' }
    ]
    write(APPTS_KEY, appts)
  }

  if (!read<Prescription[]>(PRESC_KEY)) {
    const prescs: Prescription[] = [
      {
        id: 'r-1',
        patientId: 'p-1',
        title: 'Type 2 Diabetes - Starter Rx',
        issuedOn: new Date().toISOString(),
        medicines: [
          { name: 'Metformin', dose: '500mg', schedule: 'Morning & Night', color: 'bg-amber-300', adherence: 92 },
          { name: 'Amlodipine', dose: '5mg', schedule: 'Morning', color: 'bg-sky-300', adherence: 95 }
        ]
      }
    ]
    write(PRESC_KEY, prescs)
  }

  if (!read<Order[]>(ORDERS_KEY)) {
    const orders: Order[] = []
    write(ORDERS_KEY, orders)
  }
}

ensureDefaults()

export function getPatients(): Patient[] {
  return read<Patient[]>(PATIENTS_KEY) || []
}

export function getPatient(id: string): Patient | undefined {
  return getPatients().find(p => p.id === id)
}

export function getAppointments(): Appointment[] {
  return read<Appointment[]>(APPTS_KEY) || []
}

export function addAppointment(a: Omit<Appointment,'id'>) {
  const list = getAppointments()
  const id = `a-${Date.now()}`
  const appt = { ...a, id }
  list.push(appt)
  write(APPTS_KEY, list)
  return appt
}

export function updateAppointment(id: string, patch: Partial<Appointment>) {
  const list = getAppointments()
  const idx = list.findIndex(x => x.id === id)
  if (idx === -1) return null
  list[idx] = { ...list[idx], ...patch }
  write(APPTS_KEY, list)
  return list[idx]
}

export function getPrescriptions(patientId?: string): Prescription[] {
  const all = read<Prescription[]>(PRESC_KEY) || []
  return patientId ? all.filter(p => p.patientId === patientId) : all
}

export function addOrder(o: Omit<Order,'id'|'createdAt'>) {
  const list = read<Order[]>(ORDERS_KEY) || []
  const id = `o-${Date.now()}`
  const order: Order = { ...o, id, createdAt: new Date().toISOString() }
  list.push(order)
  write(ORDERS_KEY, list)
  return order
}

export function getOrders(): Order[] { return read<Order[]>(ORDERS_KEY) || [] }

export function updateOrder(id: string, patch: Partial<Order>) {
  const list = getOrders()
  const idx = list.findIndex(o => o.id === id)
  if (idx === -1) return null
  list[idx] = { ...list[idx], ...patch }
  write(ORDERS_KEY, list)
  return list[idx]
}

export function formatDatetime(iso: string) {
  try { const d = new Date(iso); return d.toLocaleString() } catch { return iso }
}
