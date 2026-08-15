import React, { useState } from 'react';
import { ChevronUp, ChevronDown, Filter } from 'lucide-react';

export default function FilterSidebar({ filters, setFilters, onClearAll }) {
  const [mobileExpanded, setMobileExpanded] = useState(false);

  const handleCheckboxChange = (group, key) => {
    setFilters(prev => ({
      ...prev,
      [group]: {
        ...prev[group],
        [key]: !prev[group]?.[key]
      }
    }));
  };

  return (
    <aside className="w-full lg:w-60 bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 space-y-4 lg:space-y-6 self-start shrink-0">
      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-500 lg:hidden" />
          <h3 className="text-sm font-bold text-slate-800">Filters</h3>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={onClearAll}
            className="text-xs font-semibold text-emerald-600 hover:underline"
          >
            Clear all
          </button>
          <button 
            onClick={() => setMobileExpanded(!mobileExpanded)}
            className="lg:hidden text-slate-400 hover:text-slate-700"
          >
            {mobileExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      <div className={`space-y-4 lg:space-y-6 ${mobileExpanded ? 'block' : 'hidden lg:block'}`}>
        
        {/* Salary Range */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700">
            <span>Salary Range</span>
            <ChevronUp className="w-3.5 h-3.5 text-slate-400" />
          </div>
          <div className="space-y-1.5 pt-1 text-xs">
            {[
              { id: "10-20", label: "₹10L - ₹20L PA", count: "8,450" },
              { id: "20-30", label: "₹20L - ₹30L PA", count: "5,210" },
              { id: "30+", label: "₹30L+ PA", count: "3,120" },
            ].map((item) => (
              <label key={item.id} className="flex items-center justify-between text-slate-600 cursor-pointer hover:text-slate-900">
                <span className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={!!filters.salary?.[item.id]}
                    onChange={() => handleCheckboxChange("salary", item.id)}
                    className="rounded border-slate-300 text-emerald-500 focus:ring-emerald-400 w-3.5 h-3.5"
                  />
                  {item.label}
                </span>
                <span className="text-[10px] text-slate-400">({item.count})</span>
              </label>
            ))}
          </div>
        </div>

        {/* Experience Level */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700">
            <span>Experience Level</span>
            <ChevronUp className="w-3.5 h-3.5 text-slate-400" />
          </div>
          <div className="space-y-1.5 pt-1 text-xs">
            {[
              { id: "fresher", label: "Fresher", count: "1,234" },
              { id: "0-2", label: "0-2 Years", count: "4,567" },
              { id: "2-5", label: "2-5 Years", count: "6,789" },
              { id: "5+", label: "5+ Years", count: "3,456" },
            ].map((item) => (
              <label key={item.id} className="flex items-center justify-between text-slate-600 cursor-pointer hover:text-slate-900">
                <span className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={!!filters.experience?.[item.id]}
                    onChange={() => handleCheckboxChange("experience", item.id)}
                    className="rounded border-slate-300 text-emerald-500 focus:ring-emerald-400 w-3.5 h-3.5"
                  />
                  {item.label}
                </span>
                <span className="text-[10px] text-slate-400">({item.count})</span>
              </label>
            ))}
          </div>
        </div>

        {/* Job Type */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700">
            <span>Job Type</span>
            <ChevronUp className="w-3.5 h-3.5 text-slate-400" />
          </div>
          <div className="space-y-1.5 pt-1 text-xs">
            {[
              { id: "fullTime", label: "Full-time", count: "12,345" },
              { id: "partTime", label: "Part-time", count: "1,234" },
              { id: "contract", label: "Contract", count: "2,345" },
              { id: "internship", label: "Internship", count: "3,456" },
            ].map((item) => (
              <label key={item.id} className="flex items-center justify-between text-slate-600 cursor-pointer hover:text-slate-900">
                <span className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={!!filters.jobType?.[item.id]}
                    onChange={() => handleCheckboxChange("jobType", item.id)}
                    className="rounded border-slate-300 text-emerald-500 focus:ring-emerald-400 w-3.5 h-3.5"
                  />
                  {item.label}
                </span>
                <span className="text-[10px] text-slate-400">({item.count})</span>
              </label>
            ))}
          </div>
        </div>

        {/* Remote */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700">
            <span>Remote</span>
            <ChevronUp className="w-3.5 h-3.5 text-slate-400" />
          </div>
          <div className="space-y-1.5 pt-1 text-xs">
            <label className="flex items-center justify-between text-slate-600 cursor-pointer hover:text-slate-900">
              <span className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={!!filters.remote?.remoteOnly}
                  onChange={() => handleCheckboxChange("remote", "remoteOnly")}
                  className="rounded border-slate-300 text-emerald-500 focus:ring-emerald-400 w-3.5 h-3.5"
                />
                Remote Only
              </span>
              <span className="text-[10px] text-slate-400">(8,765)</span>
            </label>
          </div>
        </div>

      </div>
    </aside>
  );
}
