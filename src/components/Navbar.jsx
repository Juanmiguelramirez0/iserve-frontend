import { motion } from "framer-motion";
import { Ticket, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar({ onLogin }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/5 backdrop-blur-2xl border-b border-white/10 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center space-x-2">
            <div className="bg-brand-primary p-2 rounded-lg text-white shadow-lg shadow-brand-primary/20">
              <Ticket className="w-6 h-6" />
            </div>
            <span className="text-xl font-bold font-display text-white">iServe <span className="text-brand-primary">LVCC</span></span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-white/70 hover:text-white font-medium transition-colors">Home</a>
            <a href="#about" className="text-white/70 hover:text-white font-medium transition-colors">About</a>
            <a href="#contact" className="text-white/70 hover:text-white font-medium transition-colors">Contact Us</a>
            <button 
              onClick={onLogin}
              className="bg-brand-primary hover:bg-brand-primary/80 text-white px-6 py-2 rounded-full font-semibold transition-all shadow-lg shadow-brand-primary/20 active:scale-95"
            >
              Log In
            </button>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white">
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-white/5 backdrop-blur-2xl border-t border-white/10"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="#home" className="block px-3 py-2 text-white/70 font-medium">Home</a>
            <a href="#about" className="block px-3 py-2 text-white/70 font-medium">About</a>
            <a href="#contact" className="block px-3 py-2 text-white/70 font-medium">Contact Us</a>
            <button className="w-full mt-2 bg-brand-primary text-white px-6 py-3 rounded-xl font-semibold">
              Log In
            </button>
          </div>
        </motion.div>
      )}
    </nav>
  );
}
