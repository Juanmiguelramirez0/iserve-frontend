import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Zap, Clock, Ticket } from "lucide-react";

export default function Hero({ onLogin }) {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 -z-10 w-1/2 h-full bg-linear-to-br from-[#6366f1] to-[#312e81] opacity-10 blur-3xl rounded-full transform translate-x-1/2 -translate-y-1/4" />
      <div className="absolute bottom-0 left-0 -z-10 w-1/3 h-1/2 bg-blue-400 opacity-10 blur-3xl rounded-full transform -translate-x-1/4 translate-y-1/4" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 text-brand-primary px-3 py-1 rounded-full text-sm font-semibold mb-6">
              < Zap className="w-4 h-4" />
              <span>Fast & Efficient Support System</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight mb-6">
              Empowering Support through <span className="text-brand-primary">iServe LVCC</span>
            </h1>
            <p className="text-xl text-white/60 mb-8 leading-relaxed max-w-xl">
              An online ticketing and support request system designed to streamline communication between La Verdad Christian College departments and the MIS staff.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={onLogin}
                className="bg-indigo-500 hover:bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all shadow-xl shadow-indigo-500/20 flex items-center justify-center space-x-2 group"
              >
                <span>Request Support Now</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="bg-white/5 hover:bg-white/10 text-white border border-white/10 px-8 py-4 rounded-2xl font-bold text-lg transition-all backdrop-blur-sm">
                Learn More
              </button>
            </div>

<div className="mt-12 flex justify-center gap-30 text-white/40">
  
  <div className="flex items-center space-x-2">
    <ShieldCheck className="w-10 h-10 text-emerald-400" />
    <span className="text-sm font-medium">Secure</span>
  </div>

  <div className="flex items-center space-x-2">
    <Clock className="w-10 h-10 text-blue-400" />
    <span className="text-sm font-medium">24/7 Access</span>
  </div>

  <div className="flex items-center justify-center space-x-2">
    <Zap className="w-10 h-10 text-yellow-400" />
    <span className="text-sm font-medium">Instant Track</span>
  </div>

</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative z-10 bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-4">
              <div className="bg-white/5 border border-white/5 rounded-2xl p-6 aspect-video flex flex-col justify-center items-center">
                 <div className="w-20 h-20 bg-brand-primary/20 rounded-full flex items-center justify-center mb-4">
                    <Ticket className="w-10 h-10 text-brand-primary" />
                 </div>
                 <h3 className="text-2xl font-bold text-white mb-2">New Ticket #8492</h3>
                 <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden mb-4">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: "65%" }}
                      transition={{ duration: 1.5, delay: 1 }}
                      className="h-full bg-indigo-500"
                    />
                 </div>
                 <p className="text-white/40 font-medium">Status: In Progress</p>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-yellow-400 opacity-20 blur-2xl rounded-full" />
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-brand-primary opacity-20 blur-3xl rounded-full" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
