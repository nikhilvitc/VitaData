import React, { useEffect, useState } from 'react'
import { Users, Calendar, Clock, CheckCircle, AlertCircle, TrendingUp, Stethoscope, FileText, Video, Phone, Mail, MapPin, Activity, Home, User, Settings, Loader2 } from 'lucide-react'
import VitaBot from '../components/VitaBot'
import { getAppointments, getPatients, formatDatetime, Appointment, Patient } from '../lib/mockData'
import { dataFetcher } from '../lib/dataFetcher'
import mongoApi from '../lib/mongoApi'

export default function DoctorDashboard(){
  const [activeTab, setActiveTab] = useState('overview')
  const [loading, setLoading] = useState(true)
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [patients, setPatients] = useState<Patient[]>([])
  const [doctor, setDoctor] = useState<any>(null)

  useEffect(() => {
    async function loadData() {
      setLoading(true)
      try {
        // Get doctor (in real app, get from auth)
        const allPatients = await dataFetcher.getAllPatientsForDoctor()
        const allAppointments = await dataFetcher.getAllAppointments()
        setPatients(allPatients)
        setAppointments(allAppointments)
        
        // Get first doctor for demo (will fail in browser and use fallback)
        let doctors: any[] = []
        try {
          doctors = await mongoApi.doctor.findAll()
        } catch {
          // MongoDB not available in browser, use fallback
        }
        if (doctors.length > 0) {
          setDoctor(doctors[0])
        } else {
          // Fallback mock doctor
          setDoctor({
            name: 'Dr. Ananya Rao',
            specialization: 'Cardiology',
            hospital: 'Apollo Hospital, Bangalore',
            phone: '+91 98765 43210',
            email: 'dr.ananya.rao@hospital.com'
          })
        }
      } catch (error) {
        console.error('Error loading data:', error)
        // Fallback to mock data
        setAppointments(getAppointments())
        setPatients(getPatients())
        setDoctor({
          name: 'Dr. Ananya Rao',
          specialization: 'Cardiology',
          hospital: 'Apollo Hospital, Bangalore'
        })
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  function approve(apptId: string) {
    alert('Marked appointment as confirmed (demo): ' + apptId)
  }

  const todayAppointments = appointments.slice(0, 3)
  const upcomingAppointments = appointments.slice(3)

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Home },
    { id: 'patients', label: 'Patients', icon: Users },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'profile', label: 'Profile', icon: User }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">Doctor Dashboard</h1>
              <p className="text-sm text-gray-500 mt-1">Dr. Ananya Rao • Cardiologist</p>
            </div>
            <div className="flex items-center gap-4">
              <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-full transition">
                <AlertCircle className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">Dr. Ananya Rao</p>
                  <p className="text-xs text-gray-500">Cardiologist</p>
                </div>
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold">
                  AR
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
                      ? 'text-purple-600 border-b-2 border-purple-600 -mb-px'
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
                    <TrendingUp className="w-5 h-5 text-purple-600" />
                Performance Metrics
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition">
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <Calendar className="w-5 h-5 text-blue-500" />
                    </div>
                    <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">Today</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{todayAppointments.length}</p>
                  <p className="text-sm text-gray-500 mt-1">Appointments</p>
                </div>

                <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition">
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2 bg-emerald-50 rounded-lg">
                      <Users className="w-5 h-5 text-emerald-500" />
                    </div>
                    <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded">Active</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{patients.length}</p>
                  <p className="text-sm text-gray-500 mt-1">Total Patients</p>
                </div>

                <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition">
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2 bg-purple-50 rounded-lg">
                      <TrendingUp className="w-5 h-5 text-purple-500" />
                    </div>
                    <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded">+12%</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">94%</p>
                  <p className="text-sm text-gray-500 mt-1">Success Rate</p>
                </div>

                <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition">
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2 bg-orange-50 rounded-lg">
                      <Clock className="w-5 h-5 text-orange-500" />
                    </div>
                    <span className="text-xs font-medium text-orange-600 bg-orange-50 px-2 py-1 rounded">Avg</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">15m</p>
                  <p className="text-sm text-gray-500 mt-1">Consultation Time</p>
                </div>
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - 2/3 width */}
              <div className="lg:col-span-2 space-y-6">
                {/* Doctor Profile Card */}
                <div>
                  <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Stethoscope className="w-5 h-5 text-purple-600" />
                    Professional Profile
                  </h2>
                  <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl p-6 text-white shadow-lg">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-full flex items-center justify-center">
                        <Stethoscope className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <h2 className="text-2xl font-bold mb-2">Dr. Ananya Rao</h2>
                        <p className="text-emerald-100 mb-4">Cardiologist • MBBS, MD Cardiology</p>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            <span>CityCare Hospital</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4" />
                            <span>+91 98765 43210</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4" />
                            <span>ananya.rao@citycare.com</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Activity className="w-4 h-4" />
                            <span>15 years experience</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Today's Appointments */}
                <div>
                  <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-emerald-600" />
                    Today's Schedule
                  </h2>
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <div className="space-y-3">
                      {todayAppointments.length ? (
                        todayAppointments.map((a) => {
                          const patient = patients.find(p => p.id === a.patientId)
                          return (
                            <div key={a.id} className="flex items-center gap-4 p-4 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-lg border border-emerald-100">
                              <div className="p-3 bg-white rounded-lg shadow-sm">
                                <Calendar className="w-6 h-6 text-emerald-600" />
                              </div>
                              <div className="flex-1">
                                <p className="font-semibold text-gray-900">{patient?.name ?? 'Patient'}</p>
                                <p className="text-sm text-gray-600">{formatDatetime(a.datetime)}</p>
                                <span className="inline-block mt-1 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">{a.status}</span>
                              </div>
                              <div className="flex gap-2">
                                <button onClick={() => approve(a.id)} className="p-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition" title="Confirm">
                                  <CheckCircle className="w-5 h-5" />
                                </button>
                                <button className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition" title="Start Video Call">
                                  <Video className="w-5 h-5" />
                                </button>
                              </div>
                            </div>
                          )
                        })
                      ) : (
                        <div className="text-center py-8 text-gray-500">
                          <Calendar className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                          <p>No appointments scheduled for today</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Upcoming Appointments */}
                <div>
                  <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-emerald-600" />
                    Upcoming Appointments
                  </h2>
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <div className="space-y-2">
                      {upcomingAppointments.length ? (
                        upcomingAppointments.map((a) => {
                          const patient = patients.find(p => p.id === a.patientId)
                          return (
                            <div key={a.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                                  {patient?.name?.split(' ').map(n => n[0]).join('') ?? 'P'}
                                </div>
                                <div>
                                  <p className="font-medium text-gray-900">{patient?.name ?? 'Patient'}</p>
                                  <p className="text-xs text-gray-500">{formatDatetime(a.datetime)}</p>
                                </div>
                              </div>
                              <div className="flex gap-2">
                                <button onClick={() => approve(a.id)} className="px-3 py-1 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700 transition">
                                  Confirm
                                </button>
                                <button onClick={() => alert('Reschedule flow (todo)')} className="px-3 py-1 border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50 transition">
                                  Reschedule
                                </button>
                              </div>
                            </div>
                          )
                        })
                      ) : (
                        <div className="text-sm text-gray-500 text-center py-4">No upcoming appointments</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - 1/3 width */}
              <div className="space-y-6">
                {/* Patient Management */}
                <div>
                  <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Users className="w-5 h-5 text-emerald-600" />
                    Patient Management
                  </h2>
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <div className="space-y-4">
                      <div className="p-4 bg-gradient-to-br from-emerald-50 to-blue-50 rounded-lg">
                        <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-blue-600">
                          {patients.length}
                        </div>
                        <div className="text-sm text-gray-600 mt-1">Assigned Patients</div>
                      </div>
                      <button 
                        onClick={() => alert('Open patient list (todo)')} 
                        className="w-full px-4 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition"
                      >
                        View All Patients
                      </button>
                      <button className="w-full px-4 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition">
                        Add New Patient
                      </button>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div>
                  <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Activity className="w-5 h-5 text-emerald-600" />
                    Quick Actions
                  </h2>
                  <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 space-y-2">
                    <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-emerald-50 rounded-lg transition group">
                      <FileText className="w-5 h-5 text-gray-400 group-hover:text-emerald-600" />
                      <span className="text-sm font-medium text-gray-700 group-hover:text-emerald-600">Write Prescription</span>
                    </button>
                    <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-emerald-50 rounded-lg transition group">
                      <Video className="w-5 h-5 text-gray-400 group-hover:text-emerald-600" />
                      <span className="text-sm font-medium text-gray-700 group-hover:text-emerald-600">Start Video Call</span>
                    </button>
                    <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-emerald-50 rounded-lg transition group">
                      <Activity className="w-5 h-5 text-gray-400 group-hover:text-emerald-600" />
                      <span className="text-sm font-medium text-gray-700 group-hover:text-emerald-600">View Reports</span>
                    </button>
                    <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-emerald-50 rounded-lg transition group">
                      <Calendar className="w-5 h-5 text-gray-400 group-hover:text-emerald-600" />
                      <span className="text-sm font-medium text-gray-700 group-hover:text-emerald-600">Manage Schedule</span>
                    </button>
                  </div>
                </div>

                {/* Recent Patients */}
                <div>
                  <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Users className="w-5 h-5 text-emerald-600" />
                    Recent Patients
                  </h2>
                  <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 space-y-3">
                    {patients.slice(0, 3).map((patient) => (
                      <div key={patient.id} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition cursor-pointer">
                        <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                          {patient.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-900 text-sm">{patient.name}</p>
                          <p className="text-xs text-gray-500">ID: {patient.healthId}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'patients' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Patient Management</h2>
            
            {loading ? (
              <div className="text-center py-20">
                <Loader2 className="w-8 h-8 mx-auto animate-spin text-purple-600 mb-4" />
                <p className="text-gray-600">Loading patients...</p>
              </div>
            ) : patients.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {patients.map((patient) => (
                  <div key={patient.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold">
                        {patient.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{patient.name}</h3>
                        <p className="text-xs text-gray-500 mt-1">ID: {patient.healthId}</p>
                        <p className="text-xs text-gray-500">Age: {patient.age} years</p>
                        {patient.vitals && (
                          <div className="mt-3 space-y-1">
                            <p className="text-xs text-gray-600">
                              <span className="font-medium">BP:</span> {patient.vitals.bp || 'N/A'}
                            </p>
                            <p className="text-xs text-gray-600">
                              <span className="font-medium">Sugar:</span> {patient.vitals.sugar || 'N/A'} mg/dL
                            </p>
                          </div>
                        )}
                        <button className="mt-4 w-full px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 transition">
                          View Profile
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl p-12 text-center border border-gray-100">
                <Users className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">No Patients</h3>
                <p className="text-gray-600">You don't have any assigned patients yet.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'calendar' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Calendar View</h2>
            
            {loading ? (
              <div className="text-center py-20">
                <Loader2 className="w-8 h-8 mx-auto animate-spin text-purple-600 mb-4" />
                <p className="text-gray-600">Loading appointments...</p>
              </div>
            ) : appointments.length > 0 ? (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6">
                  <div className="space-y-4">
                    {appointments.map((appt: any) => {
                      const patient = patients.find(p => p.id === appt.patientId)
                      const patientName = patient?.name || appt.patientName || 'Unknown Patient'
                      return (
                        <div key={appt.id} className="flex items-center gap-4 p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg border border-purple-100">
                          <div className="p-3 bg-white rounded-lg shadow-sm">
                            <Calendar className="w-5 h-5 text-purple-600" />
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold text-gray-900">{patientName}</p>
                            <p className="text-sm text-gray-600">{formatDatetime(appt.datetime)}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                                appt.status === 'confirmed' || appt.status === 'completed'
                                  ? 'bg-green-100 text-green-700'
                                  : appt.status === 'cancelled'
                                  ? 'bg-red-100 text-red-700'
                                  : 'bg-yellow-100 text-yellow-700'
                              }`}>
                                {appt.status}
                              </span>
                              <span className="text-xs text-gray-500 px-2 py-1 bg-gray-100 rounded-full">
                                {appt.type || 'in-person'}
                              </span>
                            </div>
                            {appt.symptoms && (
                              <p className="text-xs text-gray-600 mt-1">Symptoms: {appt.symptoms}</p>
                            )}
                          </div>
                          <div className="flex gap-2">
                            {(appt.status === 'pending' || appt.status === 'booked') && (
                              <button
                                onClick={() => approve(appt.id)}
                                className="px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 transition"
                              >
                                Confirm
                              </button>
                            )}
                            <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition">
                              <Video className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl p-12 text-center border border-gray-100">
                <Calendar className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">No Appointments</h3>
                <p className="text-gray-600">You don't have any scheduled appointments.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Professional Profile</h2>
            
            {loading ? (
              <div className="text-center py-20">
                <Loader2 className="w-8 h-8 mx-auto animate-spin text-purple-600 mb-4" />
                <p className="text-gray-600">Loading profile...</p>
              </div>
            ) : (
              <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                {doctor ? (
                  <div className="space-y-6">
                    <div className="flex items-start gap-6">
                      <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                        {doctor.name?.split(' ').map((n: string) => n[0]).join('').slice(0, 2) || 'DR'}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-gray-900">{doctor.name || 'Dr. Unknown'}</h3>
                        <p className="text-purple-600 font-medium mt-1">{doctor.specialization || 'General Medicine'}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-gray-200">
                      <div>
                        <label className="text-sm font-medium text-gray-500">License Number</label>
                        <p className="text-gray-900 mt-1">{doctor.licenseNumber || 'N/A'}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Qualification</label>
                        <p className="text-gray-900 mt-1">{doctor.qualification || 'MBBS'}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Hospital</label>
                        <p className="text-gray-900 mt-1 flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          {doctor.hospital || 'N/A'}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Experience</label>
                        <p className="text-gray-900 mt-1">{doctor.experience || doctor.yearsOfExperience || '0'} years</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Email</label>
                        <p className="text-gray-900 mt-1 flex items-center gap-2">
                          <Mail className="w-4 h-4 text-gray-400" />
                          {doctor.email || 'N/A'}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Phone</label>
                        <p className="text-gray-900 mt-1 flex items-center gap-2">
                          <Phone className="w-4 h-4 text-gray-400" />
                          {doctor.phone || 'N/A'}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Consultation Fee</label>
                        <p className="text-gray-900 mt-1">₹{doctor.consultationFee || '0'}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Available Days</label>
                        <p className="text-gray-900 mt-1">
                          {doctor.availableDays?.join(', ') || 'Monday - Saturday'}
                        </p>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-gray-200">
                      <button className="px-6 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition">
                        Edit Profile
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <User className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                    <p className="text-gray-600">Profile information not available</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      <VitaBot role="doctor" />
    </div>
  )
}
