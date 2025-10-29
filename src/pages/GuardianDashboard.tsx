import React, { useEffect, useState } from 'react'
import { Users, Heart, Bell, TrendingUp, AlertCircle, Phone, Calendar, Activity, Pill, FileText, Shield, MessageCircle, Home, User, Settings, Loader2 } from 'lucide-react'
import VitaBot from '../components/VitaBot'
import { getPatients, getAppointments, formatDatetime, Patient, Appointment } from '../lib/mockData'
import { dataFetcher } from '../lib/dataFetcher'

export default function GuardianDashboard(){
  const [activeTab, setActiveTab] = useState('overview')
  const [loading, setLoading] = useState(true)
  const [patients, setPatients] = useState<Patient[]>([])
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [vitalsHistory, setVitalsHistory] = useState<any[]>([])
  const [notifications, setNotifications] = useState<any[]>([])
  const [guardian, setGuardian] = useState<any>(null)

  useEffect(() => {
    async function loadData() {
      setLoading(true)
      try {
        // Get all patients (guardian can monitor multiple patients)
        const allPatients = await dataFetcher.getAllPatientsForDoctor()
        setPatients(allPatients)
        
        // Get all appointments for linked patients
        const allAppts = await dataFetcher.getAllAppointments()
        setAppointments(allAppts)
        
        // Get vitals history for all patients
        const allVitals: any[] = []
        for (const patient of allPatients.slice(0, 3)) {
          try {
            const vitals = await dataFetcher.getPatientVitals(patient.id)
            allVitals.push(...vitals.map(v => ({ ...v, patientId: patient.id, patientName: patient.name })))
          } catch {}
        }
        setVitalsHistory(allVitals)
        
        // Get notifications (would use guardian userId in real app)
        const notifs = await dataFetcher.getUserNotifications('guardian-001')
        setNotifications(notifs)
        
        // Set guardian info
        setGuardian({
          name: 'Neha Sharma',
          email: 'neha.sharma@example.com',
          phone: '+91-9876543221',
          linkedPatientsCount: allPatients.length
        })
      } catch (error) {
        console.error('Error loading data:', error)
        // Fallback to mock data
        const p = getPatients()
        setPatients(p)
        setAppointments(getAppointments())
        setGuardian({
          name: 'Neha Sharma',
          email: 'neha.sharma@example.com',
          phone: '+91-9876543221'
        })
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  function quickContactDoctor(pid: string) {
    alert('Contacting doctor for patient ' + pid)
  }

  const averageAdherence = patients.length ? Math.round(92 + Math.random()*6) : 0
  const missedDoses = Math.floor(Math.random()*3)
  const linkedPatients = patients

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Home },
    { id: 'patients', label: 'Linked Patients', icon: Users },
    { id: 'health', label: 'Health Monitoring', icon: Heart },
    { id: 'notifications', label: 'Notifications', icon: Bell }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-green-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">Guardian Portal</h1>
              <p className="text-sm text-gray-500 mt-1">Monitor and care for your loved ones</p>
            </div>
            <div className="flex items-center gap-4">
              <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-full transition">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-amber-500 rounded-full"></span>
              </button>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">Guardian Account</p>
                  <p className="text-xs text-gray-500">{linkedPatients.length} Linked Patients</p>
                </div>
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center text-white font-semibold">
                  <Users className="w-5 h-5" />
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
                      ? 'text-emerald-600 border-b-2 border-emerald-600 -mb-px'
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
                <TrendingUp className="w-5 h-5 text-emerald-600" />
                Care Overview
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition">
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2 bg-emerald-50 rounded-lg">
                      <Users className="w-5 h-5 text-emerald-500" />
                    </div>
                    <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded">Active</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{linkedPatients.length}</p>
                  <p className="text-sm text-gray-500 mt-1">Linked Patients</p>
                </div>

                <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition">
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2 bg-green-50 rounded-lg">
                      <TrendingUp className="w-5 h-5 text-green-500" />
                    </div>
                    <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded">Good</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{averageAdherence}%</p>
                  <p className="text-sm text-gray-500 mt-1">Med Adherence</p>
                </div>

                <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition">
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2 bg-red-50 rounded-lg">
                      <AlertCircle className="w-5 h-5 text-red-500" />
                    </div>
                    <span className="text-xs font-medium text-red-600 bg-red-50 px-2 py-1 rounded">Alert</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{missedDoses}</p>
                  <p className="text-sm text-gray-500 mt-1">Missed Doses</p>
                </div>

                <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition">
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <Calendar className="w-5 h-5 text-blue-500" />
                    </div>
                    <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">Upcoming</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{appointments.length}</p>
                  <p className="text-sm text-gray-500 mt-1">Appointments</p>
                </div>
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - 2/3 width */}
              <div className="lg:col-span-2 space-y-6">
                {/* Linked Patient Profiles */}
                <div>
                  <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Users className="w-5 h-5 text-emerald-600" />
                    Linked Patient Profiles
                  </h2>
                  <div className="space-y-4">
                    {linkedPatients.map((patient) => (
                      <div key={patient.id} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                        <div className="flex items-start gap-4">
                          <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                            {patient.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h3 className="text-lg font-bold text-gray-900">{patient.name}</h3>
                                <p className="text-sm text-gray-600">ID: {patient.healthId}</p>
                              </div>
                              <div className="flex items-center gap-1">
                                <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                                <span className="text-xs font-medium text-gray-600">Stable</span>
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-3 gap-3 mb-4">
                              <div className="bg-gradient-to-br from-red-50 to-pink-50 p-2 rounded-lg border border-red-100">
                                <div className="text-xs text-gray-500">Blood Pressure</div>
                                <div className="font-semibold text-gray-900">{patient.vitals?.bp ?? '120/80'}</div>
                              </div>
                              <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-2 rounded-lg border border-purple-100">
                                <div className="text-xs text-gray-500">Blood Sugar</div>
                                <div className="font-semibold text-gray-900">{patient.vitals?.sugar ?? '95'} mg/dL</div>
                              </div>
                              <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-2 rounded-lg border border-orange-100">
                                <div className="text-xs text-gray-500">Temperature</div>
                                <div className="font-semibold text-gray-900">{patient.vitals?.temp ?? '98.4'}°F</div>
                              </div>
                            </div>

                            <div className="flex gap-2">
                              <button 
                                onClick={() => quickContactDoctor(patient.id)} 
                                className="flex-1 px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 transition flex items-center justify-center gap-2"
                              >
                                <Phone className="w-4 h-4" />
                                Contact Doctor
                              </button>
                              <button className="px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition">
                                View Details
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    {!linkedPatients.length && (
                      <div className="text-center py-12 text-gray-500 bg-white rounded-xl shadow-sm border border-gray-100">
                        <Users className="w-16 h-16 mx-auto mb-3 text-gray-300" />
                        <p className="font-medium">No linked patients</p>
                        <p className="text-sm mt-1">Add a patient profile to start monitoring</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Recent Appointments */}
                <div>
                  <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-amber-600" />
                    Recent Appointments
                  </h2>
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <div className="space-y-3">
                      {appointments.filter(a => linkedPatients.some(p => p.id === a.patientId)).map((appointment) => {
                        const patient = linkedPatients.find(p => p.id === appointment.patientId)
                        return (
                          <div key={appointment.id} className="flex items-center gap-4 p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg border border-amber-100">
                            <div className="p-3 bg-white rounded-lg shadow-sm">
                              <Calendar className="w-5 h-5 text-amber-600" />
                            </div>
                            <div className="flex-1">
                              <p className="font-semibold text-gray-900">{patient?.name}</p>
                              <p className="text-sm text-gray-600">{appointment.doctor} • {formatDatetime(appointment.datetime)}</p>
                            </div>
                            <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">
                              {appointment.status}
                            </span>
                          </div>
                        )
                      })}
                      {!appointments.filter(a => linkedPatients.some(p => p.id === a.patientId)).length && (
                        <div className="text-sm text-gray-500 text-center py-6">No recent appointments</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - 1/3 width */}
              <div className="space-y-6">
                {/* Health Overview */}
                <div>
                  <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Activity className="w-5 h-5 text-emerald-600" />
                    Health Summary
                  </h2>
                  <div className="bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl p-6 text-white shadow-lg">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-white/20 rounded-lg backdrop-blur">
                        <Activity className="w-5 h-5" />
                      </div>
                      <h2 className="text-lg font-semibold">Health Overview</h2>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-amber-100">Medication Adherence</span>
                          <span className="font-bold">{averageAdherence}%</span>
                        </div>
                        <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                          <div className="h-full bg-white rounded-full" style={{ width: `${averageAdherence}%` }}></div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-white/10 backdrop-blur rounded-lg">
                        <span className="text-sm">Missed Doses This Week</span>
                        <span className="font-bold text-xl">{missedDoses}</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-white/10 backdrop-blur rounded-lg">
                        <span className="text-sm">Next Checkup</span>
                        <span className="font-semibold">In 5 days</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Emergency Contacts */}
                <div>
                  <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-red-600" />
                    Emergency Contact
                  </h2>
                  <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 space-y-2">
                    <button className="w-full px-4 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition flex items-center justify-center gap-2">
                      <Phone className="w-5 h-5" />
                      Call Doctor
                    </button>
                    <button className="w-full px-4 py-3 bg-amber-600 text-white font-semibold rounded-lg hover:bg-amber-700 transition flex items-center justify-center gap-2">
                      <Pill className="w-5 h-5" />
                      Call Pharmacy
                    </button>
                    <button className="w-full px-4 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2">
                      <MessageCircle className="w-5 h-5" />
                      Message Support
                    </button>
                  </div>
                </div>

                {/* Notifications */}
                <div>
                  <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Bell className="w-5 h-5 text-amber-600" />
                    Notifications
                  </h2>
                  <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 space-y-3">
                    <div className="flex items-start gap-3 p-3 bg-amber-50 rounded-lg border border-amber-200">
                      <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Medication Reminder</p>
                        <p className="text-xs text-gray-600 mt-1">John's evening medication is due in 30 minutes</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <FileText className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Lab Results Ready</p>
                        <p className="text-xs text-gray-600 mt-1">New test results available for Sarah</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                      <Heart className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Vitals Updated</p>
                        <p className="text-xs text-gray-600 mt-1">All vitals within normal range</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div>
                  <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Activity className="w-5 h-5 text-amber-600" />
                    Quick Actions
                  </h2>
                  <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 space-y-2">
                    <button className="w-full text-left p-3 hover:bg-amber-50 rounded-lg transition text-sm font-medium text-gray-700 flex items-center gap-2">
                      <Pill className="w-4 h-4 text-gray-400" />
                      View Medication Schedule
                    </button>
                    <button className="w-full text-left p-3 hover:bg-amber-50 rounded-lg transition text-sm font-medium text-gray-700 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      Check Appointment History
                    </button>
                    <button className="w-full text-left p-3 hover:bg-amber-50 rounded-lg transition text-sm font-medium text-gray-700 flex items-center gap-2">
                      <FileText className="w-4 h-4 text-gray-400" />
                      Download Health Reports
                    </button>
                    <button className="w-full text-left p-3 hover:bg-amber-50 rounded-lg transition text-sm font-medium text-gray-700 flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-400" />
                      Update Patient Info
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'patients' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Linked Patients</h2>
              <button className="px-4 py-2 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition">
                Link New Patient
              </button>
            </div>

            {loading ? (
              <div className="text-center py-20">
                <Loader2 className="w-8 h-8 mx-auto animate-spin text-emerald-600 mb-4" />
                <p className="text-gray-600">Loading patients...</p>
              </div>
            ) : patients.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {patients.map((patient) => (
                  <div key={patient.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                        {patient.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900">{patient.name}</h3>
                        <p className="text-sm text-gray-600">ID: {patient.healthId}</p>
                        <p className="text-xs text-gray-500">Age: {patient.age} years</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                        <span className="text-xs font-medium text-gray-600">Stable</span>
                      </div>
                    </div>

                    {patient.vitals && (
                      <div className="grid grid-cols-3 gap-3 mb-4">
                        <div className="bg-gradient-to-br from-red-50 to-pink-50 p-3 rounded-lg border border-red-100">
                          <div className="text-xs text-gray-500">Blood Pressure</div>
                          <div className="font-semibold text-gray-900">{patient.vitals.bp || '120/80'}</div>
                        </div>
                        <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-3 rounded-lg border border-purple-100">
                          <div className="text-xs text-gray-500">Blood Sugar</div>
                          <div className="font-semibold text-gray-900">{patient.vitals.sugar || '95'} mg/dL</div>
                        </div>
                        <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-3 rounded-lg border border-orange-100">
                          <div className="text-xs text-gray-500">Temperature</div>
                          <div className="font-semibold text-gray-900">{patient.vitals.temp || '98.4'}°F</div>
                        </div>
                      </div>
                    )}

                    <div className="flex gap-2 pt-4 border-t border-gray-200">
                      <button 
                        onClick={() => quickContactDoctor(patient.id)} 
                        className="flex-1 px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 transition flex items-center justify-center gap-2"
                      >
                        <Phone className="w-4 h-4" />
                        Contact Doctor
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
                <Users className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">No Linked Patients</h3>
                <p className="text-gray-600 mb-4">You haven't linked any patient profiles yet.</p>
                <button className="px-6 py-3 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition">
                  Link Your First Patient
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'health' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Health Monitoring</h2>

            {loading ? (
              <div className="text-center py-20">
                <Loader2 className="w-8 h-8 mx-auto animate-spin text-emerald-600 mb-4" />
                <p className="text-gray-600">Loading health data...</p>
              </div>
            ) : vitalsHistory.length > 0 ? (
              <>
                {/* Vitals History by Patient */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Activity className="w-5 h-5 text-emerald-600" />
                    Recent Vitals History
                  </h3>
                  <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Patient</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">BP</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sugar</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Temp</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Pulse</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Weight</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Recorded By</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {vitalsHistory.slice(0, 20).map((vital, idx) => (
                            <tr key={idx} className="hover:bg-gray-50">
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center gap-2">
                                  <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                                    {vital.patientName?.split(' ').map((n: string) => n[0]).join('').slice(0, 2) || 'P'}
                                  </div>
                                  <span className="text-sm font-medium text-gray-900">{vital.patientName || 'Unknown'}</span>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {formatDatetime(vital.recordedAt || new Date().toISOString())}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{vital.bp}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{vital.sugar} mg/dL</td>
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
                </div>

                {/* Health Trends Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {patients.slice(0, 3).map((patient) => {
                    const patientVitals = vitalsHistory.filter(v => v.patientId === patient.id)
                    const latestVital = patientVitals[0]
                    
                    return (
                      <div key={patient.id} className="bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl p-6 text-white">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="text-lg font-semibold">{patient.name}</h4>
                          <Heart className="w-6 h-6 text-white/80" />
                        </div>
                        {latestVital && (
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-emerald-100 text-sm">Blood Pressure</span>
                              <span className="font-bold">{latestVital.bp}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-emerald-100 text-sm">Blood Sugar</span>
                              <span className="font-bold">{latestVital.sugar} mg/dL</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-emerald-100 text-sm">Last Recorded</span>
                              <span className="text-xs">{formatDatetime(latestVital.recordedAt).split(',')[0]}</span>
                            </div>
                          </div>
                        )}
                        <button className="w-full mt-4 px-4 py-2 bg-white text-emerald-600 font-medium rounded-lg hover:bg-white/90 transition">
                          View Full History
                        </button>
                      </div>
                    )
                  })}
                </div>
              </>
            ) : (
              <div className="bg-white rounded-xl p-12 text-center border border-gray-100">
                <Heart className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">No Health Data</h3>
                <p className="text-gray-600">Health monitoring data will appear here once patients start recording vitals.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Notifications</h2>
              <button className="px-4 py-2 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition">
                Mark All as Read
              </button>
            </div>

            {loading ? (
              <div className="text-center py-20">
                <Loader2 className="w-8 h-8 mx-auto animate-spin text-emerald-600 mb-4" />
                <p className="text-gray-600">Loading notifications...</p>
              </div>
            ) : notifications.length > 0 ? (
              <div className="space-y-4">
                {notifications.map((notif) => (
                  <div key={notif.id} className={`bg-white rounded-xl p-6 shadow-sm border ${
                    notif.isRead ? 'border-gray-100' : 'border-emerald-200 bg-emerald-50/30'
                  }`}>
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-lg ${
                        notif.type === 'medication' ? 'bg-red-100' :
                        notif.type === 'appointment' ? 'bg-blue-100' :
                        notif.type === 'lab_result' ? 'bg-green-100' :
                        'bg-gray-100'
                      }`}>
                        {notif.type === 'medication' && <Pill className="w-5 h-5 text-red-600" />}
                        {notif.type === 'appointment' && <Calendar className="w-5 h-5 text-blue-600" />}
                        {notif.type === 'lab_result' && <FileText className="w-5 h-5 text-green-600" />}
                        {notif.type === 'general' && <Bell className="w-5 h-5 text-gray-600" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-gray-900">{notif.title}</h3>
                            <p className="text-sm text-gray-600 mt-1">{notif.message}</p>
                            <p className="text-xs text-gray-500 mt-2">
                              {formatDatetime(notif.createdAt || new Date().toISOString())}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            {!notif.isRead && (
                              <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                            )}
                            <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                              notif.priority === 'high' ? 'bg-red-100 text-red-700' :
                              notif.priority === 'medium' ? 'bg-orange-100 text-orange-700' :
                              'bg-gray-100 text-gray-700'
                            }`}>
                              {notif.priority}
                            </span>
                          </div>
                        </div>
                        {notif.actionUrl && (
                          <button className="mt-3 px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 transition">
                            View Details
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl p-12 text-center border border-gray-100">
                <Bell className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">No Notifications</h3>
                <p className="text-gray-600">You're all caught up! No new notifications.</p>
              </div>
            )}
          </div>
        )}
        </div>

      <VitaBot role="guardian" />
    </div>
  )
}
