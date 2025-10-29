import React, { useEffect, useState } from 'react'
import VitaBot from '../components/VitaBot'
import { getPatients, getAppointments, formatDatetime, Patient, Appointment } from '../lib/mockData'

export default function GuardianDashboard(){
  const [patients, setPatients] = useState<Patient[]>([])
  const [appointments, setAppointments] = useState<Appointment[]>([])

  useEffect(() => {
    const p = getPatients()
    setPatients(p)
    const all = getAppointments()
    setAppointments(all)
  }, [])

  function quickContactDoctor(pid: string) {
    alert('Contacting doctor for patient ' + pid)
  }

  return (
    <div className="container py-10">
      <h2 className="text-2xl font-semibold">Guardian Dashboard</h2>

      <section className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded shadow">
          <h4 className="font-semibold">Linked Patient Profiles</h4>
          <ul className="mt-3 text-sm text-slate-700 list-disc list-inside">
            {patients.map(p => (
              <li key={p.id} className="mb-2">
                <div className="font-medium">{p.name} <span className="text-xs text-slate-500">(ID: {p.healthId})</span></div>
                <div className="text-xs text-slate-500">Last vitals: {p.vitals?.bp ?? '—'}</div>
                <div className="mt-1">
                  <button onClick={() => quickContactDoctor(p.id)} className="px-2 py-1 text-sm border rounded">Contact Doctor</button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h4 className="font-semibold">Health Overview</h4>
          <div className="mt-2 text-sm">Medication adherence: {/* compute average */}
            {patients.length ? Math.round(90 + Math.random()*8) + '%' : '—'}</div>
          <div className="mt-1 text-sm">Missed doses: {Math.floor(Math.random()*3)}</div>
        </div>
      </section>

      <section className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded shadow">
          <h4 className="font-semibold">Notifications</h4>
          <div className="mt-2 text-sm">{patients.length ? 'Alerts for missed medicines and follow-ups.' : 'No linked patients.'}</div>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h4 className="font-semibold">Emergency Contact</h4>
          <div className="mt-2 text-sm">Quick actions:</div>
          <div className="mt-2 flex gap-2">
            <button className="px-3 py-2 bg-red-600 text-white rounded">Call Doctor</button>
            <button className="px-3 py-2 bg-amber-600 text-white rounded">Call Pharmacy</button>
          </div>
        </div>
      </section>

      <section className="mt-6">
        <h4 className="font-semibold">Recent Appointments</h4>
        <div className="mt-2 text-sm text-slate-700">
          {appointments.filter(a => patients.some(p => p.id === a.patientId)).map(a => (
            <div key={a.id} className="mb-2">{patients.find(p => p.id === a.patientId)?.name} — {a.doctor} — {formatDatetime(a.datetime)}</div>
          ))}
        </div>
      </section>

      <VitaBot role="guardian" />
    </div>
  )
}
