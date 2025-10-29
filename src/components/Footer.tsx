import React from 'react'
import { Heart, Mail, Phone, MapPin, Linkedin, Twitter, Github, Facebook } from 'lucide-react'

export default function Footer(){
  return (
    <footer className="bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 text-white">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-sky-400 to-blue-500 rounded-xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-xl font-bold">VitaData</div>
                <div className="text-xs text-blue-200">Healthcare Simplified</div>
              </div>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed mb-4">
              Transforming healthcare delivery with intelligent, patient-centric technology solutions.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 bg-white/10 backdrop-blur rounded-lg flex items-center justify-center hover:bg-white/20 transition-all">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 bg-white/10 backdrop-blur rounded-lg flex items-center justify-center hover:bg-white/20 transition-all">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 bg-white/10 backdrop-blur rounded-lg flex items-center justify-center hover:bg-white/20 transition-all">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 bg-white/10 backdrop-blur rounded-lg flex items-center justify-center hover:bg-white/20 transition-all">
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#about" className="text-slate-300 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#patients" className="text-slate-300 hover:text-white transition-colors">For Patients</a></li>
              <li><a href="#contact" className="text-slate-300 hover:text-white transition-colors">Contact</a></li>
              <li><a href="/admin" className="text-slate-300 hover:text-white transition-colors">Admin Portal</a></li>
            </ul>
          </div>

          {/* Dashboards */}
          <div>
            <h3 className="text-lg font-bold mb-4">Dashboards</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/patient" className="text-slate-300 hover:text-white transition-colors">Patient Portal</a></li>
              <li><a href="/doctor" className="text-slate-300 hover:text-white transition-colors">Doctor Dashboard</a></li>
              <li><a href="/guardian" className="text-slate-300 hover:text-white transition-colors">Guardian Access</a></li>
              <li><a href="/pharmacy" className="text-slate-300 hover:text-white transition-colors">Pharmacy Hub</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2 text-slate-300">
                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <a href="mailto:nikhilkumarofficial770@gmail.com" className="hover:text-white transition-colors">
                  nikhilkumarofficial770@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-2 text-slate-300">
                <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <a href="tel:7703913213" className="hover:text-white transition-colors">
                  +91 7703913213
                </a>
              </li>
              <li className="flex items-start gap-2 text-slate-300">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Bangalore, India</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-300">
            <div className="flex items-center gap-2">
              <span>© 2025 VitaData.</span>
              <span className="hidden md:inline">•</span>
              <span className="text-xs">All rights reserved.</span>
            </div>
            
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Security</a>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-400 fill-red-400 animate-pulse" />
              <span>for healthcare</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
