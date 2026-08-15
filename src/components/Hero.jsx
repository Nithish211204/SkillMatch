import React from 'react';
import { Search, MapPin, Sparkles, ArrowRight, CheckCircle2, Briefcase, Users, ShieldCheck } from 'lucide-react';

export default function Hero({ searchTerm, setSearchTerm, locationTerm, setLocationTerm, onSearch }) {
  return (
    <section className="relative overflow-hidden pt-8 sm:pt-12 pb-10 sm:pb-16 px-4 sm:px-6 lg:px-12 bg-gradient-to-b from-emerald-50/40 via-white to-[#F8FAFC]">
      <div className="max-w-7xl mx-auto space-y-8 sm:space-y-10">
        
        {/* Main Headline */}
        <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 border border-emerald-200/80 shadow-xs backdrop-blur-sm">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[11px] sm:text-xs font-semibold text-slate-700">AI-Powered Career Matching</span>
            <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Find the right opportunity <br className="hidden sm:inline" />
            that <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent underline decoration-emerald-300 decoration-wavy decoration-2">matches</span> your skills
          </h1>

          <p className="text-slate-500 text-xs sm:text-base max-w-xl mx-auto leading-relaxed">
            Upload your resume, analyze your core competencies, and connect directly with 24,000+ verified engineering and product roles.
          </p>
        </div>

        {/* Responsive Search Dock */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white p-2.5 rounded-2xl sm:rounded-3xl shadow-sm border border-slate-200 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            
            <div className="flex items-center gap-2.5 px-3 py-2 flex-1">
              <Search className="w-4 h-4 text-emerald-500 shrink-0" />
              <input
                type="text"
                placeholder="Job title, keywords, or company..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full text-xs sm:text-sm text-slate-800 placeholder-slate-400 bg-transparent focus:outline-none"
              />
            </div>

            <div className="hidden sm:block w-px h-6 bg-slate-200" />

            <div className="flex items-center gap-2.5 px-3 py-2 flex-1">
              <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
              <input
                type="text"
                placeholder="Location or 'Remote'"
                value={locationTerm}
                onChange={(e) => setLocationTerm(e.target.value)}
                className="w-full text-xs sm:text-sm text-slate-800 placeholder-slate-400 bg-transparent focus:outline-none"
              />
            </div>

            <button
              onClick={onSearch}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 active:scale-[0.98] text-white text-xs sm:text-sm font-bold rounded-xl sm:rounded-2xl transition shadow-md shadow-emerald-500/20 shrink-0"
            >
              <span>Explore Roles</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </div>

          {/* Quick Tag Pills */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mt-4 text-[11px] text-slate-400">
            <span className="font-semibold text-slate-500 hidden sm:inline">Popular:</span>
            {["React", "Fullstack", "Data Science", "UI/UX Design", "Remote", "Product Manager"].map((tag, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setSearchTerm(tag);
                  onSearch();
                }}
                className="px-2.5 py-1 rounded-lg bg-white hover:bg-emerald-50 border border-slate-200 text-slate-600 hover:text-emerald-700 hover:border-emerald-300 transition text-[11px]"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Live Counters */}
        <div className="max-w-4xl mx-auto pt-4 sm:pt-6 border-t border-slate-200/60 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 text-center">
          <div className="space-y-0.5">
            <p className="text-base sm:text-xl font-extrabold text-slate-900">24,300+</p>
            <p className="text-[10px] sm:text-[11px] font-medium text-slate-400 flex items-center justify-center gap-1">
              <Briefcase className="w-3 h-3 text-emerald-500" /> Active Jobs
            </p>
          </div>
          <div className="space-y-0.5">
            <p className="text-base sm:text-xl font-extrabold text-slate-900">1,850+</p>
            <p className="text-[10px] sm:text-[11px] font-medium text-slate-400 flex items-center justify-center gap-1">
              <Users className="w-3 h-3 text-emerald-500" /> Companies
            </p>
          </div>
          <div className="space-y-0.5">
            <p className="text-base sm:text-xl font-extrabold text-slate-900">94.8%</p>
            <p className="text-[10px] sm:text-[11px] font-medium text-slate-400 flex items-center justify-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-500" /> Match Accuracy
            </p>
          </div>
          <div className="space-y-0.5">
            <p className="text-base sm:text-xl font-extrabold text-slate-900">100% Free</p>
            <p className="text-[10px] sm:text-[11px] font-medium text-slate-400 flex items-center justify-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-500" /> Guarantee
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
