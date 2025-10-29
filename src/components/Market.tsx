import React from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, DollarSign, Target, Users, Building, Smartphone, BarChart, Sparkles } from 'lucide-react'

const marketData = [
  { label: 'TAM', value: '$12B', desc: 'Total Addressable Market', percentage: 100, color: 'from-blue-500 to-cyan-600' },
  { label: 'SAM', value: '$3.2B', desc: 'Serviceable Addressable Market', percentage: 27, color: 'from-purple-500 to-pink-600' },
  { label: 'SOM', value: '$180M', desc: 'Serviceable Obtainable Market', percentage: 6, color: 'from-green-500 to-emerald-600' }
]

const revenueStreams = [
  { 
    icon: Building, 
    title: 'Hospital Subscriptions', 
    desc: 'Tiered pricing: Basic, Professional, Enterprise',
    highlight: 'Primary Revenue'
  },
  { 
    icon: DollarSign, 
    title: 'Pharmacy Commissions', 
    desc: '5-10% commission on medicine delivery orders',
    highlight: 'Transaction Fee'
  },
  { 
    icon: Smartphone, 
    title: 'Freemium Patient App', 
    desc: 'Free basic features with premium subscriptions',
    highlight: 'Recurring Income'
  },
  { 
    icon: BarChart, 
    title: 'Analytics & Insights', 
    desc: 'Advanced reporting and predictive analytics add-ons',
    highlight: 'Value-Added'
  }
]

export default function Market(){
  return (
    <section className="py-16 bg-slate-50">
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4">
            <TrendingUp className="w-4 h-4" />
            Market Opportunity
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
            Market Size & Revenue Model
          </h2>
          <p className="mt-4 text-lg text-slate-600 max-w-3xl mx-auto">
            Positioned in a rapidly growing healthcare technology market with multiple revenue streams
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Market Size Visualization */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900">Market Opportunity</h3>
                <p className="text-sm text-slate-600">Healthcare IT Market Analysis</p>
              </div>
            </div>

            <div className="space-y-6">
              {marketData.map((market, idx) => (
                <motion.div
                  key={market.label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="relative"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <span className="text-sm font-semibold text-slate-700">{market.label}</span>
                      <span className="ml-2 text-xs text-slate-500">({market.desc})</span>
                    </div>
                    <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                      {market.value}
                    </span>
                  </div>
                  
                  {/* Progress bar */}
                  <div className="relative h-3 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${market.percentage}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: idx * 0.1 }}
                      className={`h-full bg-gradient-to-r ${market.color} rounded-full`}
                    ></motion.div>
                  </div>
                  <div className="text-xs text-slate-500 mt-1 text-right">{market.percentage}% of TAM</div>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border border-blue-200">
              <div className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-blue-600 mt-0.5" />
                <p className="text-sm text-slate-700">
                  <span className="font-semibold">Growth Projection:</span> Healthcare IT market expected to grow at 15.8% CAGR through 2028
                </p>
              </div>
            </div>
          </motion.div>

          {/* Revenue Model */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900">Revenue Streams</h3>
                <p className="text-sm text-slate-600">Diversified Income Sources</p>
              </div>
            </div>

            <div className="space-y-4">
              {revenueStreams.map((stream, idx) => {
                const IconComponent = stream.icon
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="group p-4 bg-gradient-to-br from-slate-50 to-white rounded-xl border border-slate-200 hover:border-green-300 hover:shadow-md transition-all"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-bold text-slate-900">{stream.title}</h4>
                          <span className="text-xs font-semibold px-2 py-1 bg-green-100 text-green-700 rounded-full">
                            {stream.highlight}
                          </span>
                        </div>
                        <p className="text-sm text-slate-600 leading-relaxed">{stream.desc}</p>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            <div className="mt-6 p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-5 h-5 text-green-600" />
                <span className="font-semibold text-slate-900">Target Customers</span>
              </div>
              <ul className="text-sm text-slate-700 space-y-1 ml-7">
                <li>• Small to medium hospitals (50-500 beds)</li>
                <li>• Private clinics and healthcare centers</li>
                <li>• Individual patients and families</li>
                <li>• Pharmacy chains and independent pharmacies</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
