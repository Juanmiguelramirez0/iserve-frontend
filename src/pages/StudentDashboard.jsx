import React, { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';

export default function StudentDashboard() {
    const { token, logout } = useAuth();
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/api/requests/my", {
            headers: { "Authorization": `Bearer ${token}` }
        })
        .then(res => res.json())
        .then(data => setRequests(data));
    }, [token]);

    return (
        <div className="min-h-screen bg-[#0f172a] text-white p-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">My iServe History</h1>
                <button onClick={logout} className="text-rose-400 text-sm">Logout</button>
            </div>

            <div className="grid gap-4">
                {requests.length === 0 ? <p className="text-white/40">No requests found.</p> : 
                    requests.map(req => (
                        <div key={req._id} className="bg-[#1e293b] p-6 rounded-2xl border border-white/5 flex justify-between items-center">
                            <div>
                                <h3 className="font-bold text-lg">{req.serviceType}</h3>
                                <p className="text-white/50 text-sm">{req.office} Office • {new Date(req.dateSubmitted).toLocaleDateString()}</p>
                            </div>
                            <span className={`px-4 py-1 rounded-full text-xs font-bold uppercase ${
                                req.status === 'completed' ? 'bg-emerald-500/20 text-emerald-400' : 
                                req.status === 'processing' ? 'bg-blue-500/20 text-blue-400' : 'bg-amber-500/20 text-amber-400'
                            }`}>
                                {req.status}
                            </span>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}