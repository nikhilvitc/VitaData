import React, { useEffect, useState } from 'react'
import { Activity, Calendar, Pill, Bell, TrendingUp, Heart, Clock, MessageSquare, FileText, ChevronRight, AlertCircle } from 'lucide-react'
import VitaBot from '../components/VitaBot'
import { getPatients, getPrescriptions, getAppointments, addAppointment, addOrder, formatDatetime } from '../lib/mockData'

export default function PatientDashboard() {
  const [activeTab, setActiveTab] = useState('overview')
  const [patient, setPatient] = useState<any>(null)
  const [appointments, setAppointments] = useState<any[]>([])
  const [prescriptions, setPrescriptions] = useState<any[]>([])
  const [adherenceData, setAdherenceData] = useState<Array<{day:string;value:number}>>([
    { day: 'Mon', value: 100 },
    { day: 'Tue', value: 100 },
    { day: 'Wed', value: 50 },
    { day: 'Thu', value: 100 },
    { day: 'Fri', value: 100 },
    { day: 'Sat', value: 100 },
    { day: 'Sun', value: 100 }
  ])

  const [healthTrends, setHealthTrends] = useState<Array<{date:string;bp:number;sugar:number}>>([
    { date: '10/23', bp: 118, sugar: 92 },
    { date: '10/24', bp: 122, sugar: 98 },
    { date: '10/25', bp: 120, sugar: 95 },
    { date: '10/26', bp: 119, sugar: 90 },
    { date: '10/27', bp: 121, sugar: 94 },
    { date: '10/28', bp: 120, sugar: 95 },
    { date: '10/29', bp: 120, sugar: 95 }
  ])

  useEffect(() => {
    const p = getPatients()[0]
    setPatient(p)
    setAppointments(getAppointments().filter(a => a.patientId === (p?.id)))
    const pres = getPrescriptions(p?.id)
    setPrescriptions(pres)

    // derive adherenceData from prescriptions if present
    if (pres.length && pres[0].medicines) {
      const vals = pres[0].medicines.map((m:any, i:number) => ({ day: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'][i % 7], value: m.adherence ?? 90 }))
      setAdherenceData(vals)
    }

    // derive small health trends from vitals if available
    if (p?.vitals) {
      const now = new Date()
      const trends = Array.from({length:7}).map((_,i) => {
        const d = new Date(now.getTime() - (6-i)*24*3600*1000)
        return { date: `${d.getMonth()+1}/${d.getDate()}`, bp: parseInt(((p.vitals?.bp) || '120/80').split('/')[0],10) || 120, sugar: p.vitals?.sugar || 95 }
      })
      setHealthTrends(trends)
    }
  }, [])

  const avgAdherence = Math.round(adherenceData.reduce((sum, d) => sum + d.value, 0) / adherenceData.length)

  function handleQuickBook() {
    if (!patient) return
    const appt = addAppointment({ patientId: patient.id, doctor: 'Dr. Ananya Rao', datetime: new Date(Date.now()+3*24*3600*1000).toISOString(), status: 'booked' })
    setAppointments(prev => [...prev, appt])
    alert('Quick appointment booked: ' + formatDatetime(appt.datetime))
  }

  function requestDeliveryFor(presc:any) {
    const ord = addOrder({ prescriptionId: presc.id, pharmacy: 'City Pharmacy', status: 'pending' })
    alert('Delivery requested — order id: ' + ord.id)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Patient Dashboard</h1>
              <p className="text-sm text-gray-500 mt-1">Welcome back, {patient?.name ?? 'John'}</p>
            </div>
            <div className="flex items-center gap-4">
              <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-full transition">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">{patient?.name ?? 'John Doe'}</p>
                  <p className="text-xs text-gray-500">ID: {patient?.healthId ?? 'H-123456'}</p>
                </div>
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                  {patient?.name ? patient.name.split(' ').map((s:string)=>s[0]).slice(0,2).join('') : 'JD'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-red-50 rounded-lg">
                <Heart className="w-5 h-5 text-red-500" />
              </div>
              <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded">Normal</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{patient?.vitals?.bp ?? '120/80'}</p>
            <p className="text-sm text-gray-500 mt-1">Blood Pressure</p>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-blue-50 rounded-lg">
                <Activity className="w-5 h-5 text-blue-500" />
              </div>
              <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded">Normal</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{patient?.vitals?.sugar ?? '95'} mg/dL</p>
            <p className="text-sm text-gray-500 mt-1">Blood Sugar</p>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-orange-50 rounded-lg">
                <Activity className="w-5 h-5 text-orange-500" />
              </div>
              <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded">Normal</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{patient?.vitals?.temp ?? '98.4'}°F</p>
            <p className="text-sm text-gray-500 mt-1">Temperature</p>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-purple-50 rounded-lg">
                <TrendingUp className="w-5 h-5 text-purple-500" />
              </div>
              <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded">{avgAdherence}%</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{avgAdherence}%</p>
            <p className="text-sm text-gray-500 mt-1">Med Adherence</p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - 2/3 width */}
          <div className="lg:col-span-2 space-y-6">
            {/* Health Trends Chart - NEW FEATURE */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Health Trends</h2>
                <select className="text-sm border border-gray-200 rounded-lg px-3 py-1.5">
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                  <option>Last 90 days</option>
                </select>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Blood Pressure (mmHg)</span>
                    <span className="text-sm text-gray-500">Avg: {Math.round(healthTrends.reduce((s,t)=>s+t.bp,0)/healthTrends.length)}/{Math.round(80)}</span>
                  </div>
                  <div className="flex items-end gap-2 h-32">
                    {healthTrends.map((item, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-1">
                        <div className="w-full bg-red-100 rounded-t relative" style={{ height: `${(item.bp / 140) * 100}%` }}>
                          <div className="absolute inset-0 bg-gradient-to-t from-red-500 to-red-400 rounded-t"></div>
                        </div>
                        <span className="text-xs text-gray-500">{item.date.split('/')[1]}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Blood Sugar (mg/dL)</span>
                    <span className="text-sm text-gray-500">Avg: {Math.round(healthTrends.reduce((s,t)=>s+t.sugar,0)/healthTrends.length)}</span>
                  </div>
                  <div className="flex items-end gap-2 h-32">
                    {healthTrends.map((item, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-1">
                        <div className="w-full bg-blue-100 rounded-t relative" style={{ height: `${(item.sugar / 120) * 100}%` }}>
                          <div className="absolute inset-0 bg-gradient-to-t from-blue-500 to-blue-400 rounded-t"></div>
                        </div>
                        <span className="text-xs text-gray-500">{item.date.split('/')[1]}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Medication Adherence */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Medication Adherence</h2>
              <div className="flex items-end gap-3 h-40 mb-4">
                {adherenceData.map((item, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full bg-gray-100 rounded-t relative" style={{ height: `${item.value}%` }}>
                      <div className={`absolute inset-0 rounded-t ${item.value === 100 ? 'bg-gradient-to-t from-green-500 to-green-400' : 'bg-gradient-to-t from-yellow-500 to-yellow-400'}`}></div>
                    </div>
                    <span className="text-xs font-medium text-gray-600">{item.day}</span>
                  </div>
                ))}
              </div>
              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-sm text-blue-900 font-medium">Great job! You've taken your medications on time {adherenceData.filter(d=>d.value===100).length} out of 7 days this week.</p>
              </div>
            </div>

            {/* Appointments */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Upcoming Appointments</h2>
                <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">View All</button>
              </div>
              <div className="space-y-3">
                {appointments.length ? (
                  appointments.map((a:any) => (
                    <div key={a.id} className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-100">
                      <div className="p-3 bg-white rounded-lg shadow-sm">
                        <Calendar className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">{a.doctor}</p>
                        <p className="text-sm text-gray-600">{formatDatetime(a.datetime)}</p>
                        <span className="inline-block mt-1 text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">{a.status}</span>
                      </div>
                      <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition">
                        Join Call
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="text-sm text-gray-500">No upcoming appointments</div>
                )}
              </div>
              <div className="flex gap-3 mt-4">
                <button onClick={handleQuickBook} className="flex-1 px-4 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition">
                  Quick Book
                </button>
                <button onClick={()=>alert('Open scheduler (todo)')} className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition">
                  Open Scheduler
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - 1/3 width */}
          <div className="space-y-6">
            {/* AI Health Assistant - NEW FEATURE */}
            <div className="bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-white/20 rounded-lg backdrop-blur">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <h2 className="text-lg font-semibold">Health Assistant</h2>
              </div>
              <p className="text-sm text-white/90 mb-4">
                Ask me anything about your health, medications, or upcoming appointments.
              </p>
              <button onClick={() => { const el = document.querySelector('#vitabot-launch'); if(el) (el as HTMLElement).click() }} className="w-full px-4 py-2.5 bg-white text-purple-600 font-medium rounded-lg hover:bg-white/90 transition">
                Start Conversation
              </button>
            </div>

            {/* Active Prescriptions */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Prescriptions</h2>
                <Pill className="w-5 h-5 text-gray-400" />
              </div>
              <div className="space-y-4">
                {prescriptions.length ? (
                  prescriptions.map((p:any) => (
                    <div key={p.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-semibold text-gray-900">{p.title}</p>
                          <p className="text-xs text-gray-500 mt-1">Issued: {new Date(p.issuedOn).toLocaleDateString()}</p>
                        </div>
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Active</span>
                      </div>
                      <div className="space-y-2 mt-3">
                        {p.medicines.map((m:any, idx:number) => (
                          <div key={idx} className="flex items-center gap-2 text-sm">
                            <Clock className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-700">{m.name} — {m.dose} — {m.schedule}</span>
                          </div>
                        ))}
                      </div>
                      <button onClick={() => requestDeliveryFor(p)} className="w-full mt-4 px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition">
                        Request Delivery
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="text-sm text-gray-500">No active prescriptions</div>
                )}
              </div>
            </div>

            {/* Notifications */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Notifications</h2>
                <Bell className="w-5 h-5 text-gray-400" />
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Medication Reminder</p>
                    <p className="text-xs text-gray-600 mt-1">Metformin at 8:00 AM</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <FileText className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Follow-up Alert</p>
                    <p className="text-xs text-gray-600 mt-1">From your doctor</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
              <div className="space-y-2">
                <button className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50 rounded-lg transition group">
                  <span className="text-sm font-medium text-gray-700">View Lab Results</span>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
                </button>
                <button className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50 rounded-lg transition group">
                  <span className="text-sm font-medium text-gray-700">Request Refill</span>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
                </button>
                <button className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50 rounded-lg transition group">
                  <span className="text-sm font-medium text-gray-700">Message Doctor</span>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
                </button>
                <button className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50 rounded-lg transition group">
                  <span className="text-sm font-medium text-gray-700">Download Records</span>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <button id="vitabot-launch" className="hidden" onClick={() => document.querySelector('#vitabot')?.dispatchEvent(new Event('click'))} />
      <VitaBot role="patient" />
    </div>
  )
}
import React, { useEffect, useMemo, useState } from 'react'
import { Activity, Calendar, Pill, Bell, TrendingUp, Heart, Clock, MessageSquare, FileText, ChevronRight, AlertCircle } from 'lucide-react'
import VitaBot from '../components/VitaBot'
import { getPatients, getPrescriptions, getAppointments, addAppointment, addOrder, formatDatetime, Patient, Appointment, Prescription } from '../lib/mockData'

export default function PatientDashboard(){
  const [activeTab, setActiveTab] = useState('overview')
  const [patient, setPatient] = useState<Patient | null>(null)
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([])

  useEffect(() => {
    import React, { useEffect, useState } from 'react'
    import { Activity, Calendar, Pill, Bell, TrendingUp, Heart, Clock, MessageSquare, FileText, ChevronRight, AlertCircle } from 'lucide-react'
    import { getPatients, getPrescriptions, getAppointments, addAppointment, addOrder, formatDatetime } from '../lib/mockData'
    import VitaBot from '../components/VitaBot'

    export default function PatientDashboard() {
      const [activeTab, setActiveTab] = useState('overview')
      const [patient, setPatient] = useState<any>(null)
      const [appointments, setAppointments] = useState<any[]>([])
      const [prescriptions, setPrescriptions] = useState<any[]>([])
      const [adherenceData, setAdherenceData] = useState<Array<{day:string;value:number}>>([
        { day: 'Mon', value: 100 },
        { day: 'Tue', value: 100 },
        { day: 'Wed', value: 50 },
        { day: 'Thu', value: 100 },
        { day: 'Fri', value: 100 },
        { day: 'Sat', value: 100 },
        { day: 'Sun', value: 100 }
      ])

      const [healthTrends, setHealthTrends] = useState<Array<{date:string;bp:number;sugar:number}>>([
        { date: '10/23', bp: 118, sugar: 92 },
        { date: '10/24', bp: 122, sugar: 98 },
        { date: '10/25', bp: 120, sugar: 95 },
        { date: '10/26', bp: 119, sugar: 90 },
        { date: '10/27', bp: 121, sugar: 94 },
        { date: '10/28', bp: 120, sugar: 95 },
        { date: '10/29', bp: 120, sugar: 95 }
      ])

      useEffect(() => {
        const p = getPatients()[0]
        setPatient(p)
        setAppointments(getAppointments().filter(a => a.patientId === (p?.id)))
        const pres = getPrescriptions(p?.id)
        setPrescriptions(pres)

        // derive adherenceData from prescriptions if present
        if (pres.length && pres[0].medicines) {
          const vals = pres[0].medicines.map((m:any, i:number) => ({ day: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'][i % 7], value: m.adherence ?? 90 }))
          setAdherenceData(vals)
        }

        // derive small health trends from vitals if available
        if (p?.vitals) {
          const now = new Date()
          const trends = Array.from({length:7}).map((_,i) => {
            const d = new Date(now.getTime() - (6-i)*24*3600*1000)
            return { date: `${d.getMonth()+1}/${d.getDate()}`, bp: parseInt((p.vitals.bp || '120/80').split('/')[0],10) || 120, sugar: p.vitals.sugar || 95 }
          })
          setHealthTrends(trends)
        }
      }, [])

      const avgAdherence = Math.round(adherenceData.reduce((sum, d) => sum + d.value, 0) / adherenceData.length)

      function handleQuickBook() {
        if (!patient) return
        const appt = addAppointment({ patientId: patient.id, doctor: 'Dr. Ananya Rao', datetime: new Date(Date.now()+3*24*3600*1000).toISOString(), status: 'booked' })
        setAppointments(prev => [...prev, appt])
        alert('Quick appointment booked: ' + formatDatetime(appt.datetime))
      }

      function requestDeliveryFor(presc:any) {
        const ord = addOrder({ prescriptionId: presc.id, pharmacy: 'City Pharmacy', status: 'pending' })
        alert('Delivery requested — order id: ' + ord.id)
      }

      return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
          {/* Header */}
          <div className="bg-white border-b border-gray-200 shadow-sm">
            <div className="max-w-7xl mx-auto px-6 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Patient Dashboard</h1>
                  <p className="text-sm text-gray-500 mt-1">Welcome back, {patient?.name ?? 'John'}</p>
                </div>
                <div className="flex items-center gap-4">
                  <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-full transition">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                  </button>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="text-sm font-semibold text-gray-900">{patient?.name ?? 'John Doe'}</p>
                      <p className="text-xs text-gray-500">ID: {patient?.healthId ?? 'H-123456'}</p>
                    </div>
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                      {patient?.name ? patient.name.split(' ').map((s:string)=>s[0]).slice(0,2).join('') : 'JD'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-6 py-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition">
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 bg-red-50 rounded-lg">
                    <Heart className="w-5 h-5 text-red-500" />
                  </div>
                  <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded">Normal</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">{patient?.vitals?.bp ?? '120/80'}</p>
                <p className="text-sm text-gray-500 mt-1">Blood Pressure</p>
              </div>

              <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition">
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <Activity className="w-5 h-5 text-blue-500" />
                  </div>
                  <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded">Normal</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">{patient?.vitals?.sugar ?? '95'} mg/dL</p>
                <p className="text-sm text-gray-500 mt-1">Blood Sugar</p>
              </div>

              <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition">
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 bg-orange-50 rounded-lg">
                    <Activity className="w-5 h-5 text-orange-500" />
                  </div>
                  <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded">Normal</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">{patient?.vitals?.temp ?? '98.4'}°F</p>
                <p className="text-sm text-gray-500 mt-1">Temperature</p>
              </div>

              <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition">
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 bg-purple-50 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-purple-500" />
                  </div>
                  <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded">{avgAdherence}%</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">{avgAdherence}%</p>
                <p className="text-sm text-gray-500 mt-1">Med Adherence</p>
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - 2/3 width */}
              <div className="lg:col-span-2 space-y-6">
                {/* Health Trends Chart - NEW FEATURE */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold text-gray-900">Health Trends</h2>
                    <select className="text-sm border border-gray-200 rounded-lg px-3 py-1.5">
                      <option>Last 7 days</option>
                      <option>Last 30 days</option>
                      <option>Last 90 days</option>
                    </select>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">Blood Pressure (mmHg)</span>
                        <span className="text-sm text-gray-500">Avg: {Math.round(healthTrends.reduce((s,t)=>s+t.bp,0)/healthTrends.length)}/{Math.round(80)}</span>
                      </div>
                      <div className="flex items-end gap-2 h-32">
                        {healthTrends.map((item, i) => (
                          <div key={i} className="flex-1 flex flex-col items-center gap-1">
                            <div className="w-full bg-red-100 rounded-t relative" style={{ height: `${(item.bp / 140) * 100}%` }}>
                              <div className="absolute inset-0 bg-gradient-to-t from-red-500 to-red-400 rounded-t"></div>
                            </div>
                            <span className="text-xs text-gray-500">{item.date.split('/')[1]}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">Blood Sugar (mg/dL)</span>
                        <span className="text-sm text-gray-500">Avg: {Math.round(healthTrends.reduce((s,t)=>s+t.sugar,0)/healthTrends.length)}</span>
                      </div>
                      <div className="flex items-end gap-2 h-32">
                        {healthTrends.map((item, i) => (
                          <div key={i} className="flex-1 flex flex-col items-center gap-1">
                            <div className="w-full bg-blue-100 rounded-t relative" style={{ height: `${(item.sugar / 120) * 100}%` }}>
                              <div className="absolute inset-0 bg-gradient-to-t from-blue-500 to-blue-400 rounded-t"></div>
                            </div>
                            <span className="text-xs text-gray-500">{item.date.split('/')[1]}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Medication Adherence */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Medication Adherence</h2>
                  <div className="flex items-end gap-3 h-40 mb-4">
                    {adherenceData.map((item, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-2">
                        <div className="w-full bg-gray-100 rounded-t relative" style={{ height: `${item.value}%` }}>
                          <div className={`absolute inset-0 rounded-t ${item.value === 100 ? 'bg-gradient-to-t from-green-500 to-green-400' : 'bg-gradient-to-t from-yellow-500 to-yellow-400'}`}></div>
                        </div>
                        <span className="text-xs font-medium text-gray-600">{item.day}</span>
                      </div>
                    ))}
                  </div>
                  <div className="bg-blue-50 rounded-lg p-4">
                    <p className="text-sm text-blue-900 font-medium">Great job! You've taken your medications on time {adherenceData.filter(d=>d.value===100).length} out of 7 days this week.</p>
                  </div>
                </div>

                {/* Appointments */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-gray-900">Upcoming Appointments</h2>
                    <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">View All</button>
                  </div>
                  <div className="space-y-3">
                    {appointments.length ? (
                      appointments.map((a:any) => (
                        <div key={a.id} className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-100">
                          <div className="p-3 bg-white rounded-lg shadow-sm">
                            <Calendar className="w-6 h-6 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold text-gray-900">{a.doctor}</p>
                            <p className="text-sm text-gray-600">{formatDatetime(a.datetime)}</p>
                            <span className="inline-block mt-1 text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">{a.status}</span>
                          </div>
                          <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition">
                            Join Call
                          </button>
                        </div>
                      ))
                    ) : (
                      <div className="text-sm text-gray-500">No upcoming appointments</div>
                    )}
                  </div>
                  <div className="flex gap-3 mt-4">
                    <button onClick={handleQuickBook} className="flex-1 px-4 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition">
                      Quick Book
                    </button>
                    <button onClick={()=>alert('Open scheduler (todo)')} className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition">
                      Open Scheduler
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column - 1/3 width */}
              <div className="space-y-6">
                {/* AI Health Assistant - NEW FEATURE */}
                <div className="bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-white/20 rounded-lg backdrop-blur">
                      <MessageSquare className="w-5 h-5" />
                    </div>
                    <h2 className="text-lg font-semibold">Health Assistant</h2>
                  </div>
                  <p className="text-sm text-white/90 mb-4">
                    Ask me anything about your health, medications, or upcoming appointments.
                  </p>
                  <button onClick={() => { const el = document.querySelector('#vitabot-launch'); if(el) (el as HTMLElement).click() }} className="w-full px-4 py-2.5 bg-white text-purple-600 font-medium rounded-lg hover:bg-white/90 transition">
                    Start Conversation
                  </button>
                </div>

                {/* Active Prescriptions */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-gray-900">Prescriptions</h2>
                    <Pill className="w-5 h-5 text-gray-400" />
                  </div>
                  <div className="space-y-4">
                    {prescriptions.length ? (
                      prescriptions.map((p:any) => (
                        <div key={p.id} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <p className="font-semibold text-gray-900">{p.title}</p>
                              <p className="text-xs text-gray-500 mt-1">Issued: {new Date(p.issuedOn).toLocaleDateString()}</p>
                            </div>
                            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Active</span>
                          </div>
                          <div className="space-y-2 mt-3">
                            {p.medicines.map((m:any, idx:number) => (
                              <div key={idx} className="flex items-center gap-2 text-sm">
                                <Clock className="w-4 h-4 text-gray-400" />
                                <span className="text-gray-700">{m.name} — {m.dose} — {m.schedule}</span>
                              </div>
                            ))}
                          </div>
                          <button onClick={() => requestDeliveryFor(p)} className="w-full mt-4 px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition">
                            Request Delivery
                          </button>
                        </div>
                      ))
                    ) : (
                      <div className="text-sm text-gray-500">No active prescriptions</div>
                    )}
                  </div>
                </div>

                {/* Notifications */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-gray-900">Notifications</h2>
                    <Bell className="w-5 h-5 text-gray-400" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                      <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Medication Reminder</p>
                        <p className="text-xs text-gray-600 mt-1">Metformin at 8:00 AM</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <FileText className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Follow-up Alert</p>
                        <p className="text-xs text-gray-600 mt-1">From your doctor</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
                  <div className="space-y-2">
                    <button className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50 rounded-lg transition group">
                      <span className="text-sm font-medium text-gray-700">View Lab Results</span>
                      <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
                    </button>
                    <button className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50 rounded-lg transition group">
                      <span className="text-sm font-medium text-gray-700">Request Refill</span>
                      <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
                    </button>
                    <button className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50 rounded-lg transition group">
                      <span className="text-sm font-medium text-gray-700">Message Doctor</span>
                      <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
                    </button>
                    <button className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50 rounded-lg transition group">
                      <span className="text-sm font-medium text-gray-700">Download Records</span>
                      <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button id="vitabot-launch" className="hidden" onClick={() => document.querySelector('#vitabot')?.dispatchEvent(new Event('click'))} />
          <VitaBot role="patient" />
        </div>
      )
    }
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - 2/3 width */}
          <div className="lg:col-span-2 space-y-6">
            {/* Health Trends Chart - NEW FEATURE */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Health Trends</h2>
                <select className="text-sm border border-gray-200 rounded-lg px-3 py-1.5">
                  <option>Last 7 days</option>
                </select>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Blood Pressure (mmHg)</span>
                    <span className="text-sm text-gray-500">Avg: {Math.round(healthTrends.reduce((s,t)=>s+t.bp,0)/healthTrends.length)}/{Math.round(80)}</span>
                  </div>
                  <div className="flex items-end gap-2 h-32">
                    {healthTrends.map((item, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-1">
                        <div className="w-full bg-red-100 rounded-t relative" style={{ height: `${(item.bp / 140) * 100}%` }}>
                          <div className="absolute inset-0 bg-gradient-to-t from-red-500 to-red-400 rounded-t"></div>
                        </div>
                        <span className="text-xs text-gray-500">{item.date.split('/')[1]}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Blood Sugar (mg/dL)</span>
                    <span className="text-sm text-gray-500">Avg: {Math.round(healthTrends.reduce((s,t)=>s+t.sugar,0)/healthTrends.length)}</span>
                  </div>
                  <div className="flex items-end gap-2 h-32">
                    {healthTrends.map((item, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-1">
                        <div className="w-full bg-blue-100 rounded-t relative" style={{ height: `${(item.sugar / 120) * 100}%` }}>
                          <div className="absolute inset-0 bg-gradient-to-t from-blue-500 to-blue-400 rounded-t"></div>
                        </div>
                        <span className="text-xs text-gray-500">{item.date.split('/')[1]}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Medication Adherence */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Medication Adherence</h2>
              <div className="flex items-end gap-3 h-40 mb-4">
                {adherenceData.map((item, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full bg-gray-100 rounded-t relative" style={{ height: `${item.value}%` }}>
                      <div className={`absolute inset-0 rounded-t ${item.value === 100 ? 'bg-gradient-to-t from-green-500 to-green-400' : 'bg-gradient-to-t from-yellow-500 to-yellow-400'}`}></div>
                    </div>
                    <span className="text-xs font-medium text-gray-600">{item.day}</span>
                  </div>
                ))}
              </div>
              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-sm text-blue-900 font-medium">Great job! You've taken your medications on time {adherenceData.filter(d=>d.value===100).length} out of 7 days this week.</p>
              </div>
            </div>

            {/* Appointments */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Upcoming Appointments</h2>
                <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">View All</button>
              </div>
              <div className="space-y-3">
                {appointments.length ? appointments.map(a => (
                  <div key={a.id} className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-100">
                    <div className="p-3 bg-white rounded-lg shadow-sm">
                      <Calendar className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">{a.doctor}</p>
                      <p className="text-sm text-gray-600">{formatDatetime(a.datetime)}</p>
                      <span className="inline-block mt-1 text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">{a.status}</span>
                    </div>
                    <button onClick={() => alert('Join call (demo)')} className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition">
                      Join Call
                    </button>
                  </div>
                )) : (
                  <div className="text-sm text-gray-500">No upcoming appointments</div>
                )}
              </div>
              <div className="flex gap-3 mt-4">
                <button onClick={quickBook} className="flex-1 px-4 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition">
                  Quick Book
                </button>
                <button onClick={() => alert('Open Scheduler (todo)')} className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition">
                  Open Scheduler
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - 1/3 width */}
          <div className="space-y-6">
            {/* AI Health Assistant - NEW FEATURE */}
            <div className="bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-white/20 rounded-lg backdrop-blur">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <h2 className="text-lg font-semibold">Health Assistant</h2>
              </div>
              <p className="text-sm text-white/90 mb-4">
                Ask me anything about your health, medications, or upcoming appointments.
              </p>
              <button onClick={() => alert('Open VitaBot (demo)')} className="w-full px-4 py-2.5 bg-white text-purple-600 font-medium rounded-lg hover:bg-white/90 transition">
                Start Conversation
              </button>
            </div>

            {/* Active Prescriptions */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Prescriptions</h2>
                <Pill className="w-5 h-5 text-gray-400" />
              </div>
              <div className="space-y-4">
                {prescriptions.length ? prescriptions.map(p => (
                  <div key={p.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-semibold text-gray-900">{p.title}</p>
                        <p className="text-xs text-gray-500 mt-1">Issued: {formatDatetime(p.issuedOn)}</p>
                      </div>
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Active</span>
                    </div>
                    <div className="space-y-2 mt-3">
                      {p.medicines.map((m, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-700">{m.name} — {m.dose} — {m.schedule}</span>
                        </div>
                      ))}
                    </div>
                    <button onClick={() => requestDelivery(p)} className="w-full mt-4 px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition">
                      Request Delivery
                    </button>
                  </div>
                )) : <div className="text-sm text-gray-500">No prescriptions</div>}
              </div>
            </div>

            {/* Notifications */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Notifications</h2>
                <Bell className="w-5 h-5 text-gray-400" />
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Medication Reminder</p>
                    <p className="text-xs text-gray-600 mt-1">Metformin at 8:00 AM</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <FileText className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Follow-up Alert</p>
                    <p className="text-xs text-gray-600 mt-1">From your doctor</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
              <div className="space-y-2">
                <button className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50 rounded-lg transition group">
                  <span className="text-sm font-medium text-gray-700">View Lab Results</span>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
                </button>
                <button className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50 rounded-lg transition group">
                  <span className="text-sm font-medium text-gray-700">Request Refill</span>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
                </button>
                <button className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50 rounded-lg transition group">
                  <span className="text-sm font-medium text-gray-700">Message Doctor</span>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
                </button>
                <button className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50 rounded-lg transition group">
                  <span className="text-sm font-medium text-gray-700">Download Records</span>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <VitaBot role="patient" />
    </div>
  )
}
