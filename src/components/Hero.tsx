import React from 'react'
import { motion } from 'framer-motion'
import { User, Users, Stethoscope, PillBottle, ArrowRight, CheckCircle2, Calendar, Shield, Zap, Heart } from 'lucide-react'

const categories = [
  { title: 'Patients', icon: User, color: 'from-sky-500 to-blue-600', borderColor: 'border-sky-400', route: '/patient' },
  { title: 'Guardians', icon: Users, color: 'from-amber-500 to-orange-600', borderColor: 'border-amber-400', route: '/guardian' },
  { title: 'Doctors', icon: Stethoscope, color: 'from-emerald-500 to-green-600', borderColor: 'border-emerald-400', route: '/doctor' },
  { title: 'Pharmacies', icon: PillBottle, color: 'from-purple-500 to-indigo-600', borderColor: 'border-purple-400', route: '/pharmacy' }
]

const features = [
  { icon: Calendar, text: 'Book and manage appointments with nearby clinics and doctors instantly' },
  { icon: Shield, text: 'Secure storage of medical records and test results with end-to-end encryption' },
  { icon: Zap, text: 'Fast medicine delivery from partnered pharmacies directly to your doorstep' },
  { icon: Heart, text: 'Automated reminders and follow-ups for better care and adherence' }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

export default function Hero() {
  return (
    <section className="relative pt-16 pb-20 overflow-hidden">
      {/* Background gradient elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-sky-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl"></div>
      </div>

      <div className="container">
        {/* Hero Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-sky-100 text-sky-700 rounded-full text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-sky-500 rounded-full animate-pulse"></span>
            Transforming Healthcare, One Patient at a Time
          </div>
          
          <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-blue-600 to-purple-600 leading-tight">
            Simplifying Healthcare Operations
          </h1>
          
          <p className="mt-6 text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            VitaData connects patients, guardians, healthcare providers, and pharmacies in one secure, intelligent platform. 
            Experience seamless appointments, digital health records, medicine delivery, and personalized care reminders.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#contact" className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-sky-600 to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200">
              Get Started Free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#about" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-slate-700 font-semibold rounded-xl shadow-md hover:shadow-lg border border-slate-200 transition-all duration-200">
              Learn More
            </a>
          </div>
        </motion.div>

        {/* Category Cards */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {categories.map((category) => {
            const IconComponent = category.icon
            return (
              <motion.a 
                key={category.title} 
                href={category.route}
                variants={itemVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group block"
              >
                <div className={`bg-white rounded-2xl shadow-lg hover:shadow-2xl p-6 border-t-4 ${category.borderColor} transition-all duration-300`}>
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">{category.title}</h3>
                  <p className="text-sm text-slate-600">Access your personalized dashboard</p>
                  <div className="mt-4 flex items-center text-sky-600 font-medium group-hover:gap-2 transition-all">
                    Explore <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.a>
            )
          })}
        </motion.div>

        {/* Features Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-white to-sky-50 rounded-2xl shadow-lg p-8 border border-sky-100">
            <h3 className="text-2xl font-bold text-sky-900 mb-6 flex items-center gap-3">
              <CheckCircle2 className="w-7 h-7 text-sky-600" />
              What VitaData Offers
            </h3>
            <ul className="space-y-4">
              {features.map((feature, idx) => {
                const IconComponent = feature.icon
                return (
                  <motion.li 
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 + 0.3 }}
                    className="flex items-start gap-4 group"
                  >
                    <div className="p-2 bg-sky-100 rounded-lg group-hover:bg-sky-200 transition-colors">
                      <IconComponent className="w-5 h-5 text-sky-600" />
                    </div>
                    <span className="text-slate-700 leading-relaxed flex-1">{feature.text}</span>
                  </motion.li>
                )
              })}
            </ul>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-white rounded-2xl shadow-lg p-8 border border-purple-100">
            <h3 className="text-2xl font-bold text-purple-900 mb-6">Quick Access</h3>
            <div className="space-y-3">
              {[
                { label: 'Patient Portal', route: '/patient', desc: 'Manage your health records and appointments' },
                { label: 'Doctor Dashboard', route: '/doctor', desc: 'View patients and manage consultations' },
                { label: 'Guardian Access', route: '/guardian', desc: 'Monitor family members health status' },
                { label: 'Pharmacy Hub', route: '/pharmacy', desc: 'Process prescriptions and deliveries' }
              ].map((link, idx) => (
                <motion.a
                  key={idx}
                  href={link.route}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 + 0.3 }}
                  className="block p-4 bg-white rounded-xl border border-slate-200 hover:border-purple-300 hover:shadow-md transition-all group"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-slate-800 group-hover:text-purple-600 transition-colors">{link.label}</div>
                      <div className="text-sm text-slate-500 mt-1">{link.desc}</div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-purple-600 group-hover:translate-x-1 transition-all" />
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { value: '50K+', label: 'Active Patients' },
            { value: '1,200+', label: 'Healthcare Providers' },
            { value: '99.9%', label: 'Uptime' },
            { value: '24/7', label: 'Support Available' }
          ].map((stat, idx) => (
            <div key={idx} className="text-center p-6 bg-white rounded-xl shadow-md">
              <div className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-purple-600">{stat.value}</div>
              <div className="text-sm text-slate-600 mt-2">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
