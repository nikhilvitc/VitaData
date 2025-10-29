import React from 'react'
import { motion } from 'framer-motion'
import { Heart, Bell, Users, Globe, Pill, CheckCircle, Smartphone, Calendar } from 'lucide-react'

const features = [
  { icon: Heart, text: 'Personal health tracking with real-time vitals monitoring' },
  { icon: Bell, text: 'Smart medication reminders with automation' },
  { icon: Users, text: 'Family member access for coordinated care' },
  { icon: Globe, text: 'Multi-language SMS notifications for accessibility' },
  { icon: Pill, text: 'Color-coded medication system for easy adherence' },
  { icon: Calendar, text: 'Simplified appointment booking and management' }
]

export default function Patients(){
  return (
    <section id="patients" className="py-16 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-4">
            <Heart className="w-4 h-4" />
            Patient-Centered Care
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
            VitaData for Patients & Families
          </h2>
          <p className="mt-4 text-lg text-slate-600 max-w-3xl mx-auto">
            Empowering patients with tools to manage their health journey effectively
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Features List */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="space-y-4">
              {features.map((feature, idx) => {
                const IconComponent = feature.icon
                return (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow group"
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-slate-700 font-medium leading-relaxed">{feature.text}</p>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-8"
            >
              <a 
                href="/patient" 
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
              >
                <Smartphone className="w-5 h-5" />
                Access Patient Portal
              </a>
            </motion.div>
          </motion.div>

          {/* Visual Demo Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-2xl p-8 border border-slate-200"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center">
                <Smartphone className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">Patient App Preview</h3>
                <p className="text-sm text-slate-600">Smart features for better health</p>
              </div>
            </div>

            {/* Color-coded medication system */}
            <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl p-6 mb-6">
              <div className="flex items-center gap-2 mb-4">
                <Pill className="w-5 h-5 text-purple-600" />
                <h4 className="font-bold text-slate-900">Color-Coded Medication System</h4>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white font-bold shadow-lg">
                    A
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-slate-800">Morning Dose</div>
                    <div className="text-sm text-slate-600">Take at 8:00 AM</div>
                  </div>
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-white font-bold shadow-lg">
                    B
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-slate-800">Afternoon Dose</div>
                    <div className="text-sm text-slate-600">Take at 2:00 PM</div>
                  </div>
                  <CheckCircle className="w-5 h-5 text-yellow-600" />
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-400 to-pink-600 flex items-center justify-center text-white font-bold shadow-lg">
                    C
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-slate-800">Night Dose</div>
                    <div className="text-sm text-slate-600">Take at 9:00 PM</div>
                  </div>
                  <div className="w-5 h-5 rounded-full border-2 border-slate-300"></div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-200">
                <p className="text-xs text-slate-600 flex items-center gap-2">
                  <Bell className="w-4 h-4" />
                  Visual cues help patients of all ages remember their medications
                </p>
              </div>
            </div>

            {/* Regional Language Support */}
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-3">
                <Globe className="w-5 h-5 text-blue-600" />
                <h4 className="font-bold text-slate-900">Multi-Language SMS Alerts</h4>
              </div>
              <div className="space-y-2">
                <div className="text-sm bg-white p-3 rounded-lg border border-blue-200">
                  <div className="font-medium text-slate-700">English:</div>
                  <div className="text-slate-600">"Time for your medication - Metformin 500mg"</div>
                </div>
                <div className="text-sm bg-white p-3 rounded-lg border border-blue-200">
                  <div className="font-medium text-slate-700">हिंदी:</div>
                  <div className="text-slate-600">"दवा लेने का समय - मेटफॉर्मिन 500mg"</div>
                </div>
              </div>
              <p className="text-xs text-slate-600 mt-3">
                Supports 10+ regional languages for better accessibility
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
