import React, { Suspense, lazy } from 'react'
import Hero from './components/Hero'
import Problems from './components/Problems'
import Solutions from './components/Solutions'
import Patients from './components/Patients'
import USP from './components/USP'
import Market from './components/Market'
import Roadmap from './components/Roadmap'
import Chatbot from './components/Chatbot'
import Contact from './components/Contact'
import Footer from './components/Footer'
import logoImage from './assets/logo.jpeg'

export default function App() {
  const path = typeof window !== 'undefined' ? window.location.pathname : '/'

  // Simple pathname-based routing: /admin -> Admin page
  if (path === '/admin') {
    const Admin = lazy(() => import('./pages/Admin'))
    return (
      <Suspense fallback={<div className="container py-12">Loading admin…</div>}>
        <Admin />
      </Suspense>
    )
  }

  // Dashboard routes: /patient, /guardian, /doctor, /pharmacy
  if (path === '/patient') {
    const Patient = lazy(() => import('./pages/PatientDashboard'))
    return (
      <Suspense fallback={<div className="container py-12">Loading patient dashboard…</div>}>
        <Patient />
      </Suspense>
    )
  }

  if (path === '/guardian') {
    const Guardian = lazy(() => import('./pages/GuardianDashboard'))
    return (
      <Suspense fallback={<div className="container py-12">Loading guardian dashboard…</div>}>
        <Guardian />
      </Suspense>
    )
  }

  if (path === '/doctor') {
    const Doctor = lazy(() => import('./pages/DoctorDashboard'))
    return (
      <Suspense fallback={<div className="container py-12">Loading doctor dashboard…</div>}>
        <Doctor />
      </Suspense>
    )
  }

  if (path === '/pharmacy') {
    const Pharmacy = lazy(() => import('./pages/PharmacyDashboard'))
    return (
      <Suspense fallback={<div className="container py-12">Loading pharmacy dashboard…</div>}>
        <Pharmacy />
      </Suspense>
    )
  }

  if (path === '/database-test') {
    const DatabaseTest = lazy(() => import('./pages/DatabaseTest'))
    return (
      <Suspense fallback={<div className="container py-12">Loading database test…</div>}>
        <DatabaseTest />
      </Suspense>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-md border-b border-slate-200">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="/" className="flex items-center gap-3 group">
              <img 
                src={logoImage} 
                alt="VitaData Logo" 
                className="h-16 w-16 rounded-full object-cover shadow-lg border-2 border-sky-200 group-hover:scale-110 group-hover:shadow-xl transition-all"
              />
              <div>
                <div className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-blue-600">VitaData</div>
                <div className="text-xs text-slate-600">Healthcare Simplified</div>
              </div>
            </a>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <a className="text-slate-700 hover:text-sky-600 font-medium transition-colors" href="#about">Features</a>
              <a className="text-slate-700 hover:text-sky-600 font-medium transition-colors" href="#patients">For Patients</a>
              <a className="text-slate-700 hover:text-sky-600 font-medium transition-colors" href="#contact">Contact</a>
              
              {/* Dashboards Dropdown */}
              <div className="relative group">
                <button className="text-slate-700 hover:text-sky-600 font-medium transition-colors flex items-center gap-1">
                  Dashboards
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <a href="/patient" className="block px-4 py-3 text-sm text-slate-700 hover:bg-sky-50 hover:text-sky-600 transition-colors first:rounded-t-xl">Patient Portal</a>
                  <a href="/doctor" className="block px-4 py-3 text-sm text-slate-700 hover:bg-sky-50 hover:text-sky-600 transition-colors">Doctor Dashboard</a>
                  <a href="/guardian" className="block px-4 py-3 text-sm text-slate-700 hover:bg-sky-50 hover:text-sky-600 transition-colors">Guardian Access</a>
                  <a href="/pharmacy" className="block px-4 py-3 text-sm text-slate-700 hover:bg-sky-50 hover:text-sky-600 transition-colors last:rounded-b-xl">Pharmacy Hub</a>
                </div>
              </div>

              <a href="#contact" className="px-6 py-2.5 bg-gradient-to-r from-sky-600 to-blue-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all">
                Get Demo
              </a>
            </nav>

            {/* Mobile menu button */}
            <button className="md:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-lg">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <Hero />
        <Problems />
        <Solutions />
        <Patients />
        <USP />
        <Market />
        <Roadmap />
        <Contact />
      </main>

      <Footer />

      <Chatbot />
    </div>
  )
}
