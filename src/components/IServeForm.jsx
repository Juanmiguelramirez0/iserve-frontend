import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { submitRequest } from '../api';
import IServeForm from "./components/IServeForm";
import { 
  ClipboardList, 
  Send, 
  Loader2, 
  ArrowLeft,
  Info
} from "lucide-react";
import { motion } from "framer-motion";

function IServeForm() {
    const navigate = useNavigate();
    const [form, setForm] = useState({ serviceType: '', office: '', description: '' });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await submitRequest(form);
            alert("✅ Request submitted successfully!");
            navigate('/dashboard'); // Go back to dashboard to see the new request
        } catch (err) {
            alert("❌ Error: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0f172a] text-white flex flex-col items-center justify-center p-6">
            
            {/* BACK BUTTON */}
            <button 
                onClick={() => navigate('/dashboard')}
                className="absolute top-8 left-8 flex items-center space-x-2 text-white/40 hover:text-white transition-colors"
            >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Dashboard</span>
            </button>

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[#1e293b] w-full max-w-xl rounded-[2.5rem] border border-white/10 shadow-2xl overflow-hidden"
            >
                {/* HEADER */}
                <div className="bg-gradient-to-br from-[#6366f1] to-[#312e81] p-8 text-white">
                    <div className="flex items-center space-x-3 mb-2">
                        <ClipboardList className="w-6 h-6 text-indigo-300" />
                        <span className="text-sm font-bold uppercase opacity-80 tracking-widest">Service Desk</span>
                    </div>
                    <h2 className="text-3xl font-bold">New iServe Request</h2>
                    <p className="text-white/60 text-sm mt-2">Fill out the details below to request assistance.</p>
                </div>

                {/* FORM BODY */}
                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    
                    {/* OFFICE SELECTION */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-white/50 ml-2">Department / Office</label>
                        <select 
                            required 
                            value={form.office}
                            className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:border-indigo-500 transition-all appearance-none"
                            onChange={(e) => setForm({...form, office: e.target.value})}
                        >
                            <option value="" className="bg-[#1e293b]">Select an Office</option>
                            <option value="Registrar" className="bg-[#1e293b]">Registrar</option>
                            <option value="IT" className="bg-[#1e293b]">IT Support (MIS)</option>
                            <option value="Clinic" className="bg-[#1e293b]">Clinic</option>
                            <option value="Accounting" className="bg-[#1e293b]">Accounting</option>
                        </select>
                    </div>

                    {/* SERVICE TYPE */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-white/50 ml-2">Service Type</label>
                        <input 
                            required
                            placeholder="e.g. ID Replacement, WiFi Access, Transcript" 
                            className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white placeholder:text-white/20 focus:outline-none focus:border-indigo-500 transition-all"
                            value={form.serviceType}
                            onChange={(e) => setForm({...form, serviceType: e.target.value})} 
                        />
                    </div>
                    
                    {/* DESCRIPTION */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-white/50 ml-2">Description / Details</label>
                        <textarea 
                            required
                            rows="4"
                            placeholder="Please provide more information about your request..." 
                            className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white placeholder:text-white/20 focus:outline-none focus:border-indigo-500 transition-all"
                            value={form.description}
                            onChange={(e) => setForm({...form, description: e.target.value})} 
                        />
                    </div>

                    {/* INFO BOX */}
                    <div className="bg-indigo-500/10 p-4 rounded-2xl text-indigo-300 text-xs flex items-start space-x-2">
                        <Info className="w-4 h-4 mt-0.5" />
                        <span>Your request will be visible to the selected office immediately. You will receive an email once the status is updated.</span>
                    </div>

                    {/* SUBMIT BUTTON */}
                    <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full bg-indigo-600 hover:bg-indigo-500 text-white h-14 rounded-2xl font-bold flex items-center justify-center space-x-2 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            <>
                                <span>Submit Request</span>
                                <Send className="w-4 h-4" />
                            </>
                        )}
                    </button>
                </form>
            </motion.div>
        </div>
    );
}

export default IServeForm;