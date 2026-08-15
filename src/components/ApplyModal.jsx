import React, { useState, useEffect } from 'react';
import { X, User, FileText, CheckCircle2, Shield, Send, Check, Banknote, UploadCloud } from 'lucide-react';

export default function ApplyModal({ job, isOpen, onClose, onSuccessfulApply }) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    countryCode: "+91",
    phone: "",
    currentLocation: "",
    linkedin: "",
    portfolio: "",
    fileName: "",
    fileSize: "",
    additionalInfo: ""
  });

  const [submitted, setSubmitted] = useState(false);

  // Load from parsed resume or saved profile cache if available
  useEffect(() => {
    if (isOpen) {
      const saved = localStorage.getItem('user_profile_cache');
      const parsedResume = localStorage.getItem('parsed_resume');
      
      if (parsedResume) {
        try {
          const parsed = JSON.parse(parsedResume);
          setFormData(prev => ({
            ...prev,
            fullName: parsed.fullName || prev.fullName,
            email: parsed.email || prev.email,
            phone: parsed.phone || prev.phone,
            fileName: parsed.fileName || prev.fileName,
            fileSize: parsed.fileSize || prev.fileSize
          }));
        } catch (e) {}
      } else if (saved) {
        try {
          setFormData(prev => ({ ...prev, ...JSON.parse(saved) }));
        } catch (e) {}
      }
    }
  }, [isOpen]);

  if (!isOpen || !job) return null;

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFormData(prev => ({
      ...prev,
      fileName: file.name,
      fileSize: `${(file.size / (1024 * 1024)).toFixed(1)} MB`
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.fileName) {
      alert("Please attach a resume before submitting.");
      return;
    }

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
                    placeholder="e.g. John Doe"
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
                      placeholder="e.g. name@example.com"
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
                        type="tel"
                        required
                        placeholder="98765 43210"
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
                      placeholder="e.g. Hyderabad, Telangana"
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
                      placeholder="https://linkedin.com/in/username"
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
                Resume Attachment <span className="text-rose-500">*</span>
              </div>

              {formData.fileName ? (
                <div className="p-3.5 sm:p-4 rounded-2xl border-2 border-dashed border-indigo-200 bg-indigo-50/20 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xs shrink-0">
                      PDF
                    </div>
                    <div className="truncate">
                      <p className="text-xs font-bold text-slate-800 truncate">{formData.fileName}</p>
                      <p className="text-[10px] text-slate-400">{formData.fileSize || "Attached"}</p>
                    </div>
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 hidden sm:block" />
                  </div>

                  <label className="px-3 py-1.5 rounded-xl border border-indigo-300 text-indigo-600 font-semibold text-xs hover:bg-indigo-50 cursor-pointer shrink-0">
                    Change File
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      className="hidden"
                      onChange={handleFileUpload}
                    />
                  </label>
                </div>
              ) : (
                <label className="border-2 border-dashed border-slate-300 hover:border-indigo-400 bg-slate-50/50 hover:bg-indigo-50/20 transition rounded-2xl p-5 flex flex-col items-center justify-center cursor-pointer text-center">
                  <UploadCloud className="w-7 h-7 text-indigo-500 mb-1.5" />
                  <span className="text-xs font-bold text-slate-700">Click to upload your resume</span>
                  <span className="text-[10px] text-slate-400 mt-0.5">PDF, DOC, DOCX (Max 5MB)</span>
                  <input
                    type="file"
                    required
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                    onChange={handleFileUpload}
                  />
                </label>
              )}
            </div>

            {/* Note */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-700">
                Additional Info <span className="text-slate-400 font-normal">(Optional)</span>
              </label>
              <textarea
                rows={3}
                placeholder="Tell us why you are a great fit for this position..."
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