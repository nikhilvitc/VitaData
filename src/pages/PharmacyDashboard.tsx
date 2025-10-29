import React, { useEffect, useState } from 'react'
import VitaBot from '../components/VitaBot'
import { getOrders, updateOrder, getPrescriptions, formatDatetime } from '../lib/mockData'

export default function PharmacyDashboard(){
  const [orders, setOrders] = useState([] as any[])

  useEffect(() => {
    setOrders(getOrders())
  }, [])

  function setStatus(id: string, status: 'in_progress' | 'delivered' | 'pending') {
    updateOrder(id, { status })
    setOrders(getOrders())
  }

  const prescs = getPrescriptions()

  return (
    <div className="container py-10">
      <h2 className="text-2xl font-semibold">Pharmacy Dashboard</h2>

      <section className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded shadow">
          <h4 className="font-semibold">Orders Dashboard</h4>
          <div className="mt-2 text-sm">New orders: {orders.length}</div>
          <ul className="mt-2 text-sm list-disc list-inside text-slate-700">
            {orders.map(o => (
              <li key={o.id} className="mb-2">
                <div className="font-medium">Order {o.id} — {o.status}</div>
                <div className="text-xs">Prescription: {o.prescriptionId} — {formatDatetime(o.createdAt)}</div>
                <div className="mt-1 flex gap-2">
                  <button onClick={() => setStatus(o.id, 'in_progress')} className="px-2 py-1 border rounded">Start</button>
                  <button onClick={() => setStatus(o.id, 'delivered')} className="px-2 py-1 bg-emerald-600 text-white rounded">Mark Delivered</button>
                </div>
              </li>
            ))}
            {!orders.length && <li>No orders</li>}
          </ul>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h4 className="font-semibold">Inventory</h4>
          <div className="mt-2 text-sm">Low stock alerts: Paracetamol</div>
          <div className="mt-4">
            <h5 className="font-medium">Recent prescriptions</h5>
            <ul className="mt-2 text-sm text-slate-700">
              {prescs.map(p => (
                <li key={p.id}>{p.title} — {formatDatetime(p.issuedOn)}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mt-6">
        <h4 className="font-semibold">Delivery Management</h4>
        <div className="mt-2 text-sm">Assign delivery partners and track status.</div>
      </section>

      <VitaBot role="pharmacy" />
    </div>
  )
}
