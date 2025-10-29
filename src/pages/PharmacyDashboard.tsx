import React, { useEffect, useState } from 'react'
import { Package, Truck, Clock, CheckCircle, AlertTriangle, TrendingUp, Pill, FileText, MapPin, Phone, BarChart, Calendar, Home, Users, Settings } from 'lucide-react'
import VitaBot from '../components/VitaBot'
import { getOrders, updateOrder, getPrescriptions, formatDatetime } from '../lib/mockData'

export default function PharmacyDashboard(){
  const [activeTab, setActiveTab] = useState('overview')
  const [orders, setOrders] = useState([] as any[])

  useEffect(() => {
    setOrders(getOrders())
  }, [])

  function setStatus(id: string, status: 'in_progress' | 'delivered' | 'pending') {
    updateOrder(id, { status })
    setOrders(getOrders())
  }

  const prescriptions = getPrescriptions()
  const pendingOrders = orders.filter(o => o.status === 'pending')
  const inProgressOrders = orders.filter(o => o.status === 'in_progress')
  const deliveredOrders = orders.filter(o => o.status === 'delivered')

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Home },
    { id: 'orders', label: 'Orders', icon: Package },
    { id: 'inventory', label: 'Inventory', icon: Pill },
    { id: 'delivery', label: 'Delivery', icon: Truck }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Pharmacy Hub</h1>
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
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white font-semibold">
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
                    <div className="p-2 bg-purple-50 rounded-lg">
                      <TrendingUp className="w-5 h-5 text-purple-500" />
                    </div>
                    <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded">+15%</span>
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
                    <Package className="w-5 h-5 text-purple-600" />
                    Active Orders
                  </h2>
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <div className="space-y-3">
                      {orders.length ? (
                        orders.map((order) => (
                          <div key={order.id} className="p-5 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-100">
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex items-start gap-4">
                                <div className="p-3 bg-white rounded-lg shadow-sm">
                                  <Package className="w-6 h-6 text-purple-600" />
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
                    <FileText className="w-5 h-5 text-purple-600" />
                    Recent Prescriptions
                  </h2>
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <div className="space-y-3">
                      {prescriptions.map((prescription) => (
                        <div key={prescription.id} className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition">
                          <div className="p-3 bg-white rounded-lg shadow-sm">
                            <FileText className="w-5 h-5 text-purple-600" />
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold text-gray-900">{prescription.title}</p>
                            <p className="text-sm text-gray-600">{formatDatetime(prescription.issuedOn)}</p>
                            <div className="flex gap-2 mt-2">
                              {prescription.medicines.map((med, idx) => (
                                <span key={idx} className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                                  {med.name}
                                </span>
                              ))}
                            </div>
                          </div>
                          <button className="px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 transition">
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
                    <AlertTriangle className="w-5 h-5 text-purple-600" />
                    Inventory Alerts
                  </h2>
                  <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl p-6 text-white shadow-lg">
                    <div className="space-y-3">
                      <div className="p-3 bg-white/10 backdrop-blur rounded-lg">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium">Paracetamol 500mg</span>
                          <span className="text-xs bg-red-500/30 px-2 py-1 rounded-full">Low Stock</span>
                        </div>
                        <div className="text-xs text-purple-100">Only 45 units remaining</div>
                      </div>
                      <div className="p-3 bg-white/10 backdrop-blur rounded-lg">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium">Amoxicillin 250mg</span>
                          <span className="text-xs bg-orange-500/30 px-2 py-1 rounded-full">Medium</span>
                        </div>
                        <div className="text-xs text-purple-100">120 units in stock</div>
                      </div>
                      <div className="p-3 bg-white/10 backdrop-blur rounded-lg">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium">Metformin 500mg</span>
                          <span className="text-xs bg-green-500/30 px-2 py-1 rounded-full">Good</span>
                        </div>
                        <div className="text-xs text-purple-100">350 units in stock</div>
                      </div>
                    </div>
                    <button className="w-full mt-4 px-4 py-2 bg-white text-purple-600 font-medium rounded-lg hover:bg-white/90 transition">
                      Manage Inventory
                    </button>
                  </div>
                </div>

                {/* Delivery Partners */}
                <div>
                  <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Truck className="w-5 h-5 text-purple-600" />
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
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div>
                        <p className="text-sm font-medium text-gray-900">Priya Sharma</p>
                        <p className="text-xs text-gray-600">Active • 1 delivery</p>
                      </div>
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
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
                    <BarChart className="w-5 h-5 text-purple-600" />
                    Today's Stats
                  </h2>
                  <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
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
                    <Package className="w-5 h-5 text-purple-600" />
                    Quick Actions
                  </h2>
                  <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 space-y-2">
                    <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-purple-50 rounded-lg transition group">
                      <Package className="w-5 h-5 text-gray-400 group-hover:text-purple-600" />
                      <span className="text-sm font-medium text-gray-700 group-hover:text-purple-600">Create New Order</span>
                    </button>
                    <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-purple-50 rounded-lg transition group">
                      <Pill className="w-5 h-5 text-gray-400 group-hover:text-purple-600" />
                      <span className="text-sm font-medium text-gray-700 group-hover:text-purple-600">Update Stock</span>
                    </button>
                    <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-purple-50 rounded-lg transition group">
                      <Calendar className="w-5 h-5 text-gray-400 group-hover:text-purple-600" />
                      <span className="text-sm font-medium text-gray-700 group-hover:text-purple-600">View Reports</span>
                    </button>
                    <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-purple-50 rounded-lg transition group">
                      <FileText className="w-5 h-5 text-gray-400 group-hover:text-purple-600" />
                      <span className="text-sm font-medium text-gray-700 group-hover:text-purple-600">Print Invoice</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'orders' && (
          <div className="text-center py-20">
            <Package className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Orders Management</h3>
            <p className="text-gray-600">Manage all your pharmacy orders</p>
            <p className="text-sm text-gray-400 mt-4">Coming soon...</p>
          </div>
        )}

        {activeTab === 'inventory' && (
          <div className="text-center py-20">
            <Pill className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Inventory Management</h3>
            <p className="text-gray-600">Track and manage your medicine stock</p>
            <p className="text-sm text-gray-400 mt-4">Coming soon...</p>
          </div>
        )}

        {activeTab === 'delivery' && (
          <div className="text-center py-20">
            <Truck className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Delivery Management</h3>
            <p className="text-gray-600">Track deliveries and manage delivery partners</p>
            <p className="text-sm text-gray-400 mt-4">Coming soon...</p>
          </div>
        )}
      </div>

      <VitaBot role="pharmacy" />
    </div>
  )
}
