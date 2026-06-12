import { motion } from "framer-motion";
import { Users, Layout, Search, Headphones } from "lucide-react";

const features = [
  {
    icon: <Users className="w-6 h-6 " />,
    title: "Centralized Support",
    description: "One place for all your technical needs and support requests across all departments."
  },
  {
    icon: <Layout className="w-6 h-6" />,
    title: "Easy Communication",
    description: "Streamlined communication between LVCC departments and Management Information Systems staff."
  },
  {
    icon: <Search className="w-6 h-6" />,
    title: "Priority Tracking",
    description: "Reported issues are automatically prioritized, tracked, and resolved efficiently."
  },
  {
    icon: <Headphones className="w-6 h-6" />,
    title: "MIS Integration",
    description: "Directly linked to MIS expertise to ensure technical issues are handled by the right people."
  }
];

export default function About() {
  return (
    <section id="about" className="py-24 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-white mb-4"
          >
            About iServe LVCC
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-white/50 max-w-3xl mx-auto"
          >
            The purpose of this project is to design and develop a centralized online ticketing and support request system for La Verdad Christian College.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-8 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all group"
            >
              <div className="w-14 h-14 bg-brand-primary/10 rounded-2xl flex items-center justify-center text-brand-primary mb-6 shadow-sm group-hover:bg-brand-primary group-hover:text-white transition-colors">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-white/40 leading-relaxed font-medium">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 bg-indigo-500/20 backdrop-blur-xl border border-white/20 rounded-[3rem] p-12 text-white relative overflow-hidden"
        >
          <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-6">Transparent & Efficient</h3>
              <p className="text-white/60 text-lg leading-relaxed mb-8">
                We believe in transparency. Track the status of your tickets in real-time and get notified as soon as there's an update. No more lost emails or forgotten requests.
              </p>
              <ul className="space-y-4">
                {["Automated workflows", "Real-time notifications", "Departmental reporting"].map((item, i) => (
                  <li key={i} className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-brand-primary rounded-full flex items-center justify-center shadow-lg shadow-brand-primary/30">
                      <Search className="w-3 h-3 text-white" />
                    </div>
                    <span className="font-medium text-white/80">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 shadow-2xl">
                 <div className="flex justify-between items-center mb-8">
                    <span className="text-2xl font-bold">Monthly Stats</span>
                    <span className="bg-emerald-400 text-brand-dark px-3 py-1 rounded-full text-xs font-bold animate-[pulse-soft_2s_cubic-bezier(0.4,0,0.6,1)_infinite]">LIVE</span>
                 </div>
                 <div className="space-y-6">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Tickets Resolved</span>
                        <span>94%</span>
                      </div>
                      <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                        <div className="h-full bg-brand-primary w-[94%]" />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Response Time</span>
                        <span>Avg 15m</span>
                      </div>
                      <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                        <div className="h-full bg-yellow-400 w-[85%]" />
                      </div>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
