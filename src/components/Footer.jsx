import { Ticket } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-transparent border-t border-white/5 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-8 md:mb-0">
            <div className="bg-brand-primary p-2 rounded-lg text-white shadow-lg shadow-brand-primary/20">
              <Ticket className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold font-display text-white">iServe <span className="text-brand-primary">LVCC</span></span>
          </div>
          
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-white/50 font-medium mb-8 md:mb-0">
            <a href="#home" className="hover:text-white transition-colors">Home</a>
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>

          <div className="text-white/30 text-sm">
            © {new Date().getFullYear()} La Verdad Christian College. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
