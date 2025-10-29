import React, { useEffect, useState } from 'react'
import VitaBot from '../components/VitaBot'
import { getAppointments, getPatients, formatDatetime, Appointment, Patient } from '../lib/mockData'

export default function DoctorDashboard(){
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [patients, setPatients] = useState<Patient[]>([])

  useEffect(() => {
    setAppointments(getAppointments())
    setPatients(getPatients())
  }, [])

  function approve(apptId: string) {
    // simple optimistic UI change via localStorage helper if available
    alert('Marked appointment as confirmed (demo): ' + apptId)
  }

  return (
    <div className="container py-10">
      <h2 className="text-2xl font-semibold">Doctor Dashboard</h2>

      <section className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-4 rounded shadow">
          <h4 className="font-semibold">Doctor Profile</h4>
          <div className="mt-2 text-sm">Dr. Ananya Rao — Cardiology</div>
          <div className="text-sm">Hospital: CityCare</div>
        </div>

        <div className="col-span-2 bg-white p-4 rounded shadow">
          <h4 className="font-semibold">Patient Management</h4>
          <div className="mt-2 text-sm">Assigned patients: {patients.length}</div>
          <div className="mt-3">
            <button onClick={() => alert('Open patient list (todo)')} className="px-3 py-2 bg-sky-600 text-white rounded">Open Patient List</button>
          </div>
        </div>
      </section>

      <section className="mt-6">
        <h4 className="font-semibold">Appointments & Calendar</h4>
        <div className="mt-3 text-sm">
          {appointments.length ? appointments.map(a => (
            <div key={a.id} className="mb-2 flex items-center justify-between">
              <div>{patients.find(p => p.id === a.patientId)?.name ?? a.patientId} — {formatDatetime(a.datetime)}</div>
              <div className="flex gap-2">
                <button onClick={() => approve(a.id)} className="px-2 py-1 bg-emerald-600 text-white rounded">Confirm</button>
                <button onClick={() => alert('Reschedule flow (todo)')} className="px-2 py-1 border rounded">Reschedule</button>
              </div>
            </div>
          )) : <div>No appointments</div>}
        </div>
      </section>

      <VitaBot role="doctor" />
    </div>
  )
}
