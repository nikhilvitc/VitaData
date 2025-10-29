import React, { useState, Suspense, lazy } from 'react'

type Props = { role?: 'patient' | 'guardian' | 'doctor' | 'pharmacy' }

const LazyChatbot = lazy(() => import('./Chatbot'))

export default function VitaBot({ role = 'patient' }: Props){
  const [open, setOpen] = useState(false)

  return (
    <div>
      <div className="fixed bottom-6 right-6 z-50">
        {open && (
          <Suspense fallback={<div className="w-80 h-40 bg-white rounded shadow p-3">Loading chat…</div>}>
            <LazyChatbot role={role} />
          </Suspense>
        )}

        <button onClick={()=>setOpen(v=>!v)} aria-label="Open VitaBot" className="w-12 h-12 rounded-full bg-vitaTeal text-white shadow-lg">🤖</button>
      </div>
    </div>
  )
}
