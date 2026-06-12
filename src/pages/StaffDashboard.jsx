import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { 
  CheckCircle, 
  Clock, 
  User, 
  ClipboardList, 
  LogOut, 
  Search, 
  Filter 
} from "lucide-react";

export default function StaffDashboard() {
  const { token, user, logout } = useAuth();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Search and Filter States
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // 1. Fetch Requests Function
  const fetchRequests = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/api/admin/requests", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        setRequests(data);
      }
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchRequests();
  }, [token]);

  // 2. Logic for Filtering and Searching
  const filteredRequests = requests.filter(req => {
    const matchesSearch = 
      req.student?.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) || 
      req.student?.studentId?.includes(searchTerm);
    
    const matchesStatus = filterStatus === "all" || req.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  // 3. Update Request Status
  const updateStatus = async (id, newStatus) => {
    try {
      await fetch(`http://localhost:5000/api/requests/${id}/status`, {
        method: "PATCH",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify({ status: newStatus }),
      });
      fetchRequests(); // Refresh the table after update
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  return (
    <div className="flex h-screen bg-[#0f172a] text-white overflow-hidden">
      {/* Mini Sidebar */}
      <aside className="w-64 bg-white/5 border-r border-white/10 flex flex-col p-6">
        <div className="flex items-center space-x-2 mb-10">
           <ClipboardList className="w-6 h-6 text-indigo-500" />
           <span className="text-xl font-bold">iServe <span className="text-indigo-500">Staff</span></span>
        </div>
        <div className="flex-1 space-y-2">
            <button className="w-full flex items-center space-x-3 bg-indigo-600/20 text-indigo-400 p-3 rounded-xl font-bold">
                <ClipboardList className="w-5 h-5" />
                <span>Manage Requests</span>
            </button>
        </div>
        <button onClick={logout} className="flex items-center space-x-3 text-rose-400 p-3 hover:bg-rose-500/10 rounded-xl transition-all mt-auto">
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
        </button>
      </aside>

      <main className="flex-1 p-8 overflow-y-auto">
        <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Department: {user?.dept || "General"}</h1>
            <p className="text-white/40">Review and update student requests below.</p>
          </div>

          <div className="flex items-center gap-3">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
              <input 
                type="text" 
                placeholder="Search name or ID..." 
                className="bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-indigo-500 transition-all w-64"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Filter Dropdown */}
            <div className="relative">
              <Filter className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
              <select 
                className="bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-8 text-sm focus:outline-none focus:border-indigo-500 appearance-none transition-all"
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all" className="bg-[#1e293b]">All Status</option>
                <option value="pending" className="bg-[#1e293b]">Pending</option>
                <option value="processing" className="bg-[#1e293b]">Processing</option>
                <option value="completed" className="bg-[#1e293b]">Completed</option>
              </select>
            </div>
          </div>
        </header>

        <div className="bg-white/5 rounded-[2.5rem] border border-white/10 overflow-hidden shadow-2xl">
          <table className="w-full text-left">
            <thead className="bg-white/5 text-[10px] uppercase font-bold text-white/30 tracking-widest">
              <tr>
                <th className="px-6 py-5">Student</th>
                <th className="px-6 py-5">Request</th>
                <th className="px-6 py-5">Status</th>
                <th className="px-6 py-5 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                <tr><td colSpan="4" className="p-10 text-center text-white/20">Loading tickets...</td></tr>
              ) : filteredRequests.length === 0 ? (
                <tr><td colSpan="4" className="p-10 text-center text-white/20">No matching requests found.</td></tr>
              ) : (
                filteredRequests.map((req) => (
                  <tr key={req._id} className="hover:bg-white/5 transition-all">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-400 font-bold">
                          {req.student?.fullName?.[0] || <User className="w-4 h-4" />}
                        </div>
                        <div>
                          <p className="font-bold">{req.student?.fullName || "Unknown Student"}</p>
                          <p className="text-[10px] text-white/30">{req.student?.studentId || "No ID"}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-sm">{req.serviceType}</p>
                      <p className="text-xs text-white/40 italic line-clamp-1">"{req.description}"</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase border ${
                          req.status === 'completed' ? 'border-emerald-500 text-emerald-400 bg-emerald-500/10' :
                          req.status === 'processing' ? 'border-indigo-500 text-indigo-400 bg-indigo-500/10' :
                          'border-amber-500 text-amber-400 bg-amber-500/10'
                      }`}>
                        {req.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center space-x-4">
                        <button 
                          onClick={() => updateStatus(req._id, "processing")} 
                          className="text-white/40 hover:text-indigo-400 transition-all"
                          title="Set to Processing"
                        >
                          <Clock className="w-5 h-5" />
                        </button>
                        <button 
                          onClick={() => updateStatus(req._id, "completed")} 
                          className="text-white/40 hover:text-emerald-400 transition-all"
                          title="Set to Completed"
                        >
                          <CheckCircle className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}