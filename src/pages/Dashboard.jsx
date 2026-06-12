import { 
  BarChart3, 
  Ticket, 
  MessageSquare, 
  Users, 
  Settings, 
  LogOut, 
  Plus, 
  Search,
  CheckCircle2,
  Clock,
  AlertCircle
} from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { user, token, logout } = useAuth();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab ] = useState("overview");
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Calculate Stats from MongoDB Data
  const totalRequests = tickets.length;
  const activeRequests = tickets.filter(t => t.status === 'pending' || t.status === 'processing').length;
  const resolvedRequests = tickets.filter(t => t.status === 'completed').length;

  const userInitials = user?.name 
    ? user.name.split(' ').map(n => n[0]).join('').toUpperCase() 
    : '??';

  // 2. Fetch Data from Node.js Backend
  useEffect(() => {
    if (!token) return;

    const fetchRequests = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/requests/my", {
          headers: { "Authorization": `Bearer ${token}` }
        });
        const data = await response.json();
        if (response.ok) {
          setTickets(data);
        }
      } catch (error) {
        console.error("Failed to fetch tickets:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [token]);

  const handleCreateTicket = () => {
    navigate("/request");
  };

  return (
    <div className="flex h-screen bg-[#0f172a] text-white overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-white/5 backdrop-blur-2xl border-r border-white/10 hidden md:flex flex-col m-4 rounded-[2.5rem]">
        <div className="p-6">
          <div className="flex items-center space-x-2">
            <div className="bg-indigo-600 p-2 rounded-lg text-white shadow-lg shadow-indigo-500/20">
              <Ticket className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold font-display text-white">iServe <span className="text-indigo-400">LVCC</span></span>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          <SidebarItem icon={<BarChart3 />} label="Overview" active={activeTab === "overview"} onClick={() => setActiveTab("overview")} />
          <SidebarItem icon={<Ticket />} label="My Requests" active={activeTab === "tickets"} onClick={() => setActiveTab("tickets")} />
          <SidebarItem icon={<MessageSquare />} label="Messages" active={activeTab === "messages"} onClick={() => setActiveTab("messages")} />
          <SidebarItem icon={<Users />} label="Departments" active={activeTab === "departments"} onClick={() => setActiveTab("departments")} />
        </nav>

        <div className="p-4 border-t border-white/10">
          <SidebarItem icon={<Settings />} label="Settings" onClick={() => {}} />
          <SidebarItem icon={<LogOut />} label="Logout" onClick={logout} danger />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pt-4 pr-4 pb-4">
        <header className="h-16 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl flex items-center justify-between px-8 sticky top-0 z-30 mb-8 mx-4">
          <h2 className="text-xl font-bold text-white">Dashboard</h2>
          <div className="flex items-center space-x-4">
            <div className="relative hidden sm:block">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
              <input 
                type="text" 
                placeholder="Search requests..." 
                className="pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all w-64"
              />
            </div>
            <div className="flex items-center space-x-2">
               <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 font-bold text-xs border border-indigo-500/30">
                  {userInitials}
               </div>
               <span className="text-sm font-semibold text-white/80 hidden sm:block">{user?.name || user?.email}</span>
            </div>
          </div>
        </header>

        <div className="px-4 max-w-6xl mx-auto">
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard label="Total Requests" value={totalRequests} icon={<Ticket />} color="bg-indigo-500" />
            <StatCard label="Active" value={activeRequests} icon={<Clock />} color="bg-amber-500" />
            <StatCard label="Resolved" value={resolvedRequests} icon={<CheckCircle2 />} color="bg-emerald-500" />
            <StatCard label="Support" value="24/7" icon={<AlertCircle />} color="bg-rose-500" />
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Table */}
            <div className="lg:col-span-2 bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl">
              <div className="p-6 border-b border-white/10 flex items-center justify-between">
                <h3 className="font-bold text-white">Recent Requests</h3>
                <button className="text-xs font-bold text-indigo-400 hover:text-white transition-colors">View All</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-white/5 text-white/30 text-[10px] uppercase tracking-widest font-bold">
                    <tr>
                      <th className="px-6 py-4">Service</th>
                      <th className="px-6 py-4">Office</th>
                      <th className="px-6 py-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {loading ? (
                      <tr>
                        <td colSpan="3" className="px-6 py-10 text-center text-white/30 italic">Fetching your iServe data...</td>
                      </tr>
                    ) : tickets.length === 0 ? (
                      <tr>
                        <td colSpan="3" className="px-6 py-10 text-center text-white/30">No requests found. Click "New Request" to start.</td>
                      </tr>
                    ) : tickets.map((ticket) => (
                      <tr key={ticket._id} className="hover:bg-white/5 transition-colors cursor-pointer group">
                        <td className="px-6 py-4">
                          <div className="flex flex-col">
                            <span className="font-bold text-white group-hover:text-indigo-400 transition-colors">{ticket.serviceType}</span>
                            <span className="text-xs text-white/30">{new Date(ticket.dateSubmitted).toLocaleDateString()}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 rounded-full bg-white/5 text-white/50 text-xs font-semibold border border-white/5">{ticket.office}</span>
                        </td>
                        <td className="px-6 py-4">
                          <StatusBadge status={ticket.status} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Right Widget */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-[#6366f1] to-[#312e81] rounded-[2rem] p-8 text-white shadow-2xl overflow-hidden relative group">
                 <div className="relative z-10">
                    <h3 className="text-xl font-bold mb-2">Need Help?</h3>
                    <p className="text-white/70 text-sm mb-6">Create a new iServe request and our team will assist you shortly.</p>
                    <button 
                      onClick={handleCreateTicket}
                      className="w-full bg-white text-indigo-900 py-3 rounded-xl font-bold transition-all shadow-md flex items-center justify-center space-x-2 hover:scale-[1.02] active:scale-95"
                    >
                       <Plus className="w-5 h-5" />
                       <span>New Request</span>
                    </button>
                 </div>
                 <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-125 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// --- HELPER COMPONENTS ---

function SidebarItem({ icon, label, active = false, danger = false, onClick }) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all font-medium ${
        active 
          ? "bg-indigo-600/20 text-white shadow-lg shadow-indigo-500/10" 
          : danger 
            ? "text-rose-500 hover:bg-rose-500/10" 
            : "text-white/40 hover:text-white hover:bg-white/5"
      }`}
    >
      <div className={`w-5 h-5 ${active ? "text-white" : ""}`}>
        {icon}
      </div>
      <span>{label}</span>
    </button>
  );
}

function StatCard({ label, value, icon, color }) {
  return (
    <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-6 shadow-xl hover:bg-white/10 transition-colors">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-xl ${color} text-white shadow-lg`}>
          {icon}
        </div>
      </div>
      <div className="flex flex-col">
        <span className="text-3xl font-bold text-white">{value}</span>
        <span className="text-sm font-medium text-white/30 uppercase tracking-widest">{label}</span>
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const s = status?.toLowerCase() || '';
  const colors = {
    "pending": "bg-amber-500/20 text-amber-300 border-amber-500/20",
    "processing": "bg-indigo-500/20 text-indigo-300 border-indigo-500/20",
    "completed": "bg-emerald-500/20 text-emerald-300 border-emerald-500/20",
  };
  return (
    <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border ${colors[s] || "bg-white/5 text-white/50 border-white/5"}`}>
      {status}
    </span>
  );
}