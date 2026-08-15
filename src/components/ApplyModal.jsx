import React, { useState, useEffect } from 'react';
import { X, User, FileText, CheckCircle2, Shield, Send, Check, Banknote } from 'lucide-react';

export default function ApplyModal({ job, isOpen, onClose, onSuccessfulApply }) {
  const [formData, setFormData] = useState({
    fullName: "Rahul Sharma",
    email: "rahulsharma@email.com",
    countryCode: "+91",
    phone: "98765 43210",
    currentLocation: "Bangalore, Karnataka",
    linkedin: "https://linkedin.com/in/rahulsharma",
    portfolio: "https://rahulsharma.dev",
    fileName: "Rahul_Sharma_Resume.pdf",
    fileSize: "1.2 MB",
    additionalInfo: "I have 2+ years of experience building scalable web applications using React and Node.js. I'm passionate about creating clean, user-friendly products."
  });

  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('user_profile_cache');
    if (saved) {
      try {
        setFormData(prev => ({ ...prev, ...JSON.parse(saved) }));
      } catch (e) {}
    }
  }, [isOpen]);

  if (!isOpen || !job) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('user_profile_cache', JSON.stringify(formData));
    
    const currentApplications = JSON.parse(localStorage.getItem('user_applications') || '[]');
    const newApplication = {
      jobId: job.id,
      jobTitle: job.title,
      company: job.company,
      appliedAt: new Date().toISOString(),
      ...formData
    };
    localStorage.setItem('user_applications', JSON.stringify([...currentApplications, newApplication]));

    setSubmitted(true);
    setTimeout(() => {
      onSuccessfulApply(job.id);
      setSubmitted(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-2xl sm:rounded-3xl w-full max-w-5xl shadow-2xl border border-slate-100 overflow-hidden my-4 sm:my-6 flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-slate-100 flex items-center justify-between shrink-0">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">Apply for this job</h2>
            <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">Fill in your details to apply for this position</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 rounded-xl text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-4 sm:p-6 lg:p-8 overflow-y-auto flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          
          <form id="applyForm" onSubmit={handleSubmit} className="lg:col-span-7 space-y-5 sm:space-y-6">
            
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-800">
                <div className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600">
                  <User className="w-4 h-4" />
                </div>
                Personal Details
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Email Address <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Phone Number <span className="text-rose-500">*</span>
                    </label>
                    <div className="flex gap-2">
                      <div className="flex items-center gap-1 px-2.5 py-2.5 border border-slate-200 rounded-xl bg-slate-50 text-xs font-semibold text-slate-700 shrink-0">
                        <span>🇮🇳</span>
                        <span>+91</span>
                      </div>
                      <input
                        type="text"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 min-w-0"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Current Location <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.currentLocation}
                      onChange={(e) => setFormData({ ...formData, currentLocation: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      LinkedIn Profile
                    </label>
                    <input
                      type="url"
                      value={formData.linkedin}
                      onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Resume File */}
            <div className="space-y-2.5">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-800">
                <div className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600">
                  <FileText className="w-4 h-4" />
                </div>
                Resume Attachment
              </div>

              <div className="p-3.5 sm:p-4 rounded-2xl border-2 border-dashed border-indigo-200 bg-indigo-50/20 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xs shrink-0">
                    PDF
                  </div>
                  <div className="truncate">
                    <p className="text-xs font-bold text-slate-800 truncate">{formData.fileName}</p>
                    <p className="text-[10px] text-slate-400">{formData.fileSize}</p>
                  </div>
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 hidden sm:block" />
                </div>

                <button
                  type="button"
                  className="px-3 py-1.5 rounded-xl border border-indigo-300 text-indigo-600 font-semibold text-xs hover:bg-indigo-50 shrink-0"
                >
                  Change File
                </button>
              </div>
            </div>

            {/* Note */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-700">
                Additional Info <span className="text-slate-400 font-normal">(Optional)</span>
              </label>
              <textarea
                rows={3}
                value={formData.additionalInfo}
                onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
                className="w-full p-3 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
            </div>
          </form>

          {/* Right Summary Drawer */}
          <div className="lg:col-span-5 bg-indigo-50/40 rounded-2xl p-5 border border-indigo-100/70 space-y-4 self-start">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-white border border-indigo-100 flex items-center justify-center p-2 shadow-sm shrink-0">
                <img src={job.companyLogo} alt={job.company} className="max-h-full max-w-full object-contain" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">{job.title}</h4>
                <p className="text-xs text-slate-500">{job.company}</p>
              </div>
            </div>

            <div className="space-y-1.5 text-xs text-slate-600 border-b border-indigo-100 pb-3">
              {job.salary && (
                <p className="font-bold text-emerald-700 flex items-center gap-1.5">
                  <Banknote className="w-3.5 h-3.5 shrink-0" />
                  <span>Salary: {job.salary}</span>
                </p>
              )}
              <p>📍 {job.location}</p>
              <p>💼 {job.type} • {job.workplace}</p>
            </div>

            <div>
              <h5 className="text-xs font-bold text-slate-800 mb-1.5">Required Skills</h5>
              <div className="flex flex-wrap gap-1.5">
                {job.skills.map((skill, index) => (
                  <span key={index} className="px-2 py-0.5 bg-indigo-100/60 text-indigo-700 rounded-md text-[10px] font-semibold">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:px-6 border-t border-slate-100 bg-white flex items-center justify-between gap-3 shrink-0">
          <div className="hidden sm:flex items-center gap-2 text-[11px] text-slate-400">
            <Shield className="w-4 h-4 text-indigo-500 shrink-0" />
            <span>Encrypted & confidential application.</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 sm:flex-initial px-4 py-2.5 border border-slate-200 text-slate-700 font-semibold text-xs rounded-xl hover:bg-slate-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              form="applyForm"
              disabled={submitted}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl transition shadow-md shadow-indigo-200"
            >
              {submitted ? (
                <>
                  <Check className="w-4 h-4" />
                  Sent!
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Submit Application
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
