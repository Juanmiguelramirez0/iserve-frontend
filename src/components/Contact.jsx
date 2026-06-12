import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="py-24 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <motion.h2 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-bold text-white mb-6"
            >
              Get in Touch with MIS
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-xl text-white/50 mb-12"
            >
              Have questions about the system or need immediate assistance? Our MIS team is here to help you.
            </motion.p>

            <div className="space-y-8">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-brand-primary border border-white/10 shadow-lg">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white/40 uppercase tracking-widest">Email Us</h4>
                  <p className="text-lg font-medium text-white/90">Support@laverdad.edu.ph</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-brand-primary border border-white/10 shadow-lg">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white/40 uppercase tracking-widest">Visit Us</h4>
                  <p className="text-lg font-medium text-white/90">MIS Office, La Verdad Christian College</p>
                </div>
              </div>
            </div>

            <div className="mt-16 p-8 bg-brand-primary/20 backdrop-blur-xl border border-white/20 rounded-3xl text-white">
              <h4 className="text-xl font-bold mb-2">Office Hours</h4>
              <p className="text-indigo-100 opacity-90">Monday - Friday: 8:00 AM - 5:00 PM</p>
              <p className="text-indigo-100 opacity-90">Emergency support available for critical systems.</p>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-white/3 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-10 shadow-2xl"
          >
            <h3 className="text-2xl font-bold text-white mb-8">Send us a message</h3>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-white/60 ml-1">Full Name</label>
                  <input 
                    type="text" 
                    placeholder="John Doe"
                    className="w-full px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-white/60 ml-1">Email Address</label>
                  <input 
                    type="email" 
                    placeholder="john@laverdad.edu.ph"
                    className="w-full px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-white/60 ml-1">Department</label>
                <select className="w-full px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-white/60 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all appearance-none cursor-pointer">
                  <option className="bg-brand-dark">Select Department</option>
                  <option className="bg-brand-dark">Academic</option>
                  <option className="bg-brand-dark">Administration</option>
                  <option className="bg-brand-dark">Finance</option>
                  <option className="bg-brand-dark">Registrar</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-white/60 ml-1">Message</label>
                <textarea 
                  rows={4}
                  placeholder="How can we help you?"
                  className="w-full px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all resize-none"
                />
              </div>
              <button className="w-full bg-brand-primary hover:bg-brand-primary/80 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-brand-primary/20 transition-all flex items-center justify-center space-x-2 group">
                <span>Send Message</span>
                <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
