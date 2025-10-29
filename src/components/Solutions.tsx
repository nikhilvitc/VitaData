import React from 'react'
import { motion } from 'framer-motion'
import { DollarSign, Lock, Database, BarChart, Truck, Cloud, Smartphone, Heart } from 'lucide-react'

const features = [
  { 
    title: 'Affordable Pricing', 
    desc: 'Flexible subscription plans designed for small and medium healthcare facilities with transparent pricing',
    icon: DollarSign,
    color: 'from-green-500 to-emerald-600',
    badge: 'Cost-Effective'
  },
  { 
    title: 'End-to-End Encryption', 
    desc: 'Military-grade security ensuring complete patient data privacy with HIPAA compliance',
    icon: Lock,
    color: 'from-blue-500 to-indigo-600',
    badge: 'Secure'
  },
  { 
    title: 'Comprehensive Data Management', 
    desc: 'Unified EHR system, inventory tracking, and automated reporting for seamless operations',
    icon: Database,
    color: 'from-purple-500 to-pink-600',
    badge: 'All-in-One'
  },
  { 
    title: 'Advanced Analytics', 
    desc: 'AI-powered insights and predictive analytics to improve patient outcomes and operational efficiency',
    icon: BarChart,
    color: 'from-orange-500 to-red-600',
    badge: 'AI-Powered'
  },
  { 
    title: 'Medicine Delivery Integration', 
    desc: 'Seamless prescription-to-doorstep delivery through our pharmacy network',
    icon: Truck,
    color: 'from-cyan-500 to-blue-600',
    badge: 'Convenient'
  },
  { 
    title: 'Cloud-Based Platform', 
    desc: 'Access patient data and manage operations from anywhere with 99.9% uptime guarantee',
    icon: Cloud,
    color: 'from-sky-500 to-blue-600',
    badge: 'Always Available'
  },
  { 
    title: 'Mobile-First Design', 
    desc: 'Native apps for patients and providers ensuring healthcare access on the go',
    icon: Smartphone,
    color: 'from-violet-500 to-purple-600',
    badge: 'On-the-Go'
  },
  { 
    title: 'Patient Engagement Tools', 
    desc: 'Automated reminders, health tracking, and telemedicine features for better adherence',
    icon: Heart,
    color: 'from-rose-500 to-pink-600',
    badge: 'Engaging'
  }
]

export default function Solutions(){
  return (
    <section id="about" className="py-16 bg-white">
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-4">
            <Heart className="w-4 h-4" />
            Our Solutions
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
            VitaData Platform Features
          </h2>
          <p className="mt-4 text-lg text-slate-600 max-w-3xl mx-auto">
            Comprehensive solutions designed for operational excellence and superior patient outcomes
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => {
            const IconComponent = feature.icon
            return (
              <motion.div 
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative bg-gradient-to-br from-white to-slate-50 rounded-2xl shadow-md hover:shadow-2xl p-6 border border-slate-200 transition-all duration-300 overflow-hidden"
              >
                {/* Background gradient on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                
                {/* Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold px-3 py-1 bg-slate-100 text-slate-700 rounded-full group-hover:bg-sky-100 group-hover:text-sky-700 transition-colors">
                    {feature.badge}
                  </span>
                </div>

                {/* Icon */}
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <IconComponent className="w-7 h-7 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{feature.desc}</p>

                {/* Decorative bottom border */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity rounded-b-2xl`}></div>
              </motion.div>
            )
          })}
        </div>

        {/* Additional CTA */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <a 
            href="#contact" 
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-sky-600 to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
          >
            Request a Demo
            <BarChart className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
