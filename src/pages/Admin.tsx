import React, { useEffect, useState } from 'react'
import supabase from '../lib/supabaseClient'

const ADMIN_PASS = (import.meta.env.VITE_ADMIN_PASS as string) || 'vitadata-admin'

export default function Admin(){
  const [authorized, setAuthorized] = useState(false)
  const [loading, setLoading] = useState(false)
  const [appointments, setAppointments] = useState<any[]>([])

  useEffect(()=>{
    if(!authorized){
      const attempt = window.prompt('Enter admin passcode to view appointments:')
      if(attempt === ADMIN_PASS) setAuthorized(true)
    }
  }, [authorized])

  useEffect(()=>{
    if(!authorized) return
    setLoading(true)
    ;(async ()=>{
      const { data, error } = await supabase.from('appointments').select('*').order('created_at', { ascending: false }).limit(200)
      if(error){
        console.error('Error fetching appointments', error)
      } else {
        setAppointments(data || [])
      }
      setLoading(false)
    })()
  }, [authorized])

  if(!authorized) return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-gray-100">
      <div className="container py-12">
        <div className="card">
          <h3 className="text-lg font-semibold">Admin</h3>
          <p className="text-sm text-slate-600 mt-2">Protected — enter passcode to view appointments.</p>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-gray-100">
    <section className="py-12">
      <div className="container">
        <h3 className="text-2xl font-semibold">Appointments (Admin)</h3>
        <div className="mt-4">
          {loading && <div className="text-sm text-slate-500">Loading...</div>}
          {!loading && appointments.length === 0 && <div className="text-sm text-slate-500">No appointments found.</div>}

          <div className="mt-4 space-y-3">
            {appointments.map((a:any) => (
              <div key={a.id} className="p-3 bg-white rounded shadow-sm flex justify-between items-start">
                <div>
                  <div className="font-medium">{a.when || a.meta || '—'}</div>
                  <div className="text-sm text-slate-500">{a.meta}</div>
                </div>
                <div className="text-xs text-slate-400">{new Date(a.created_at).toLocaleString()}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
    </div>
  )
}
