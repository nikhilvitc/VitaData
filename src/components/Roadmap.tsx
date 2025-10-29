import React from 'react'
import { motion } from 'framer-motion'
import { MapPin, Users, Shield, Bot, Rocket, Globe, Building, Network } from 'lucide-react'

const milestones = [
  { 
    quarter: '2025 Q4', 
    title: 'Major Cities Expansion',
    description: 'Scale operations to 15+ major cities across India with localized support',
    icon: MapPin,
    color: 'from-blue-500 to-cyan-600',
    status: 'In Progress'
  },
  { 
    quarter: '2026 Q2', 
    title: 'Strategic Partnerships',
    description: 'Collaborate with leading hospital chains and government healthcare facilities',
    icon: Building,
    color: 'from-purple-500 to-pink-600',
    status: 'Planned'
  },
  { 
    quarter: '2026 Q4', 
    title: 'Security & Compliance',
    description: 'Enhanced data security infrastructure and international compliance certifications',
    icon: Shield,
    color: 'from-green-500 to-emerald-600',
    status: 'Planned'
  },
  { 
    quarter: '2027 Q1', 
    title: 'AI-Powered Chatbot',
    description: 'Deploy intelligent chatbot for 24/7 patient support and triage assistance',
    icon: Bot,
    color: 'from-orange-500 to-red-600',
    status: 'Research'
  },
  { 
    quarter: '2027 Q3', 
    title: 'International Launch',
    description: 'Expand to South Asian markets with multi-currency and regional features',
    icon: Globe,
    color: 'from-indigo-500 to-purple-600',
    status: 'Vision'
  }
]

export default function Roadmap(){
  return (
    <section className="py-16 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-0 w-64 h-64 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-0 w-64 h-64 bg-purple-500 rounded-full blur-3xl"></div>
      </div>

      <div className="container relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium mb-4">
            <Rocket className="w-4 h-4" />
            Product Roadmap
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
            Our Vision for the Future
          </h2>
          <p className="mt-4 text-lg text-slate-600 max-w-3xl mx-auto">
            Strategic milestones to revolutionize healthcare delivery across the region
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line - desktop */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-green-500 transform -translate-x-1/2"></div>

          {/* Milestones */}
          <div className="space-y-12">
            {milestones.map((milestone, idx) => {
              const IconComponent = milestone.icon
              const isEven = idx % 2 === 0
              
              return (
                <motion.div
                  key={milestone.quarter}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className={`relative grid md:grid-cols-2 gap-8 items-center ${isEven ? '' : 'md:flex-row-reverse'}`}
                >
                  {/* Content - Left on even, Right on odd */}
                  <div className={`${isEven ? 'md:text-right md:pr-12' : 'md:col-start-2 md:pl-12'}`}>
                    <div className={`inline-block ${isEven ? 'md:float-right' : ''} bg-white rounded-2xl shadow-xl p-6 border border-slate-200 hover:shadow-2xl transition-all group max-w-md`}>
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${milestone.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="font-bold text-sm text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                            {milestone.quarter}
                          </div>
                          <div className={`text-xs font-semibold px-2 py-1 rounded-full inline-block mt-1 ${
                            milestone.status === 'In Progress' ? 'bg-green-100 text-green-700' :
                            milestone.status === 'Planned' ? 'bg-blue-100 text-blue-700' :
                            milestone.status === 'Research' ? 'bg-purple-100 text-purple-700' :
                            'bg-slate-100 text-slate-700'
                          }`}>
                            {milestone.status}
                          </div>
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-2">{milestone.title}</h3>
                      <p className="text-slate-600 leading-relaxed">{milestone.description}</p>
                    </div>
                  </div>

                  {/* Timeline dot - centered */}
                  <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2">
                    <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${milestone.color} border-4 border-white shadow-lg`}></div>
                  </div>

                  {/* Empty space on opposite side */}
                  <div className={`hidden md:block ${isEven ? 'md:col-start-2' : 'md:col-start-1'}`}></div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-flex flex-col items-center gap-4 p-8 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl border border-blue-200">
            <Network className="w-12 h-12 text-blue-600" />
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Join Our Journey</h3>
              <p className="text-slate-600 mb-4">Be part of the healthcare revolution. Partner with us today.</p>
              <a 
                href="#contact" 
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
              >
                Get in Touch
                <Rocket className="w-5 h-5" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
