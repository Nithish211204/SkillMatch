import React, { useState } from 'react';
import { X, Shield, Send, Check } from 'lucide-react';

export default function ReportModal({ job, isOpen, onClose }) {
  const [reason, setReason] = useState("");
  const [details, setDetails] = useState("");
  const [email, setEmail] = useState("youremail@example.com");
  const [isSent, setIsSent] = useState(false);

  if (!isOpen || !job) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const reports = JSON.parse(localStorage.getItem('job_reports') || '[]');
    reports.push({
      jobId: job.id,
      jobTitle: job.title,
      company: job.company,
      reason,
      details,
      email,
      reportedAt: new Date().toISOString()
    });
    localStorage.setItem('job_reports', JSON.stringify(reports));

    setIsSent(true);
    setTimeout(() => {
      setIsSent(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl sm:rounded-3xl w-full max-w-md shadow-2xl border border-slate-100 overflow-hidden">
        
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-base text-slate-900">Report this job</h3>
            <p className="text-[11px] text-slate-500 mt-0.5">Help keep SkillMatch trustworthy</p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 transition">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 sm:p-5 space-y-3.5 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Reason <span className="text-rose-500">*</span></label>
            <select
              required
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 bg-white"
            >
              <option value="">Select a reason</option>
              <option value="Fake or Scam">Fake or Scam</option>
              <option value="Expired">Job Expired</option>
              <option value="Wrong Category">Wrong Details</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Details</label>
            <textarea
              maxLength={500}
              rows={3}
              placeholder="Describe the issue..."
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Email <span className="text-rose-500">*</span></label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-slate-200 text-slate-600 font-semibold rounded-xl hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSent}
              className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl flex items-center gap-1.5 shadow-sm"
            >
              {isSent ? <><Check className="w-3.5 h-3.5" /> Sent</> : <><Send className="w-3.5 h-3.5" /> Send Report</>}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
