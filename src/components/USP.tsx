import React from 'react'
import { motion } from 'framer-motion'
import { Quote, Star, Award, Target, Zap } from 'lucide-react'

const testimonials = [
  {
    quote: "VitaData has transformed how we manage patient records. The efficiency gains are remarkable, and our patients love the convenience.",
    author: "Dr. Rajesh Sharma",
    role: "Chief Medical Officer, Apollo Hospitals",
    rating: 5
  },
  {
    quote: "The medication reminder system has significantly improved adherence rates among our chronic disease patients. A game-changer!",
    author: "Dr. Priya Menon",
    role: "General Physician, Community Health Center",
    rating: 5
  },
  {
    quote: "As a patient, I love being able to access my health records anytime and book appointments with just a few clicks. Very user-friendly!",
    author: "Amit Patel",
    role: "Patient",
    rating: 5
  }
]

const valueProps = [
  {
    icon: Target,
    title: "Patient-Centric Approach",
    desc: "Every feature designed with patient well-being and convenience in mind"
  },
  {
    icon: Zap,
    title: "Lightning Fast Performance",
    desc: "Access critical patient information in milliseconds, not minutes"
  },
  {
    icon: Award,
    title: "Award-Winning Support",
    desc: "24/7 dedicated support team ready to help you succeed"
  }
]

export default function USP(){
  return (
    <section className="py-16 bg-gradient-to-br from-sky-600 via-blue-600 to-purple-700 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
      </div>

      <div className="container relative z-10">
        {/* Main Quote Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Quote className="w-16 h-16 mx-auto mb-6 text-sky-200" />
          <blockquote className="text-2xl md:text-4xl font-bold max-w-4xl mx-auto leading-relaxed">
            "VitaData bridges hospitals and patients — combining efficient data management with personalized care, ensuring convenience and adherence."
          </blockquote>
          <div className="mt-6 text-sky-100 text-lg">Our Mission Statement</div>
        </motion.div>

        {/* Value Propositions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {valueProps.map((prop, idx) => {
            const IconComponent = prop.icon
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center mb-4">
                  <IconComponent className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">{prop.title}</h3>
                <p className="text-sky-100 leading-relaxed">{prop.desc}</p>
              </motion.div>
            )
          })}
        </div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold mb-2">Trusted by Healthcare Professionals</h3>
            <p className="text-sky-100 text-lg">See what our users have to say</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                className="bg-white rounded-2xl p-6 text-slate-800 shadow-xl hover:shadow-2xl transition-shadow"
              >
                {/* Star Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Quote */}
                <Quote className="w-8 h-8 text-sky-200 mb-3" />
                <p className="text-slate-700 leading-relaxed mb-4 italic">
                  "{testimonial.quote}"
                </p>

                {/* Author */}
                <div className="pt-4 border-t border-slate-200">
                  <div className="font-bold text-slate-900">{testimonial.author}</div>
                  <div className="text-sm text-slate-600">{testimonial.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
            <Award className="w-5 h-5" />
            <span className="font-semibold">Rated 4.9/5 by 2,000+ healthcare providers</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
