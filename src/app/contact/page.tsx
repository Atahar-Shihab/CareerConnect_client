'use client';

import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, MessageSquare } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="space-y-16 pb-20 pt-8 max-w-5xl mx-auto px-4">
      
      {/* HEADER */}
      <section className="text-center space-y-4">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-heading font-extrabold text-pine"
        >
          Contact <span className="text-marigold">Us</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-moss-dark font-medium max-w-2xl mx-auto"
        >
          Have questions or need help? Reach out to our team.
        </motion.p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* CONTACT INFO CARD */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="pin-card-yellow p-8 rounded-3xl pin-shadow space-y-8 h-full"
        >
          <div className="space-y-2">
            <h2 className="text-2xl font-heading font-extrabold text-pine">Get in Touch</h2>
            <p className="text-sm font-medium text-pine/80">We usually respond within 24 hours.</p>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center border border-amber-200 shadow-sm shrink-0">
                <Mail className="w-5 h-5 text-marigold" />
              </div>
              <div>
                <p className="text-xs font-bold text-moss-dark uppercase tracking-wider">Email</p>
                <p className="text-pine font-bold">support@careerconnect.bd</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center border border-amber-200 shadow-sm shrink-0">
                <Phone className="w-5 h-5 text-marigold" />
              </div>
              <div>
                <p className="text-xs font-bold text-moss-dark uppercase tracking-wider">Phone</p>
                <p className="text-pine font-bold">+880 1234-567890</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center border border-amber-200 shadow-sm shrink-0">
                <MapPin className="w-5 h-5 text-marigold" />
              </div>
              <div>
                <p className="text-xs font-bold text-moss-dark uppercase tracking-wider">Office</p>
                <p className="text-pine font-bold">Tech Hub, Banani, Dhaka</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CONTACT FORM (UI ONLY) */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card p-8 rounded-3xl border border-moss-light pin-shadow"
        >
          <h2 className="text-2xl font-heading font-extrabold text-pine mb-6 flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-marigold" /> Send a Message
          </h2>
          
          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-pine ml-1">Your Name</label>
              <input 
                type="text" 
                placeholder="John Doe" 
                className="w-full px-4 py-3 rounded-xl border border-moss-light bg-white/50 focus:outline-none focus:ring-2 focus:ring-marigold focus:bg-white transition-all text-sm font-medium"
              />
            </div>
            
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-pine ml-1">Email Address</label>
              <input 
                type="email" 
                placeholder="john@example.com" 
                className="w-full px-4 py-3 rounded-xl border border-moss-light bg-white/50 focus:outline-none focus:ring-2 focus:ring-marigold focus:bg-white transition-all text-sm font-medium"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-pine ml-1">Message</label>
              <textarea 
                rows={4}
                placeholder="How can we help you?" 
                className="w-full px-4 py-3 rounded-xl border border-moss-light bg-white/50 focus:outline-none focus:ring-2 focus:ring-marigold focus:bg-white transition-all text-sm font-medium resize-none"
              ></textarea>
            </div>

            <button type="submit" className="w-full btn-pin-primary text-base py-3">
              Send Message
            </button>
          </form>
        </motion.div>
      </div>

    </div>
  );
}
