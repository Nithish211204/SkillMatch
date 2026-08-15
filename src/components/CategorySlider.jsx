import React from 'react';
import { Code2, Database, Palette, Megaphone, Box, TrendingUp } from 'lucide-react';

const iconMap = {
  Code2,
  Database,
  Palette,
  Megaphone,
  Box,
  TrendingUp
};

export default function CategorySlider({ categories, selectedCategory, onSelectCategory }) {
  return (
    <section className="py-2">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm sm:text-base font-bold text-slate-800">Popular Categories</h2>
        <button 
          onClick={() => onSelectCategory(null)}
          className="text-xs font-semibold text-emerald-600 hover:underline"
        >
          View all
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3">
        {categories.map((cat) => {
          const Icon = iconMap[cat.icon] || Box;
          const isSelected = selectedCategory === cat.name;

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(isSelected ? null : cat.name)}
              className={`p-3 rounded-2xl border text-left transition flex flex-col justify-between h-20 sm:h-24 ${
                isSelected
                  ? 'border-emerald-500 bg-emerald-50/60 ring-2 ring-emerald-500/20'
                  : 'bg-white border-slate-200 hover:border-emerald-300 hover:bg-slate-50/50'
              }`}
            >
              <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center ${cat.bg}`}>
                <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-slate-800 line-clamp-1">{cat.name}</h3>
                <p className="text-[10px] text-slate-400 font-medium">{cat.count}</p>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
