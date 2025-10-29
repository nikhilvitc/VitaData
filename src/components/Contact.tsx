import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send, CheckCircle, User, MessageSquare, Linkedin, Twitter, Github } from 'lucide-react'
import supabase from '../lib/supabaseClient'

export default function Contact(){
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault()
    setIsSubmitting(true)
    const fd = new FormData(e.currentTarget)
    const obj = Object.fromEntries(fd.entries())

    // Persist to Supabase (contacts table). Make sure you created the table with the SQL provided in supabase_schema.sql
    ;(async ()=>{
      try{
        const { error } = await supabase
          .from('contacts')
          .insert([{ name: obj.name, email: obj.email, message: obj.message }])

        if(error){
          console.error('Supabase insert error', error)
          alert('Could not save message to Supabase — check console.')
          setIsSubmitting(false)
        } else {
          setSubmitted(true)
          setIsSubmitting(false)
          e.currentTarget.reset()
          setTimeout(() => setSubmitted(false), 5000)
        }
      }catch(err){
        console.error(err)
        alert('Unexpected error — check console.')
        setIsSubmitting(false)
      }
    })()
  }

  return (
    <section id="contact" className="py-16 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4">
            <Mail className="w-4 h-4" />
            Get in Touch
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
            Let's Start a Conversation
          </h2>
          <p className="mt-4 text-lg text-slate-600 max-w-3xl mx-auto">
            Ready to transform your healthcare operations? Reach out for demos, pilot programs, and partnerships.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200"
          >
            <h3 className="text-2xl font-bold text-slate-900 mb-6">Send us a Message</h3>
            
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-12"
              >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-2">Message Sent!</h4>
                <p className="text-slate-600 text-center">Thank you for reaching out. We'll get back to you shortly.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    <User className="w-4 h-4 inline mr-2" />
                    Full Name
                  </label>
                  <input 
                    name="name" 
                    required 
                    placeholder="John Doe"
                    className="w-full border border-slate-300 px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    <Mail className="w-4 h-4 inline mr-2" />
                    Email Address
                  </label>
                  <input 
                    name="email" 
                    type="email" 
                    required 
                    placeholder="john@example.com"
                    className="w-full border border-slate-300 px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    <MessageSquare className="w-4 h-4 inline mr-2" />
                    Message
                  </label>
                  <textarea 
                    name="message" 
                    required 
                    rows={5}
                    placeholder="Tell us about your needs..."
                    className="w-full border border-slate-300 px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                  />
                </div>
                
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>Processing...</>
                  ) : (
                    <>
                      Send Message
                      <Send className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Founder Card */}
            <div className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-2xl shadow-xl p-8 text-white">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-full flex items-center justify-center text-2xl font-bold">
                  NK
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Nikhil Kumar</h3>
                  <p className="text-blue-100">Founder & CEO</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <a href="tel:7703913213" className="flex items-center gap-3 p-3 bg-white/10 backdrop-blur rounded-xl hover:bg-white/20 transition-all group">
                  <Phone className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span className="font-medium">+91 7703913213</span>
                </a>
                
                <a href="mailto:nikhilkumarofficial770@gmail.com" className="flex items-center gap-3 p-3 bg-white/10 backdrop-blur rounded-xl hover:bg-white/20 transition-all group">
                  <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span className="font-medium text-sm">nikhilkumarofficial770@gmail.com</span>
                </a>
                
                <div className="flex items-center gap-3 p-3 bg-white/10 backdrop-blur rounded-xl">
                  <MapPin className="w-5 h-5" />
                  <span className="font-medium">Bangalore, India</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-white/20">
                <p className="text-sm text-blue-100 mb-3">Connect on Social Media</p>
                <div className="flex gap-3">
                  <a href="#" className="w-10 h-10 bg-white/10 backdrop-blur rounded-lg flex items-center justify-center hover:bg-white/20 transition-all">
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a href="#" className="w-10 h-10 bg-white/10 backdrop-blur rounded-lg flex items-center justify-center hover:bg-white/20 transition-all">
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a href="#" className="w-10 h-10 bg-white/10 backdrop-blur rounded-lg flex items-center justify-center hover:bg-white/20 transition-all">
                    <Github className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Info Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-xl shadow-md p-6 border border-slate-200">
                <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-1">
                  24/7
                </div>
                <div className="text-sm text-slate-600">Support Available</div>
              </div>
              <div className="bg-white rounded-xl shadow-md p-6 border border-slate-200">
                <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600 mb-1">
                  &lt;24h
                </div>
                <div className="text-sm text-slate-600">Response Time</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
