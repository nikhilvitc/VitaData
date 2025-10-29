import React, { useEffect, useState } from 'react'
import { Activity, Calendar, Pill, Bell, TrendingUp, Heart, Clock, MessageSquare, FileText, ChevronRight, AlertCircle, User, Home, History, Settings, Loader2 } from 'lucide-react'
import VitaBot from '../components/VitaBot'
import { getPatients, getPrescriptions, getAppointments, addAppointment, addOrder, formatDatetime } from '../lib/mockData'
import { dataFetcher } from '../lib/dataFetcher'

export default function PatientDashboard() {
  const [activeTab, setActiveTab] = useState('overview')
  const [patient, setPatient] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [appointments, setAppointments] = useState<any[]>([])
  const [prescriptions, setPrescriptions] = useState<any[]>([])
  const [vitalsHistory, setVitalsHistory] = useState<any[]>([])
  const [labReports, setLabReports] = useState<any[]>([])
  const [notifications, setNotifications] = useState<any[]>([])
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
    async function loadData() {
      setLoading(true)
      try {
        // Get first patient (in real app, get from auth)
        const patients = await dataFetcher.getPatients()
        const p = patients[0]
        if (p) {
          setPatient(p)
          const patientId = p.id

          // Load all data
          const [appts, prescs, vitals, labs, notifs] = await Promise.all([
            dataFetcher.getPatientAppointments(patientId),
            dataFetcher.getPatientPrescriptions(patientId),
            dataFetcher.getPatientVitals(patientId),
            dataFetcher.getPatientLabReports(patientId),
            dataFetcher.getUserNotifications(patientId || '')
          ])

          setAppointments(appts)
          setPrescriptions(prescs)
          setVitalsHistory(vitals)
          setLabReports(labs)
          setNotifications(notifs)

          // Update health trends from vitals history
          if (vitals.length > 0) {
            const recentVitals = vitals.slice(0, 7).reverse()
            const trends = recentVitals.map((v: any, i: number) => {
              const date = new Date(v.recordedAt || Date.now())
              return {
                date: `${date.getMonth() + 1}/${date.getDate()}`,
                bp: parseInt((v.bp || '120/80').split('/')[0], 10) || 120,
                sugar: v.sugar || 95
              }
            })
            if (trends.length > 0) setHealthTrends(trends)
          }

          // Update adherence data
          if (prescs.length && prescs[0].medicines) {
            const vals = prescs[0].medicines.map((m: any, i: number) => ({
              day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i % 7],
              value: m.adherence ?? 90
            }))
            setAdherenceData(vals)
          }
        }
      } catch (error) {
        console.error('Error loading data:', error)
        // Fallback to mock data
    const p = getPatients()[0]
    setPatient(p)
    setAppointments(getAppointments().filter(a => a.patientId === (p?.id)))
        setPrescriptions(getPrescriptions(p?.id))
      } finally {
        setLoading(false)
      }
    }
    loadData()
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

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Home },
    { id: 'health', label: 'Health Records', icon: Activity },
    { id: 'appointments', label: 'Appointments', icon: Calendar },
    { id: 'prescriptions', label: 'Prescriptions', icon: Pill }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-blue-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Patient Portal</h1>
              <p className="text-sm text-gray-700 mt-1">Welcome back, {patient?.name ?? 'John'}</p>
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

          {/* Navigation Tabs */}
          <div className="flex gap-1 mt-4 border-b border-gray-200">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 font-medium text-sm transition-all ${
                    activeTab === tab.id
                      ? 'text-blue-600 border-b-2 border-blue-600 -mb-px'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6">
        {activeTab === 'overview' && (
          <>
        {/* Quick Stats */}
            <div className="mb-8">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                Health Overview
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
                    <div className="p-2 bg-purple-50 rounded-lg">
                      <Activity className="w-5 h-5 text-purple-500" />
              </div>
                    <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded">Good</span>
            </div>
                  <p className="text-2xl font-bold text-gray-900">{patient?.vitals?.sugar ?? '95'}</p>
                  <p className="text-sm text-gray-500 mt-1">Blood Sugar (mg/dL)</p>
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
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <Pill className="w-5 h-5 text-blue-500" />
                    </div>
                    <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded">Excellent</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{avgAdherence}%</p>
                  <p className="text-sm text-gray-500 mt-1">Med Adherence</p>
                </div>
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column */}
              <div className="lg:col-span-2 space-y-6">
                {/* Health Trends Section */}
                <div>
                  <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Activity className="w-5 h-5 text-blue-600" />
                    7-Day Health Trends
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* BP Trend */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                      <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <Heart className="w-4 h-4 text-red-500" />
                        Blood Pressure Trend
                      </h3>
                      <div className="flex items-end gap-2 h-32">
                        {healthTrends.map((d, i) => (
                          <div key={i} className="flex-1 flex flex-col items-center">
                            <div className="w-full bg-gradient-to-t from-red-500 to-pink-400 rounded-t" style={{ height: `${(d.bp / 140) * 100}%` }}></div>
                            <div className="text-xs text-gray-600 mt-2">{d.date}</div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 text-center">
                        <span className="text-2xl font-bold text-gray-900">
                          {healthTrends[healthTrends.length - 1]?.bp}/80
                        </span>
                        <span className="text-sm text-gray-500 ml-2">mmHg</span>
                      </div>
                    </div>

                    {/* Sugar Trend */}
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                      <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <Activity className="w-4 h-4 text-purple-500" />
                        Blood Sugar Trend
                      </h3>
                      <div className="flex items-end gap-2 h-32">
                        {healthTrends.map((d, i) => (
                          <div key={i} className="flex-1 flex flex-col items-center">
                            <div className="w-full bg-gradient-to-t from-purple-500 to-blue-400 rounded-t" style={{ height: `${(d.sugar / 120) * 100}%` }}></div>
                            <div className="text-xs text-gray-600 mt-2">{d.date}</div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 text-center">
                        <span className="text-2xl font-bold text-gray-900">
                          {healthTrends[healthTrends.length - 1]?.sugar}
                        </span>
                        <span className="text-sm text-gray-500 ml-2">mg/dL</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Medication Adherence Section */}
                <div>
                  <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Pill className="w-5 h-5 text-blue-600" />
                    Weekly Medication Adherence
                  </h2>
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-end gap-3 h-40 mb-4">
                      {adherenceData.map((d, i) => (
                        <div key={i} className="flex-1 flex flex-col items-center">
                          <div className="w-full bg-gradient-to-t from-blue-500 to-purple-500 rounded-t" style={{ height: `${d.value}%` }}></div>
                          <div className="text-xs text-gray-600 mt-2 font-medium">{d.day}</div>
                          <div className="text-xs text-gray-400">{d.value}%</div>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                      <div>
                        <p className="text-sm text-gray-600">Average Adherence</p>
                        <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">{avgAdherence}%</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Status</p>
                        <p className="text-lg font-semibold text-green-600">Excellent</p>
                      </div>
                  </div>
                  </div>
                </div>

                {/* Upcoming Appointments Section */}
                <div>
                  <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    Upcoming Appointments
                  </h2>
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <div className="space-y-3">
                    {appointments.length ? (
                        appointments.map((appt) => (
                          <div key={appt.id} className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-100">
                          <div className="p-3 bg-white rounded-lg shadow-sm">
                            <Calendar className="w-6 h-6 text-blue-600" />
                          </div>
                          <div className="flex-1">
                              <p className="font-semibold text-gray-900">{appt.doctor}</p>
                              <p className="text-sm text-gray-600">{formatDatetime(appt.datetime)}</p>
                              <span className="inline-block mt-1 text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">{appt.status}</span>
                          </div>
                            <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:shadow-lg transition">
                            Join Call
                          </button>
                        </div>
                      ))
                    ) : (
                        <div className="text-center py-8 text-gray-500">
                          <Calendar className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                          <p>No upcoming appointments</p>
                        </div>
                    )}
                  </div>
                  </div>
                </div>
              </div>

              {/* Right Sidebar */}
              <div className="space-y-6">
                {/* Quick Actions */}
                <div>
                  <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <ChevronRight className="w-5 h-5 text-blue-600" />
                    Quick Actions
                  </h2>
                  <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 space-y-2">
                    <button 
                      onClick={handleQuickBook}
                      className="w-full flex items-center gap-3 p-3 text-left hover:bg-blue-50 rounded-lg transition group"
                    >
                      <Calendar className="w-5 h-5 text-gray-400 group-hover:text-blue-600" />
                      <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600">Book Appointment</span>
                    </button>
                    <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-blue-50 rounded-lg transition group">
                      <FileText className="w-5 h-5 text-gray-400 group-hover:text-blue-600" />
                      <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600">View Reports</span>
                    </button>
                    <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-blue-50 rounded-lg transition group">
                      <Pill className="w-5 h-5 text-gray-400 group-hover:text-blue-600" />
                      <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600">Refill Prescription</span>
                    </button>
                    <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-blue-50 rounded-lg transition group">
                      <Activity className="w-5 h-5 text-gray-400 group-hover:text-blue-600" />
                      <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600">Update Vitals</span>
                    </button>
                  </div>
                </div>

                {/* Active Prescriptions */}
                <div>
                  <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Pill className="w-5 h-5 text-blue-600" />
                    Active Prescriptions
                  </h2>
                  <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 space-y-3">
                    {prescriptions.length ? (
                      prescriptions.map((presc) => (
                        <div key={presc.id} className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-100">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <p className="font-semibold text-gray-900 text-sm">{presc.title}</p>
                              <p className="text-xs text-gray-600 mt-1">Dr. {presc.doctor}</p>
                            </div>
                            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">Active</span>
                          </div>
                          <button 
                            onClick={() => requestDeliveryFor(presc)}
                            className="w-full mt-3 px-3 py-2 bg-purple-600 text-white text-xs font-medium rounded-lg hover:bg-purple-700 transition"
                          >
                            Request Delivery
                          </button>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-gray-500 text-center py-4">No active prescriptions</p>
                    )}
                  </div>
                </div>

                {/* Notifications */}
                <div>
                  <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Bell className="w-5 h-5 text-blue-600" />
                    Recent Notifications
                  </h2>
                  <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 space-y-3">
                    <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                      <Clock className="w-4 h-4 text-blue-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Medication Reminder</p>
                        <p className="text-xs text-gray-600 mt-1">Take your evening medication in 30 mins</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                      <Activity className="w-4 h-4 text-green-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Lab Results Ready</p>
                        <p className="text-xs text-gray-600 mt-1">Your recent test results are available</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'health' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Health Records</h2>
            
            {loading ? (
          <div className="text-center py-20">
                <Loader2 className="w-8 h-8 mx-auto animate-spin text-blue-600 mb-4" />
                <p className="text-gray-600">Loading health records...</p>
              </div>
            ) : (
              <>
                {/* Vitals History */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Heart className="w-5 h-5 text-blue-600" />
                    Vitals History
                  </h3>
                  {vitalsHistory.length > 0 ? (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Blood Pressure</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sugar (mg/dL)</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Temperature</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Pulse</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Weight (kg)</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Recorded By</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200">
                            {vitalsHistory.map((vital) => (
                              <tr key={vital.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                  {formatDatetime(vital.recordedAt || new Date().toISOString())}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{vital.bp}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{vital.sugar}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{vital.temp}°F</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{vital.pulse} bpm</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{vital.weight} kg</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">{vital.recordedBy || 'self'}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-white rounded-xl p-12 text-center border border-gray-100">
                      <Activity className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                      <p className="text-gray-600">No vitals history available</p>
                    </div>
                  )}
                </div>

                {/* Lab Reports */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-blue-600" />
                    Lab Reports
                  </h3>
                  {labReports.length > 0 ? (
                    <div className="grid grid-cols-1 gap-4">
                      {labReports.map((report) => (
                        <div key={report.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h4 className="text-lg font-semibold text-gray-900">{report.testName}</h4>
                              <p className="text-sm text-gray-600 mt-1">
                                Test Date: {formatDatetime(report.testDate || new Date().toISOString())}
                              </p>
                            </div>
                          </div>
                          {report.results && report.results.length > 0 && (
                            <div className="space-y-2">
                              {report.results.map((result: any, idx: number) => (
                                <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                  <div>
                                    <p className="font-medium text-gray-900">{result.parameter}</p>
                                    <p className="text-sm text-gray-600">{result.value} {result.unit}</p>
                                  </div>
                                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                    result.status === 'normal' 
                                      ? 'bg-green-100 text-green-700' 
                                      : 'bg-red-100 text-red-700'
                                  }`}>
                                    {result.status}
                                  </span>
                                </div>
                              ))}
                            </div>
                          )}
                          {report.notes && (
                            <p className="text-sm text-gray-600 mt-4 italic">Notes: {report.notes}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-white rounded-xl p-12 text-center border border-gray-100">
                      <FileText className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                      <p className="text-gray-600">No lab reports available</p>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        )}

        {activeTab === 'appointments' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Appointments</h2>
              <button
                onClick={handleQuickBook}
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:shadow-lg transition"
              >
                Book New Appointment
              </button>
            </div>

            {loading ? (
          <div className="text-center py-20">
                <Loader2 className="w-8 h-8 mx-auto animate-spin text-blue-600 mb-4" />
                <p className="text-gray-600">Loading appointments...</p>
              </div>
            ) : appointments.length > 0 ? (
              <div className="space-y-4">
                {appointments.map((appt) => (
                  <div key={appt.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg">
                          <Calendar className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{appt.doctor}</h3>
                          <p className="text-sm text-gray-600 mt-1">{formatDatetime(appt.datetime)}</p>
                          <div className="flex items-center gap-3 mt-2">
                            <span className={`text-xs font-medium px-3 py-1 rounded-full ${
                              appt.status === 'confirmed' || appt.status === 'completed' 
                                ? 'bg-green-100 text-green-700'
                                : appt.status === 'cancelled'
                                ? 'bg-red-100 text-red-700'
                                : 'bg-yellow-100 text-yellow-700'
                            }`}>
                              {appt.status}
                            </span>
                            <span className="text-xs text-gray-500 px-3 py-1 bg-gray-100 rounded-full">
                              {appt.type || 'in-person'}
                            </span>
                          </div>
                          {appt.symptoms && (
                            <p className="text-sm text-gray-700 mt-2">Symptoms: {appt.symptoms}</p>
                          )}
                          {appt.notes && (
                            <p className="text-sm text-gray-600 mt-1 italic">{appt.notes}</p>
                          )}
                        </div>
                      </div>
                      {(appt.status === 'confirmed' || appt.status === 'booked') && (
                        <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:shadow-lg transition">
                          Join Call
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl p-12 text-center border border-gray-100">
            <Calendar className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">No Appointments</h3>
                <p className="text-gray-600 mb-4">You don't have any appointments scheduled.</p>
                <button
                  onClick={handleQuickBook}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:shadow-lg transition"
                >
                  Book Your First Appointment
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'prescriptions' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Prescriptions</h2>

            {loading ? (
          <div className="text-center py-20">
                <Loader2 className="w-8 h-8 mx-auto animate-spin text-blue-600 mb-4" />
                <p className="text-gray-600">Loading prescriptions...</p>
              </div>
            ) : prescriptions.length > 0 ? (
              <div className="space-y-4">
                {prescriptions.map((presc) => (
                  <div key={presc.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{presc.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">Prescribed by {presc.doctor}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          Issued: {formatDatetime(presc.issuedOn)} | 
                          {presc.validUntil && ` Valid until: ${formatDatetime(presc.validUntil)}`}
                        </p>
                        {presc.diagnosis && (
                          <p className="text-sm text-gray-700 mt-2">
                            <span className="font-medium">Diagnosis:</span> {presc.diagnosis}
                          </p>
                        )}
                      </div>
                      <span className={`text-xs font-medium px-3 py-1 rounded-full ${
                        presc.status === 'active' 
                          ? 'bg-green-100 text-green-700'
                          : presc.status === 'expired'
                          ? 'bg-gray-100 text-gray-700'
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {presc.status}
                      </span>
                    </div>

                    {presc.medicines && presc.medicines.length > 0 && (
                      <div className="mt-4">
                        <h4 className="text-sm font-semibold text-gray-900 mb-3">Medications:</h4>
                        <div className="space-y-2">
                          {presc.medicines.map((med: any, idx: number) => (
                            <div key={idx} className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                              <div>
                                <p className="font-medium text-gray-900">{med.name}</p>
                                <p className="text-sm text-gray-600">{med.dose} • {med.schedule}</p>
                                {med.adherence !== undefined && (
                                  <div className="mt-1">
                                    <div className="flex items-center gap-2">
                                      <span className="text-xs text-gray-500">Adherence:</span>
                                      <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-[100px]">
                                        <div 
                                          className={`h-2 rounded-full ${
                                            med.adherence >= 90 ? 'bg-green-500' : med.adherence >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                                          }`}
                                          style={{ width: `${med.adherence}%` }}
                                        ></div>
                                      </div>
                                      <span className="text-xs font-medium text-gray-700">{med.adherence}%</span>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="mt-4 flex gap-2">
                      <button
                        onClick={() => requestDeliveryFor(presc)}
                        className="px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 transition"
                      >
                        Request Delivery
                      </button>
                      <button className="px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition">
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl p-12 text-center border border-gray-100">
            <Pill className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">No Prescriptions</h3>
                <p className="text-gray-600">You don't have any active prescriptions.</p>
              </div>
            )}
          </div>
        )}
      </div>

      <VitaBot role="patient" />
    </div>
  )
}
