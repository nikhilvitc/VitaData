import React, { useEffect, useState } from 'react'
import { Package, Truck, Clock, CheckCircle, AlertTriangle, TrendingUp, Pill, FileText, MapPin, Phone, BarChart, Calendar, Home, Users, Settings, Loader2 } from 'lucide-react'
import VitaBot from '../components/VitaBot'
import { getOrders, updateOrder, getPrescriptions, formatDatetime } from '../lib/mockData'
import { dataFetcher } from '../lib/dataFetcher'

export default function PharmacyDashboard(){
  const [activeTab, setActiveTab] = useState('overview')
  const [loading, setLoading] = useState(true)
  const [orders, setOrders] = useState([] as any[])
  const [prescriptions, setPrescriptions] = useState<any[]>([])
  const [pharmacy, setPharmacy] = useState<any>(null)

  useEffect(() => {
    async function loadData() {
      setLoading(true)
      try {
        // Get all orders for pharmacy
        const allOrders = await dataFetcher.getPatientOrders('') // Will use mock data
        setOrders(allOrders)
        
        // Get prescriptions
        const allPrescs = getPrescriptions()
        setPrescriptions(allPrescs)
        
        // Set mock pharmacy data
        setPharmacy({
          name: 'Apollo Pharmacy',
          licenseNumber: 'PH-KA-001',
          phone: '+91-80-26304567',
          address: 'MG Road, Near Metro Station, Bangalore - 560001',
          workingHours: '08:00 - 22:00',
          deliveryAvailable: true
        })
      } catch (error) {
        console.error('Error loading data:', error)
        // Fallback to mock data
    setOrders(getOrders())
        setPrescriptions(getPrescriptions())
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  function setStatus(id: string, status: 'in_progress' | 'delivered' | 'pending') {
    updateOrder(id, { status })
    setOrders(getOrders())
  }

  const pendingOrders = orders.filter(o => o.status === 'pending')
  const inProgressOrders = orders.filter(o => o.status === 'in_progress')
  const deliveredOrders = orders.filter(o => o.status === 'delivered')
  
  // Mock inventory data
  const inventoryItems = [
    { name: 'Paracetamol 500mg', stock: 45, unit: 'strips', status: 'low', minStock: 50 },
    { name: 'Amoxicillin 250mg', stock: 120, unit: 'capsules', status: 'medium', minStock: 100 },
    { name: 'Metformin 500mg', stock: 350, unit: 'tablets', status: 'good', minStock: 200 },
    { name: 'Amlodipine 5mg', stock: 180, unit: 'tablets', status: 'good', minStock: 150 },
    { name: 'Salbutamol Inhaler', stock: 25, unit: 'units', status: 'low', minStock: 30 },
    { name: 'Montelukast 10mg', stock: 200, unit: 'tablets', status: 'good', minStock: 150 },
    { name: 'Glimepiride 2mg', stock: 95, unit: 'tablets', status: 'medium', minStock: 100 },
    { name: 'Methotrexate 10mg', stock: 60, unit: 'tablets', status: 'good', minStock: 50 }
  ]
  
  // Mock delivery partners
  const deliveryPartners = [
    { id: '1', name: 'Raj Kumar', status: 'active', deliveries: 2, phone: '+91-98765-43210' },
    { id: '2', name: 'Priya Sharma', status: 'active', deliveries: 1, phone: '+91-98765-43211' },
    { id: '3', name: 'Amit Patel', status: 'offline', deliveries: 0, phone: '+91-98765-43212' },
    { id: '4', name: 'Suresh Reddy', status: 'active', deliveries: 3, phone: '+91-98765-43213' }
  ]

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Home },
    { id: 'orders', label: 'Orders', icon: Package },
    { id: 'inventory', label: 'Inventory', icon: Pill },
    { id: 'delivery', label: 'Delivery', icon: Truck }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-amber-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">Pharmacy Hub</h1>
              <p className="text-sm text-gray-500 mt-1">City Pharmacy - Delivery Management</p>
            </div>
            <div className="flex items-center gap-4">
              <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-full transition">
                <AlertTriangle className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-orange-500 rounded-full"></span>
              </button>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">City Pharmacy</p>
                  <p className="text-xs text-gray-500">Manager Dashboard</p>
                </div>
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-600 rounded-full flex items-center justify-center text-white font-semibold">
                  <Pill className="w-5 h-5" />
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
                      ? 'text-orange-600 border-b-2 border-orange-600 -mb-px'
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
                <TrendingUp className="w-5 h-5 text-orange-600" />
                Business Metrics
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition">
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2 bg-orange-50 rounded-lg">
                      <Clock className="w-5 h-5 text-orange-500" />
                    </div>
                    <span className="text-xs font-medium text-orange-600 bg-orange-50 px-2 py-1 rounded">Pending</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{pendingOrders.length}</p>
                  <p className="text-sm text-gray-500 mt-1">New Orders</p>
                </div>

                <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition">
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <Truck className="w-5 h-5 text-blue-500" />
                    </div>
                    <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">Active</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{inProgressOrders.length}</p>
                  <p className="text-sm text-gray-500 mt-1">In Delivery</p>
                </div>

                <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition">
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2 bg-green-50 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    </div>
                    <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded">Today</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{deliveredOrders.length}</p>
                  <p className="text-sm text-gray-500 mt-1">Delivered</p>
                </div>

                <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition">
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2 bg-orange-50 rounded-lg">
                      <TrendingUp className="w-5 h-5 text-orange-500" />
                    </div>
                    <span className="text-xs font-medium text-orange-600 bg-orange-50 px-2 py-1 rounded">+15%</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">₹{Math.floor(orders.length * 450)}</p>
                  <p className="text-sm text-gray-500 mt-1">Today's Revenue</p>
                </div>
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - 2/3 width */}
              <div className="lg:col-span-2 space-y-6">
                {/* Active Orders */}
                <div>
                  <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Package className="w-5 h-5 text-orange-600" />
                    Active Orders
                  </h2>
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <div className="space-y-3">
                      {orders.length ? (
                        orders.map((order) => (
                          <div key={order.id} className="p-5 bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl border border-orange-100">
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex items-start gap-4">
                                <div className="p-3 bg-white rounded-lg shadow-sm">
                                  <Package className="w-6 h-6 text-orange-600" />
                                </div>
                                <div>
                                  <h3 className="font-bold text-gray-900">Order #{order.id.substring(0, 8)}</h3>
                                  <p className="text-sm text-gray-600 mt-1">Prescription ID: {order.prescriptionId}</p>
                                  <p className="text-xs text-gray-500 mt-1">{formatDatetime(order.createdAt)}</p>
                                </div>
                              </div>
                              <div>
                                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                                  order.status === 'pending' ? 'bg-orange-100 text-orange-700' :
                                  order.status === 'in_progress' ? 'bg-blue-100 text-blue-700' :
                                  'bg-green-100 text-green-700'
                                }`}>
                                  {order.status === 'pending' ? 'Pending' :
                                   order.status === 'in_progress' ? 'In Progress' : 'Delivered'}
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center gap-3 p-3 bg-white/70 rounded-lg mb-3">
                              <MapPin className="w-4 h-4 text-gray-400" />
                              <div className="flex-1">
                                <p className="text-sm font-medium text-gray-900">Delivery Address</p>
                                <p className="text-xs text-gray-600">123 Main Street, Bangalore - 560001</p>
                              </div>
                              <Phone className="w-4 h-4 text-gray-400" />
                            </div>

                            <div className="flex gap-2">
                              {order.status === 'pending' && (
                                <button 
                                  onClick={() => setStatus(order.id, 'in_progress')} 
                                  className="flex-1 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition"
                                >
                                  Start Processing
                                </button>
                              )}
                              {order.status === 'in_progress' && (
                                <button 
                                  onClick={() => setStatus(order.id, 'delivered')} 
                                  className="flex-1 px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition"
                                >
                                  Mark as Delivered
                                </button>
                              )}
                              <button className="px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition">
                                View Details
                              </button>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-12 text-gray-500">
                          <Package className="w-16 h-16 mx-auto mb-3 text-gray-300" />
                          <p className="font-medium">No orders</p>
                          <p className="text-sm mt-1">New orders will appear here</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Recent Prescriptions */}
                <div>
                  <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-orange-600" />
                    Recent Prescriptions
                  </h2>
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <div className="space-y-3">
                      {prescriptions.map((prescription) => (
                        <div key={prescription.id} className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition">
                          <div className="p-3 bg-white rounded-lg shadow-sm">
                            <FileText className="w-5 h-5 text-orange-600" />
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold text-gray-900">{prescription.title}</p>
                            <p className="text-sm text-gray-600">{formatDatetime(prescription.issuedOn)}</p>
                            <div className="flex gap-2 mt-2">
                              {prescription.medicines.map((med, idx) => (
                                <span key={idx} className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full">
                                  {med.name}
                                </span>
                              ))}
                            </div>
                          </div>
                          <button className="px-4 py-2 bg-orange-600 text-white text-sm font-medium rounded-lg hover:bg-orange-700 transition">
                            Process
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - 1/3 width */}
              <div className="space-y-6">
                {/* Inventory Alerts */}
                <div>
                  <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-orange-600" />
                    Inventory Alerts
                  </h2>
                  <div className="bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl p-6 text-white shadow-lg">
                    <div className="space-y-3">
                      <div className="p-3 bg-white/10 backdrop-blur rounded-lg">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium">Paracetamol 500mg</span>
                          <span className="text-xs bg-red-500/30 px-2 py-1 rounded-full">Low Stock</span>
                        </div>
                        <div className="text-xs text-orange-100">Only 45 units remaining</div>
                      </div>
                      <div className="p-3 bg-white/10 backdrop-blur rounded-lg">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium">Amoxicillin 250mg</span>
                          <span className="text-xs bg-orange-500/30 px-2 py-1 rounded-full">Medium</span>
                        </div>
                        <div className="text-xs text-orange-100">120 units in stock</div>
                      </div>
                      <div className="p-3 bg-white/10 backdrop-blur rounded-lg">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium">Metformin 500mg</span>
                          <span className="text-xs bg-green-500/30 px-2 py-1 rounded-full">Good</span>
                        </div>
                        <div className="text-xs text-orange-100">350 units in stock</div>
                      </div>
                    </div>
                    <button className="w-full mt-4 px-4 py-2 bg-white text-orange-600 font-medium rounded-lg hover:bg-white/90 transition">
                      Manage Inventory
                    </button>
                  </div>
                </div>

                {/* Delivery Partners */}
                <div>
                  <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Truck className="w-5 h-5 text-orange-600" />
                    Delivery Partners
                  </h2>
                  <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 space-y-3">
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div>
                        <p className="text-sm font-medium text-gray-900">Raj Kumar</p>
                        <p className="text-xs text-gray-600">Active • 2 deliveries</p>
                      </div>
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                      <div>
                        <p className="text-sm font-medium text-gray-900">Priya Sharma</p>
                        <p className="text-xs text-gray-600">Active • 1 delivery</p>
                      </div>
                      <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div>
                        <p className="text-sm font-medium text-gray-900">Amit Patel</p>
                        <p className="text-xs text-gray-600">Offline</p>
                      </div>
                      <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                    </div>
                    <button className="w-full mt-4 px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition">
                      Assign Delivery
                    </button>
                  </div>
                </div>

                {/* Today's Stats */}
                <div>
                  <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <BarChart className="w-5 h-5 text-orange-600" />
                    Today's Stats
                  </h2>
                  <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg">
                      <span className="text-sm text-gray-700">Orders Processed</span>
                      <span className="font-bold text-gray-900">{orders.length}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg">
                      <span className="text-sm text-gray-700">Deliveries Made</span>
                      <span className="font-bold text-gray-900">{deliveredOrders.length}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
                      <span className="text-sm text-gray-700">Revenue</span>
                      <span className="font-bold text-gray-900">₹{Math.floor(orders.length * 450)}</span>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div>
                  <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Package className="w-5 h-5 text-orange-600" />
                    Quick Actions
                  </h2>
                  <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 space-y-2">
                    <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-orange-50 rounded-lg transition group">
                      <Package className="w-5 h-5 text-gray-400 group-hover:text-orange-600" />
                      <span className="text-sm font-medium text-gray-700 group-hover:text-orange-600">Create New Order</span>
                    </button>
                    <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-orange-50 rounded-lg transition group">
                      <Pill className="w-5 h-5 text-gray-400 group-hover:text-orange-600" />
                      <span className="text-sm font-medium text-gray-700 group-hover:text-orange-600">Update Stock</span>
                    </button>
                    <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-orange-50 rounded-lg transition group">
                      <Calendar className="w-5 h-5 text-gray-400 group-hover:text-orange-600" />
                      <span className="text-sm font-medium text-gray-700 group-hover:text-orange-600">View Reports</span>
                    </button>
                    <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-orange-50 rounded-lg transition group">
                      <FileText className="w-5 h-5 text-gray-400 group-hover:text-orange-600" />
                      <span className="text-sm font-medium text-gray-700 group-hover:text-orange-600">Print Invoice</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'orders' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Orders Management</h2>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">
                  <span className="font-semibold text-orange-600">{pendingOrders.length}</span> Pending
                </span>
                <span className="text-sm text-gray-600">
                  <span className="font-semibold text-blue-600">{inProgressOrders.length}</span> In Progress
                </span>
                <span className="text-sm text-gray-600">
                  <span className="font-semibold text-green-600">{deliveredOrders.length}</span> Delivered
                </span>
              </div>
            </div>

            {loading ? (
          <div className="text-center py-20">
                <Loader2 className="w-8 h-8 mx-auto animate-spin text-orange-600 mb-4" />
                <p className="text-gray-300">Loading orders...</p>
              </div>
            ) : orders.length > 0 ? (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-gradient-to-br from-orange-500 to-amber-600 rounded-lg">
                          <Package className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">Order #{order.id.substring(0, 8)}</h3>
                          <p className="text-sm text-gray-600 mt-1">Prescription ID: {order.prescriptionId || 'N/A'}</p>
                          <p className="text-xs text-gray-500 mt-1">{formatDatetime(order.createdAt)}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                          order.status === 'pending' ? 'bg-orange-100 text-orange-700' :
                          order.status === 'in_progress' ? 'bg-blue-100 text-blue-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                          {order.status === 'pending' ? 'Pending' :
                           order.status === 'in_progress' ? 'In Progress' : 'Delivered'}
                        </span>
                        {order.totalAmount > 0 && (
                          <p className="text-lg font-bold text-gray-900 mt-2">₹{order.totalAmount}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">Delivery Address</p>
                          <p className="text-xs text-gray-600">123 Main Street, Bangalore - 560001</p>
                        </div>
                      </div>
                      {order.trackingId && (
                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                          <Truck className="w-4 h-4 text-gray-400" />
                          <div>
                            <p className="text-sm font-medium text-gray-900">Tracking ID</p>
                            <p className="text-xs text-gray-600 font-mono">{order.trackingId}</p>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2">
                      {order.status === 'pending' && (
                        <button
                          onClick={() => setStatus(order.id, 'in_progress')}
                          className="flex-1 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition"
                        >
                          Start Processing
                        </button>
                      )}
                      {order.status === 'in_progress' && (
                        <button
                          onClick={() => setStatus(order.id, 'delivered')}
                          className="flex-1 px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition"
                        >
                          Mark as Delivered
                        </button>
                      )}
                      <button className="px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition">
                        View Details
                      </button>
                      <button className="px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition">
                        Print Invoice
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl p-12 text-center border border-gray-100">
            <Package className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">No Orders</h3>
                <p className="text-gray-600">You don't have any orders yet.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'inventory' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Inventory Management</h2>
              <button className="px-4 py-2 bg-orange-600 text-white font-medium rounded-lg hover:bg-orange-700 transition">
                Add Medicine
              </button>
            </div>

            {loading ? (
          <div className="text-center py-20">
                <Loader2 className="w-8 h-8 mx-auto animate-spin text-orange-600 mb-4" />
                <p className="text-gray-600">Loading inventory...</p>
              </div>
            ) : (
              <>
                {/* Inventory Summary */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-2xl font-bold text-red-600">
                          {inventoryItems.filter(i => i.status === 'low').length}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">Low Stock</p>
                      </div>
                      <AlertTriangle className="w-8 h-8 text-red-500" />
                    </div>
                  </div>
                  <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-2xl font-bold text-orange-600">
                          {inventoryItems.filter(i => i.status === 'medium').length}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">Medium Stock</p>
                      </div>
                      <Clock className="w-8 h-8 text-orange-500" />
                    </div>
                  </div>
                  <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-2xl font-bold text-green-600">
                          {inventoryItems.filter(i => i.status === 'good').length}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">Good Stock</p>
                      </div>
                      <CheckCircle className="w-8 h-8 text-green-500" />
                    </div>
                  </div>
                  <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-2xl font-bold text-gray-900">{inventoryItems.length}</p>
                        <p className="text-sm text-gray-600 mt-1">Total Items</p>
                      </div>
                      <Pill className="w-8 h-8 text-gray-500" />
                    </div>
                  </div>
                </div>

                {/* Inventory Table */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Medicine</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Min. Stock</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {inventoryItems.map((item, idx) => (
                          <tr key={idx} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-600 rounded-lg flex items-center justify-center">
                                  <Pill className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                  <p className="font-medium text-gray-900">{item.name}</p>
                                  <p className="text-xs text-gray-500">{item.unit}</p>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <p className="text-sm font-semibold text-gray-900">{item.stock}</p>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <p className="text-sm text-gray-600">{item.minStock}</p>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`text-xs font-medium px-3 py-1 rounded-full ${
                                item.status === 'low' ? 'bg-red-100 text-red-700' :
                                item.status === 'medium' ? 'bg-orange-100 text-orange-700' :
                                'bg-green-100 text-green-700'
                              }`}>
                                {item.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <button className="px-3 py-1 text-sm text-orange-600 hover:bg-orange-50 rounded-lg transition">
                                Reorder
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {activeTab === 'delivery' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Delivery Management</h2>
              <button className="px-4 py-2 bg-orange-600 text-white font-medium rounded-lg hover:bg-orange-700 transition">
                Add Delivery Partner
              </button>
            </div>

            {loading ? (
          <div className="text-center py-20">
                <Loader2 className="w-8 h-8 mx-auto animate-spin text-orange-600 mb-4" />
                <p className="text-gray-600">Loading delivery data...</p>
              </div>
            ) : (
              <>
                {/* Active Deliveries */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Truck className="w-5 h-5 text-orange-600" />
                    Active Deliveries
                  </h3>
                  <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    {inProgressOrders.length > 0 ? (
                      <div className="divide-y divide-gray-200">
                        {inProgressOrders.map((order) => (
                          <div key={order.id} className="p-6">
                            <div className="flex items-start justify-between">
                              <div className="flex items-start gap-4">
                                <div className="p-3 bg-blue-50 rounded-lg">
                                  <Truck className="w-6 h-6 text-blue-600" />
                                </div>
                                <div>
                                  <h4 className="font-semibold text-gray-900">Order #{order.id.substring(0, 8)}</h4>
                                  <p className="text-sm text-gray-600 mt-1">Delivery in progress</p>
                                  <div className="flex items-center gap-4 mt-2">
                                    <div className="flex items-center gap-2">
                                      <MapPin className="w-4 h-4 text-gray-400" />
                                      <span className="text-xs text-gray-600">123 Main Street, Bangalore</span>
                                    </div>
                                    {order.trackingId && (
                                      <div className="flex items-center gap-2">
                                        <FileText className="w-4 h-4 text-gray-400" />
                                        <span className="text-xs text-gray-600 font-mono">{order.trackingId}</span>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div className="text-right">
                                <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">
                                  In Transit
                                </span>
                                <p className="text-xs text-gray-500 mt-2">ETA: 2 hours</p>
                              </div>
                            </div>
                            <div className="mt-4 flex gap-2">
                              <button className="px-4 py-2 bg-orange-600 text-white text-sm font-medium rounded-lg hover:bg-orange-700 transition">
                                Track Delivery
                              </button>
                              <button className="px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition">
                                Contact Partner
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="p-12 text-center">
                        <Truck className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                        <p className="text-gray-600">No active deliveries</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Delivery Partners */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Users className="w-5 h-5 text-orange-600" />
                    Delivery Partners
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {deliveryPartners.map((partner) => (
                      <div key={partner.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                              partner.status === 'active' 
                                ? 'bg-green-100' 
                                : 'bg-gray-100'
                            }`}>
                              <Users className={`w-6 h-6 ${
                                partner.status === 'active' ? 'text-green-600' : 'text-gray-400'
                              }`} />
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900">{partner.name}</h4>
                              <p className="text-xs text-gray-600">{partner.phone}</p>
                            </div>
                          </div>
                          <span className={`w-3 h-3 rounded-full ${
                            partner.status === 'active' ? 'bg-green-500' : 'bg-gray-400'
                          }`}></span>
                        </div>
                        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                          <div>
                            <p className="text-xs text-gray-500">Today's Deliveries</p>
                            <p className="text-lg font-bold text-gray-900">{partner.deliveries}</p>
                          </div>
                          <div className="flex gap-2">
                            <button className="px-3 py-1 text-sm bg-orange-50 text-orange-600 rounded-lg hover:bg-orange-100 transition">
                              <Phone className="w-4 h-4" />
                            </button>
                            <button className="px-3 py-1 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition">
                              Assign
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Delivery Statistics */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <BarChart className="w-5 h-5 text-orange-600" />
                    Delivery Statistics
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl p-6 text-white">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-3xl font-bold">{inProgressOrders.length}</p>
                          <p className="text-orange-100 mt-1">In Transit</p>
                        </div>
                        <Truck className="w-10 h-10 text-white/80" />
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-6 text-white">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-3xl font-bold">{deliveredOrders.length}</p>
                          <p className="text-green-100 mt-1">Completed Today</p>
                        </div>
                        <CheckCircle className="w-10 h-10 text-white/80" />
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl p-6 text-white">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-3xl font-bold">{deliveryPartners.filter(p => p.status === 'active').length}</p>
                          <p className="text-blue-100 mt-1">Active Partners</p>
                        </div>
                        <Users className="w-10 h-10 text-white/80" />
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      <VitaBot role="pharmacy" />
    </div>
  )
}
