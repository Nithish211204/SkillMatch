import React from 'react';
import { Bookmark, MapPin, Briefcase, ShieldAlert, Banknote } from 'lucide-react';

export default function JobCard({ job, isSaved, onToggleSave, onApply, onReport }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 hover:shadow-md transition duration-200 flex flex-col justify-between relative group">
      
      <div>
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center p-2 shrink-0">
              <img src={job.companyLogo} alt={job.company} className="max-h-full max-w-full object-contain" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm hover:text-emerald-600 cursor-pointer line-clamp-1">
                {job.title}
              </h4>
              <p className="text-xs text-slate-500 font-medium">{job.company}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Radial Match Score */}
            <div className="relative flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-slate-100"
                  strokeWidth="3"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-emerald-500"
                  strokeDasharray={`${job.matchScore}, 100`}
                  strokeWidth="3"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center text-[10px] font-bold text-slate-800 leading-none">
                <span>{job.matchScore}%</span>
                <span className="text-[7px] text-slate-400 font-normal">Match</span>
              </div>
            </div>

            <button
              onClick={() => onToggleSave(job.id)}
              className={`p-2 rounded-lg border transition ${
                isSaved ? 'bg-emerald-50 border-emerald-200 text-emerald-600' : 'border-slate-100 text-slate-400 hover:text-slate-600'
              }`}
              title={isSaved ? "Saved" : "Save Job"}
            >
              <Bookmark className="w-4 h-4 fill-current" />
            </button>
          </div>
        </div>

        {/* Location & Type */}
        <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-500 mt-3 sm:mt-4 font-medium">
          <span className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            {job.location}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Briefcase className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            {job.type}
          </span>
        </div>

        {/* Salary & Workplace Format */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mt-2.5">
          {job.salary && (
            <span className="px-2 py-0.5 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10px] font-bold flex items-center gap-1">
              <Banknote className="w-3 h-3 text-emerald-600 shrink-0" />
              {job.salary}
            </span>
          )}
          <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[10px] font-semibold">
            {job.experience}
          </span>
          <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[10px] font-semibold">
            {job.workplace}
          </span>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3.5 mt-3.5 border-t border-slate-100">
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-slate-400 font-medium">{job.postedAgo}</span>
          <button
            onClick={() => onReport(job)}
            className="text-[11px] text-slate-400 hover:text-rose-500 font-medium flex items-center gap-1 transition"
          >
            <ShieldAlert className="w-3 h-3" />
            Report
          </button>
        </div>

        <button
          onClick={() => onApply(job)}
          className="px-4 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-semibold shadow-sm transition"
        >
          Apply Now
        </button>
      </div>
    </div>
  );
}
