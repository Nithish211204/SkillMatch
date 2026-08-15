import React from 'react';
import { Mail, Linkedin, Twitter, Instagram, Youtube } from 'lucide-react';

export default function Footer({ setCurrentView, onOpenResumeModal, onOpenSupportModal }) {
  const navigateTo = (viewName) => {
    setCurrentView(viewName);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <footer className="bg-white border-t border-slate-200/80 pt-10 sm:pt-12 pb-8 px-4 sm:px-6 lg:px-12 mt-12 sm:mt-16 text-slate-600 text-xs">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 mb-10">
        
        {/* Brand */}
        <div className="sm:col-span-2 space-y-3 sm:space-y-4">
          <div 
            onClick={() => navigateTo('landing')}
            className="flex items-center gap-2 cursor-pointer inline-flex"
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-white font-bold text-base shadow-sm shrink-0">
              S
            </div>
            <span className="text-xl font-extrabold text-slate-900 tracking-tight">
              Skill<span className="text-emerald-500">Match</span>
            </span>
          </div>
          <p className="text-slate-500 max-w-sm leading-relaxed text-xs">
            Find opportunities that match your skills. Upload your resume, get matched with relevant jobs, and accelerate your career.
          </p>
          <div className="flex items-center gap-3 pt-1">
            <a href="#" className="p-2 rounded-lg bg-slate-100 hover:bg-emerald-50 hover:text-emerald-600 transition"><Linkedin className="w-3.5 h-3.5" /></a>
            <a href="#" className="p-2 rounded-lg bg-slate-100 hover:bg-emerald-50 hover:text-emerald-600 transition"><Twitter className="w-3.5 h-3.5" /></a>
            <a href="#" className="p-2 rounded-lg bg-slate-100 hover:bg-emerald-50 hover:text-emerald-600 transition"><Instagram className="w-3.5 h-3.5" /></a>
            <a href="#" className="p-2 rounded-lg bg-slate-100 hover:bg-emerald-50 hover:text-emerald-600 transition"><Youtube className="w-3.5 h-3.5" /></a>
          </div>
        </div>

        {/* For Job Seekers */}
        <div className="space-y-2.5 sm:space-y-3">
          <h4 className="font-bold text-slate-900 text-xs">For Job Seekers</h4>
          <ul className="space-y-2 text-slate-500">
            <li><button onClick={() => navigateTo('jobs')} className="hover:text-slate-900 transition text-left">Browse Jobs</button></li>
            <li><button onClick={() => navigateTo('saved')} className="hover:text-slate-900 transition text-left">Saved Jobs</button></li>
            <li><button onClick={() => navigateTo('applications')} className="hover:text-slate-900 transition text-left">Applications</button></li>
            <li><button onClick={onOpenResumeModal} className="hover:text-slate-900 transition text-left">Resume Builder / Parser</button></li>
            <li><button onClick={() => navigateTo('resources')} className="hover:text-slate-900 transition text-left">Career Resources</button></li>
          </ul>
        </div>

        {/* For Employers */}
        <div className="space-y-2.5 sm:space-y-3">
          <h4 className="font-bold text-slate-900 text-xs">For Employers</h4>
          <ul className="space-y-2 text-slate-500">
            <li><button onClick={() => navigateTo('companies')} className="hover:text-slate-900 transition text-left">Browse Companies</button></li>
            <li><a href="#" className="hover:text-slate-900 transition">Post a Job</a></li>
            <li><a href="#" className="hover:text-slate-900 transition">Pricing</a></li>
            <li><a href="#" className="hover:text-slate-900 transition">Employer Login</a></li>
            <li><button onClick={() => navigateTo('resources')} className="hover:text-slate-900 transition text-left">Resources</button></li>
          </ul>
        </div>

        {/* Support */}
        <div className="space-y-2.5 sm:space-y-3">
          <h4 className="font-bold text-slate-900 text-xs">Report & Support</h4>
          <ul className="space-y-2 text-slate-500">
            <li><button onClick={onOpenSupportModal} className="hover:text-slate-900 transition text-left">Report an Issue</button></li>
            <li><button onClick={() => navigateTo('resources')} className="hover:text-slate-900 transition text-left">Help Center</button></li>
            <li><button onClick={onOpenSupportModal} className="hover:text-slate-900 transition text-left">Contact Support</button></li>
          </ul>

          <div className="pt-2">
            <button
              onClick={onOpenSupportModal}
              className="flex items-center gap-2 px-3 py-2 border border-emerald-500 text-emerald-600 hover:bg-emerald-50 rounded-xl text-[11px] font-semibold transition"
            >
              <Mail className="w-3.5 h-3.5" />
              Report via Email →
            </button>
          </div>
        </div>

      </div>

      {/* Bottom Legal */}
      <div className="max-w-7xl mx-auto pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-400 text-center sm:text-left">
        <p>© 2026 SkillMatch. All rights reserved.</p>
        <div className="flex items-center gap-4 font-medium justify-center">
          <button onClick={() => navigateTo('resources')} className="hover:text-slate-600 transition">Privacy Policy</button>
          <span>|</span>
          <button onClick={() => navigateTo('resources')} className="hover:text-slate-600 transition">Terms</button>
          <span>|</span>
          <button onClick={() => navigateTo('resources')} className="hover:text-slate-600 transition">Disclaimer</button>
        </div>
        <p className="flex items-center justify-center gap-1">
          Made with <span className="text-emerald-500">💚</span> in India 🇮🇳
        </p>
      </div>
    </footer>
  );
}
