import React from 'react'
import { motion } from 'framer-motion'
import { AlertCircle, Clock, TrendingDown, UserX, FileX, Activity } from 'lucide-react'

const items = [
  { 
    title: 'Manual Record-Keeping', 
    desc: 'Paper-based systems lead to errors, data loss, and significant delays in accessing critical patient information',
    icon: FileX,
    color: 'from-red-500 to-pink-600',
    impact: 'High Error Rate'
  },
  { 
    title: 'No Online Appointments', 
    desc: 'Patients face long waiting times and inefficient scheduling, leading to frustration and reduced satisfaction',
    icon: Clock,
    color: 'from-orange-500 to-amber-600',
    impact: 'Patient Dissatisfaction'
  },
  { 
    title: 'Poor Patient Engagement', 
    desc: 'Lack of digital tools results in low medication adherence and poor health outcomes for chronic patients',
    icon: UserX,
    color: 'from-purple-500 to-indigo-600',
    impact: 'Low Adherence'
  },
  { 
    title: 'Weak Follow-up Systems', 
    desc: 'Inadequate post-treatment monitoring leads to higher readmission rates and preventable complications',
    icon: TrendingDown,
    color: 'from-blue-500 to-cyan-600',
    impact: 'Higher Readmissions'
  }
]

export default function Problems(){
  return (
    <section className="py-16 bg-slate-50">
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-full text-sm font-medium mb-4">
            <AlertCircle className="w-4 h-4" />
            Critical Healthcare Challenges
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
            Problems Traditional Healthcare Systems Face
          </h2>
          <p className="mt-4 text-lg text-slate-600 max-w-3xl mx-auto">
            Healthcare providers struggle with outdated systems that impact both operational efficiency and patient care quality
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((item, idx) => {
            const IconComponent = item.icon
            return (
              <motion.div 
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group relative bg-white rounded-2xl shadow-md hover:shadow-xl p-6 border border-slate-200 hover:border-red-200 transition-all duration-300"
              >
                {/* Icon */}
                <div className="flex items-start gap-4">
                  <div className={`flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-7 h-7 text-white" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-xl font-bold text-slate-900">{item.title}</h3>
                      <span className="text-xs font-semibold px-3 py-1 bg-red-100 text-red-700 rounded-full">
                        {item.impact}
                      </span>
                    </div>
                    <p className="text-slate-600 leading-relaxed">{item.desc}</p>
                  </div>
                </div>

                {/* Decorative element */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red-300 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-b-2xl"></div>
              </motion.div>
            )
          })}
        </div>

        {/* Call to action */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-sky-50 to-blue-50 border border-sky-200 rounded-xl">
            <Activity className="w-6 h-6 text-sky-600" />
            <p className="text-slate-700">
              <span className="font-semibold text-sky-700">VitaData solves these problems</span> with modern, integrated healthcare technology
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
