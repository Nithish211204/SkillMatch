import React, { useState } from 'react';
import { FileText, Menu, X } from 'lucide-react';

export default function Header({ 
  currentView, 
  setCurrentView,
  savedCount = 0, 
  applicationCount = 0, 
  onOpenResumeModal,
  hasParsedResume = false
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (viewName) => {
    setCurrentView(viewName);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 px-4 sm:px-6 lg:px-12 py-3 shadow-xs">
      <div className="flex items-center justify-between">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-8">
          <div 
            onClick={() => handleNavClick('landing')} 
            className="flex items-center gap-2 cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-white font-bold text-lg shadow-sm shadow-emerald-200 shrink-0">
              S
            </div>
            <span className="text-xl font-extrabold text-slate-800 tracking-tight">
              Skill<span className="text-emerald-500">Match</span>
            </span>
          </div>

          {/* Desktop Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium">
            <button
              onClick={() => handleNavClick('jobs')}
              className={`pb-1 transition ${
                currentView === 'jobs'
                  ? 'text-emerald-600 border-b-2 border-emerald-500 font-bold'
                  : 'text-slate-500 hover:text-slate-900 border-b-2 border-transparent'
              }`}
            >
              Jobs
            </button>

            <button
              onClick={() => handleNavClick('companies')}
              className={`pb-1 transition ${
                currentView === 'companies'
                  ? 'text-emerald-600 border-b-2 border-emerald-500 font-bold'
                  : 'text-slate-500 hover:text-slate-900 border-b-2 border-transparent'
              }`}
            >
              Companies
            </button>

            <button
              onClick={() => handleNavClick('saved')}
              className={`pb-1 flex items-center gap-1.5 transition ${
                currentView === 'saved'
                  ? 'text-emerald-600 border-b-2 border-emerald-500 font-bold'
                  : 'text-slate-500 hover:text-slate-900 border-b-2 border-transparent'
              }`}
            >
              Saved Jobs
              {savedCount > 0 && (
                <span className="text-[10px] bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded-full font-bold">
                  {savedCount}
                </span>
              )}
            </button>

            <button
              onClick={() => handleNavClick('applications')}
              className={`pb-1 flex items-center gap-1.5 transition ${
                currentView === 'applications'
                  ? 'text-emerald-600 border-b-2 border-emerald-500 font-bold'
                  : 'text-slate-500 hover:text-slate-900 border-b-2 border-transparent'
              }`}
            >
              Applications
              {applicationCount > 0 && (
                <span className="text-[10px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded-full font-bold">
                  {applicationCount}
                </span>
              )}
            </button>

            <button
              onClick={() => handleNavClick('resources')}
              className={`pb-1 transition ${
                currentView === 'resources'
                  ? 'text-emerald-600 border-b-2 border-emerald-500 font-bold'
                  : 'text-slate-500 hover:text-slate-900 border-b-2 border-transparent'
              }`}
            >
              Resources
            </button>
          </nav>
        </div>

        {/* Action Button & Hamburger Toggle */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onOpenResumeModal}
            className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 border rounded-xl text-xs font-semibold transition shadow-sm ${
              hasParsedResume
                ? 'border-emerald-500 bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                : 'border-emerald-500 text-emerald-600 hover:bg-emerald-50'
            }`}
          >
            <FileText className="w-4 h-4 text-emerald-500 shrink-0" />
            <div className="text-left leading-tight hidden sm:block">
              <span className="block font-bold">{hasParsedResume ? "Resume Synced ✓" : "Add Resume"}</span>
              <span className="text-[10px] text-slate-400 font-normal">Parse & get matched</span>
            </div>
            <span className="font-bold sm:hidden">{hasParsedResume ? "Synced" : "Resume"}</span>
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden pt-4 pb-2 border-t border-slate-100 mt-3 space-y-1 animate-fade-in">
          {[
            { id: 'jobs', label: 'Jobs' },
            { id: 'companies', label: 'Companies' },
            { id: 'saved', label: 'Saved Jobs', count: savedCount },
            { id: 'applications', label: 'Applications', count: applicationCount, badgeColor: 'bg-emerald-100 text-emerald-800' },
            { id: 'resources', label: 'Resources' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition text-left ${
                currentView === item.id 
                  ? 'bg-emerald-50 text-emerald-700' 
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <span>{item.label}</span>
              {item.count !== undefined && item.count > 0 && (
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${item.badgeColor || 'bg-slate-100 text-slate-700'}`}>
                  {item.count}
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
