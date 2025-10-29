import React, { useState } from 'react'

type Msg = { from: 'bot' | 'user'; text: string }

export default function Chatbot({ role = 'patient' }: { role?: 'patient' | 'guardian' | 'doctor' | 'pharmacy' }){
  const [open, setOpen] = useState(false)
  const initial = (() => {
    switch(role){
      case 'guardian': return `Hi 👋 I'm VitaBot — I'm here to help you monitor your linked patients. Ask about adherence or latest vitals.`
      case 'doctor': return `Hi 👋 I'm VitaBot Assist — I can summarize patient data or show today's appointments.`
      case 'pharmacy': return `Hi 👋 I'm VitaBot — I can show pending orders or delivery updates.`
      default: return `Hi 👋 I'm VitaBot, your healthcare assistant. How can I help you today?`
    }
  })()

  const [messages, setMessages] = useState<Msg[]>([{ from: 'bot', text: initial }])
  const [input, setInput] = useState('')

  function pushBot(text: string){
    setMessages(prev => [...prev, { from: 'bot', text }])
  }

  function send(){
    if(!input.trim()) return
    const text = input.trim()
    setMessages(prev => [...prev, { from: 'user', text }])

    // simple demo intents
    if(/book|appointment|slot/i.test(text)){
      pushBot('Sure — I can help book a demo appointment. Pick a date and time below:')
      pushBot('[Quick pick] Tomorrow 10:00 AM')
      pushBot('[Quick pick] Tomorrow 3:00 PM')
    } else if(/faq|help|info/i.test(text)){
      pushBot('I can answer FAQs, book demo appointments, and provide hospital contact details. Try: "book appointment"')
    } else {
      // demo echo + helper
      setTimeout(()=> pushBot('Thanks — this is a demo. For real bookings please contact the hospital or use the Contact form.'), 700)
    }

    setInput('')
  }

  function quickPick(value: string){
    // store demo appointment in localStorage
    const saved = JSON.parse(localStorage.getItem('vitadata_appointments') || '[]')
    saved.push({ id: Date.now(), when: value })
    localStorage.setItem('vitadata_appointments', JSON.stringify(saved))
    setMessages(prev => [...prev, { from: 'user', text: `Book: ${value}` }, { from: 'bot', text: `Confirmed demo appointment — ${value}. We'll send a reminder by SMS (demo).` }])

    // Persist demo appointment to Supabase (appointments table)
    ;(async ()=>{
      try{
        await import('../lib/supabaseClient').then(mod => mod.supabase)
        const supabase = (await import('../lib/supabaseClient')).supabase
        const { error } = await supabase.from('appointments').insert([{ when: value, meta: 'demo-quick-pick' }])
        if(error) console.error('Supabase appointments insert error', error)
      }catch(err){
        console.error('Supabase appointment error', err)
      }
    })()
  }

  return (
    <div className="no-print">
      {/* Chat Button */}
      <button 
        onClick={() => setOpen(v => !v)} 
        aria-label="Open chat" 
        className="fixed right-6 bottom-6 w-16 h-16 bg-gradient-to-br from-sky-500 to-blue-600 text-white rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all z-50 flex items-center justify-center group"
      >
        {open ? (
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full animate-pulse"></span>
      </button>

      {/* Chat Window */}
      {open && (
        <div className="fixed right-6 bottom-24 w-96 max-w-[calc(100vw-3rem)] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col z-50 border border-slate-200 animate-scaleIn">
          {/* Header */}
          <div className="px-6 py-4 bg-gradient-to-r from-sky-500 to-blue-600 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
                <div>
                  <div className="font-bold">VitaBot</div>
                  <div className="text-xs text-sky-100 flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                    Online • Ready to help
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setOpen(false)}
                className="w-8 h-8 flex items-center justify-center hover:bg-white/20 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="p-4 flex-1 overflow-auto space-y-3 bg-gradient-to-br from-slate-50 to-blue-50" style={{maxHeight: '400px'}}>
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                  m.from === 'user' 
                    ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-tr-none' 
                    : 'bg-white text-slate-800 shadow-md rounded-tl-none'
                }`}>
                  <p className="text-sm leading-relaxed">{m.text}</p>
                </div>
              </div>
            ))}

            {/* Quick Action Buttons */}
            {messages.length > 0 && (
              <div className="flex flex-col gap-2 pt-2">
                <button 
                  onClick={() => quickPick('Tomorrow 10:00 AM')} 
                  className="text-sm px-4 py-2 rounded-xl bg-white border border-sky-200 text-slate-700 hover:bg-sky-50 hover:border-sky-300 transition-all shadow-sm"
                >
                  📅 Tomorrow 10:00 AM
                </button>
                <button 
                  onClick={() => quickPick('Tomorrow 3:00 PM')} 
                  className="text-sm px-4 py-2 rounded-xl bg-white border border-sky-200 text-slate-700 hover:bg-sky-50 hover:border-sky-300 transition-all shadow-sm"
                >
                  📅 Tomorrow 3:00 PM
                </button>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-slate-200 bg-white">
            <form onSubmit={(e) => { e.preventDefault(); send(); }} className="flex gap-2">
              <input 
                value={input} 
                onChange={e => setInput(e.target.value)} 
                onKeyPress={e => e.key === 'Enter' && send()}
                className="flex-1 px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all" 
                placeholder="Type your message..." 
              />
              <button 
                type="submit"
                onClick={send} 
                className="px-6 py-3 bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-xl hover:shadow-lg transform hover:scale-105 transition-all flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </form>
            <p className="text-xs text-slate-500 mt-2 text-center">Press Enter to send</p>
          </div>
        </div>
      )}
    </div>
  )
}
