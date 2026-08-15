import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import CategorySlider from './components/CategorySlider';
import FilterSidebar from './components/FilterSidebar';
import JobCard from './components/JobCard';
import ApplyModal from './components/ApplyModal';
import ReportModal from './components/ReportModal';
import GeneralReportModal from './components/GeneralReportModal';
import ResumeParserModal from './components/ResumeParserModal';
import Footer from './components/Footer';
import { initialJobs, categories } from './data/jobsData';
import { 
  LayoutGrid, 
  ListFilter, 
  BookOpen, 
  CheckCircle, 
  Bookmark, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  FileText,
  Search 
} from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState(() => {
    const hash = window.location.hash.replace('#', '');
    const validViews = ['jobs', 'companies', 'saved', 'applications', 'resources'];
    return validViews.includes(hash) ? hash : 'landing';
  });

  const [jobs, setJobs] = useState(initialJobs);
  const [searchTerm, setSearchTerm] = useState('');
  const [locationTerm, setLocationTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [sortBy, setSortBy] = useState('match');

  const [activeJobForApply, setActiveJobForApply] = useState(null);
  const [activeJobForReport, setActiveJobForReport] = useState(null);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);
  const [parsedSkills, setParsedSkills] = useState([]);

  const [savedJobs, setSavedJobs] = useState(() => {
    return JSON.parse(localStorage.getItem('saved_jobs') || '[]');
  });

  const [applications, setApplications] = useState(() => {
    return JSON.parse(localStorage.getItem('user_applications') || '[]');
  });

  useEffect(() => {
    if (currentView === 'landing') {
      window.history.replaceState(null, '', window.location.pathname);
    } else {
      window.location.hash = currentView;
    }
  }, [currentView]);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      const validViews = ['jobs', 'companies', 'saved', 'applications', 'resources'];
      setCurrentView(validViews.includes(hash) ? hash : 'landing');
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    localStorage.setItem('saved_jobs', JSON.stringify(savedJobs));
  }, [savedJobs]);

  const handleToggleSave = (jobId) => {
    setSavedJobs(prev => 
      prev.includes(jobId) ? prev.filter(id => id !== jobId) : [...prev, jobId]
    );
  };

  const handleApplySuccess = (jobId) => {
    const updatedApps = JSON.parse(localStorage.getItem('user_applications') || '[]');
    setApplications(updatedApps);
  };

  const applyParsedSkills = (skills) => {
    setParsedSkills(skills);
    setJobs(prevJobs =>
      prevJobs.map(job => {
        const matched = job.skills.filter(s =>
          skills.some(userSkill => userSkill.toLowerCase() === s.toLowerCase())
        );
        const ratio = matched.length / job.skills.length;
        const newScore = Math.max(45, Math.min(99, Math.round(ratio * 100)));
        return {
          ...job,
          matchScore: newScore
        };
      })
    );
  };

  const initialFilterState = {
    salary: {},
    experience: {},
    jobType: {},
    remote: {}
  };
  const [filters, setFilters] = useState(initialFilterState);

  const handleClearFilters = () => {
    setFilters(initialFilterState);
    setSelectedCategory(null);
    setSearchTerm('');
    setLocationTerm('');
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.skills.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesLocation =
      !locationTerm || job.location.toLowerCase().includes(locationTerm.toLowerCase());

    const matchesCategory =
      !selectedCategory || job.category === selectedCategory;

    const salaryFilters = Object.keys(filters.salary || {}).filter(k => filters.salary[k]);
    let matchesSalary = true;
    if (salaryFilters.length > 0) {
      matchesSalary = salaryFilters.some(salKey => {
        if (salKey === '10-20') return job.minSalaryLpa >= 10 && job.minSalaryLpa < 20;
        if (salKey === '20-30') return job.minSalaryLpa >= 20 && job.minSalaryLpa < 30;
        if (salKey === '30+') return job.minSalaryLpa >= 30;
        return true;
      });
    }

    const expFilters = Object.keys(filters.experience).filter(k => filters.experience[k]);
    let matchesExp = true;
    if (expFilters.length > 0) {
      matchesExp = expFilters.some(expKey => {
        if (expKey === 'fresher') return job.experience.toLowerCase().includes('fresher');
        if (expKey === '0-2') return job.experience.includes('0') || job.experience.includes('1') || job.experience.includes('2');
        if (expKey === '2-5') return job.experience.includes('2') || job.experience.includes('3') || job.experience.includes('4') || job.experience.includes('5');
        if (expKey === '5+') return job.experience.includes('5') || job.experience.includes('8');
        return true;
      });
    }

    const typeFilters = Object.keys(filters.jobType).filter(k => filters.jobType[k]);
    let matchesType = true;
    if (typeFilters.length > 0) {
      matchesType = typeFilters.some(t => {
        if (t === 'fullTime') return job.type.toLowerCase().includes('full-time');
        if (t === 'partTime') return job.type.toLowerCase().includes('part-time');
        if (t === 'contract') return job.type.toLowerCase().includes('contract');
        if (t === 'internship') return job.type.toLowerCase().includes('internship');
        return true;
      });
    }

    const matchesRemote = !filters.remote.remoteOnly || job.workplace.toLowerCase() === 'remote';

    return (
      matchesSearch &&
      matchesLocation &&
      matchesCategory &&
      matchesSalary &&
      matchesExp &&
      matchesType &&
      matchesRemote
    );
  }).sort((a, b) => {
    if (sortBy === 'match') return b.matchScore - a.matchScore;
    if (sortBy === 'latest') return a.id - b.id;
    return 0;
  });

  const savedJobsList = jobs.filter(job => savedJobs.includes(job.id));

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <Header
        currentView={currentView}
        setCurrentView={setCurrentView}
        savedCount={savedJobs.length}
        applicationCount={applications.length}
        onOpenResumeModal={() => setIsResumeModalOpen(true)}
        hasParsedResume={parsedSkills.length > 0}
      />

      {/* VIEW 1: HOME / LANDING */}
      {currentView === 'landing' && (
        <main className="flex-1 animate-fade-in space-y-8 sm:space-y-12 pb-12">
          <Hero
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            locationTerm={locationTerm}
            setLocationTerm={setLocationTerm}
            onSearch={() => setCurrentView('jobs')}
          />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
            <CategorySlider
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={(catName) => {
                setSelectedCategory(catName);
                setCurrentView('jobs');
              }}
            />
          </div>

          {/* AI Banner */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
            <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-3xl p-6 sm:p-10 lg:p-12 text-white shadow-xl flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8">
              <div className="space-y-3 sm:space-y-4 max-w-xl text-center lg:text-left">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold">
                  <Sparkles className="w-3.5 h-3.5" /> Instant AI Matching
                </div>
                <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
                  Stop scrolling endlessly. Let jobs find your skills.
                </h2>
                <p className="text-emerald-100 text-xs sm:text-sm leading-relaxed">
                  Upload your resume in PDF or Word format. Our neural engine extracts your competencies and calculates match scores across 24,000+ positions.
                </p>
                <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-2.5 sm:gap-3">
                  <button
                    onClick={() => setIsResumeModalOpen(true)}
                    className="px-5 sm:px-6 py-2.5 sm:py-3 bg-white text-emerald-800 rounded-xl text-xs font-bold shadow-sm hover:bg-emerald-50 transition"
                  >
                    Upload Resume Now
                  </button>
                  <button
                    onClick={() => setCurrentView('jobs')}
                    className="px-5 sm:px-6 py-2.5 sm:py-3 bg-emerald-700/80 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold transition"
                  >
                    Browse All Jobs
                  </button>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 sm:p-6 w-full lg:w-80 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white text-emerald-700 flex items-center justify-center font-bold shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">Resume Parser 2.0</h4>
                    <p className="text-[11px] text-emerald-100">Live Skill Extraction</p>
                  </div>
                </div>
                <div className="space-y-2 text-xs text-emerald-50 pt-2 border-t border-white/10">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-300 shrink-0" />
                    <span>Instant Skill Gap Analysis</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-300 shrink-0" />
                    <span>Direct Recruiter Visibility</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-300 shrink-0" />
                    <span>1-Click Profile Auto-Fill</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Featured Roles */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 space-y-4 sm:space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900">Featured Opportunities</h3>
                <p className="text-xs text-slate-500">High-matching engineering & product roles</p>
              </div>
              <button
                onClick={() => setCurrentView('jobs')}
                className="text-xs font-bold text-emerald-600 hover:underline flex items-center gap-1"
              >
                <span>View all</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3.5 sm:gap-4">
              {jobs.slice(0, 6).map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  isSaved={savedJobs.includes(job.id)}
                  onToggleSave={handleToggleSave}
                  onApply={(job) => setActiveJobForApply(job)}
                  onReport={(job) => setActiveJobForReport(job)}
                />
              ))}
            </div>
          </section>
        </main>
      )}

      {/* VIEW 2: JOBS WORKSPACE */}
      {currentView === 'jobs' && (
        <main className="flex-1 animate-fade-in px-4 sm:px-6 lg:px-12 py-6 sm:py-8 space-y-6">
          <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
            
            {/* Search Header */}
            <div className="bg-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3 sm:pb-4">
                <div>
                  <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">Search Opportunities</h1>
                  <p className="text-xs text-slate-500">Filter through 24,368 live tech and product openings</p>
                </div>
                {selectedCategory && (
                  <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1 rounded-xl text-xs font-semibold self-start sm:self-auto">
                    <span>Category: {selectedCategory}</span>
                    <button onClick={() => setSelectedCategory(null)} className="hover:text-emerald-900 ml-1">✕</button>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-2.5 sm:gap-3 items-center">
                <div className="md:col-span-6 flex items-center gap-2.5 px-3.5 py-2.5 bg-[#F8FAFC] border border-slate-200 rounded-xl sm:rounded-2xl">
                  <Search className="w-4 h-4 text-slate-400 shrink-0" />
                  <input
                    type="text"
                    placeholder="Job title, keywords, or company..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full text-xs text-slate-800 placeholder-slate-400 bg-transparent focus:outline-none"
                  />
                </div>

                <div className="md:col-span-4 flex items-center gap-2.5 px-3.5 py-2.5 bg-[#F8FAFC] border border-slate-200 rounded-xl sm:rounded-2xl">
                  <span className="text-xs">📍</span>
                  <input
                    type="text"
                    placeholder="Location or 'Remote'"
                    value={locationTerm}
                    onChange={(e) => setLocationTerm(e.target.value)}
                    className="w-full text-xs text-slate-800 placeholder-slate-400 bg-transparent focus:outline-none"
                  />
                </div>

                <div className="md:col-span-2">
                  <button
                    onClick={handleClearFilters}
                    className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl sm:rounded-2xl text-xs font-semibold transition"
                  >
                    Reset Query
                  </button>
                </div>
              </div>
            </div>

            {/* Content Body */}
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
              <FilterSidebar
                filters={filters}
                setFilters={setFilters}
                onClearAll={handleClearFilters}
              />

              <div className="flex-1 space-y-4 w-full">
                <div className="flex flex-wrap items-center justify-between gap-3 pb-1">
                  <p className="text-xs font-bold text-slate-700">
                    Showing <span className="text-slate-900 font-extrabold">{filteredJobs.length}</span> of 24,368 jobs
                  </p>

                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                      <span>Sort:</span>
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="bg-white border border-slate-200 rounded-xl px-2.5 py-1 text-slate-800 font-semibold focus:outline-none cursor-pointer text-xs"
                      >
                        <option value="match">Match</option>
                        <option value="latest">Latest</option>
                      </select>
                    </div>

                    <div className="flex items-center bg-white border border-slate-200 rounded-xl p-0.5 text-xs text-slate-600">
                      <button className="px-2.5 py-1 bg-emerald-50 text-emerald-600 font-semibold rounded-lg flex items-center gap-1 shadow-sm">
                        <LayoutGrid className="w-3.5 h-3.5" />
                        Grid
                      </button>
                      <button className="px-2.5 py-1 text-slate-400 hover:text-slate-700 font-medium flex items-center gap-1">
                        <ListFilter className="w-3.5 h-3.5" />
                        List
                      </button>
                    </div>
                  </div>
                </div>

                {filteredJobs.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3.5 sm:gap-4">
                    {filteredJobs.map((job) => (
                      <JobCard
                        key={job.id}
                        job={job}
                        isSaved={savedJobs.includes(job.id)}
                        onToggleSave={handleToggleSave}
                        onApply={(job) => setActiveJobForApply(job)}
                        onReport={(job) => setActiveJobForReport(job)}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="p-8 sm:p-12 text-center bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 space-y-2">
                    <p className="text-slate-600 font-bold text-sm">No matching jobs found</p>
                    <p className="text-xs text-slate-400">Try adjusting your filters or location search.</p>
                    <button
                      onClick={handleClearFilters}
                      className="mt-3 px-5 py-2 bg-emerald-500 text-white rounded-xl text-xs font-semibold"
                    >
                      Reset All Filters
                    </button>
                  </div>
                )}
              </div>
            </div>

          </div>
        </main>
      )}

      {/* VIEW 3: COMPANIES */}
      {currentView === 'companies' && (
        <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-12 py-8 sm:py-10 space-y-6 sm:space-y-8 animate-fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Top Hiring Companies</h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">Explore verified organizations hiring talent</p>
            </div>
            <button
              onClick={() => setCurrentView('jobs')}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:underline self-start sm:self-auto"
            >
              <ArrowLeft className="w-4 h-4" /> Go to Job Board
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[
              { name: "Google", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg", roles: "42 open roles", desc: "Building products that organize the world's information." },
              { name: "Amazon", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg", roles: "38 open roles", desc: "Customer obsession and global cloud-scale distributed systems." },
              { name: "Microsoft", logo: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg", roles: "29 open roles", desc: "Empowering every person and organization to achieve more." },
              { name: "Swiggy", logo: "https://upload.wikimedia.org/wikipedia/en/1/12/Swiggy_logo.svg", roles: "19 open roles", desc: "Hyper-local logistics and real-time delivery ecosystem." },
              { name: "Zomato", logo: "https://upload.wikimedia.org/wikipedia/commons/7/75/Zomato_logo.png", roles: "15 open roles", desc: "Better food for more people with algorithmic dispatch." },
              { name: "PhonePe", logo: "https://upload.wikimedia.org/wikipedia/commons/7/71/PhonePe_Logo.svg", roles: "24 open roles", desc: "India's largest digital payments and merchant super-app." },
            ].map((comp, idx) => (
              <div key={idx} className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 p-5 sm:p-6 flex flex-col justify-between space-y-4 hover:shadow-md transition">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 bg-slate-50 rounded-2xl border border-slate-100 p-2 flex items-center justify-center shrink-0">
                      <img src={comp.logo} alt={comp.name} className="max-h-full max-w-full object-contain" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm sm:text-base">{comp.name}</h3>
                      <p className="text-xs text-emerald-600 font-semibold">{comp.roles}</p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">{comp.desc}</p>
                </div>

                <button
                  onClick={() => {
                    setSearchTerm(comp.name);
                    setCurrentView('jobs');
                  }}
                  className="w-full py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5"
                >
                  <span>Explore {comp.name} Roles</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </main>
      )}

      {/* VIEW 4: SAVED JOBS */}
      {currentView === 'saved' && (
        <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-12 py-8 sm:py-10 space-y-6 sm:space-y-8 animate-fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <Bookmark className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600 fill-current shrink-0" />
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Saved Jobs</h1>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">Opportunities you have bookmarked</p>
            </div>
            <button
              onClick={() => setCurrentView('jobs')}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:underline self-start sm:self-auto"
            >
              <ArrowLeft className="w-4 h-4" /> Browse more jobs
            </button>
          </div>

          {savedJobsList.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
              {savedJobsList.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  isSaved={true}
                  onToggleSave={handleToggleSave}
                  onApply={(job) => setActiveJobForApply(job)}
                  onReport={(job) => setActiveJobForReport(job)}
                />
              ))}
            </div>
          ) : (
            <div className="p-12 sm:p-16 text-center bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 space-y-3">
              <div className="w-12 h-12 bg-slate-100 text-slate-400 rounded-2xl flex items-center justify-center mx-auto">
                <Bookmark className="w-5 h-5" />
              </div>
              <h3 className="text-slate-800 font-bold text-sm sm:text-base">No saved jobs yet</h3>
              <p className="text-xs text-slate-400 max-w-xs mx-auto">Click the bookmark icon on any job card to save it here.</p>
              <button
                onClick={() => setCurrentView('jobs')}
                className="mt-2 px-5 py-2.5 bg-emerald-500 text-white rounded-xl text-xs font-bold"
              >
                Find Jobs to Save
              </button>
            </div>
          )}
        </main>
      )}

      {/* VIEW 5: APPLICATIONS */}
      {currentView === 'applications' && (
        <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 py-8 sm:py-10 space-y-6 animate-fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Your Applications</h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">Review status updates and submitted resumes</p>
            </div>
            <button
              onClick={() => setCurrentView('jobs')}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:underline self-start sm:self-auto"
            >
              <ArrowLeft className="w-4 h-4" /> Apply for more jobs
            </button>
          </div>

          <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 p-4 sm:p-6 space-y-3 shadow-sm">
            {applications.length > 0 ? (
              <div className="divide-y divide-slate-100">
                {applications.map((app, index) => (
                  <div key={index} className="py-4 sm:py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <h4 className="font-bold text-slate-900 text-sm sm:text-base">{app.jobTitle}</h4>
                      <p className="text-xs text-slate-600 font-medium">{app.company} • Applicant: {app.fullName}</p>
                      <p className="text-[11px] text-slate-400">Resume: <span className="font-semibold text-slate-600">{app.fileName}</span></p>
                    </div>
                    <div>
                      <span className="px-3 py-1 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold rounded-xl flex items-center gap-1.5">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                        Application Received
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 sm:py-16 space-y-2">
                <p className="text-slate-700 font-bold text-sm">No applications submitted yet</p>
                <p className="text-xs text-slate-400">Click "Apply Now" on any job card to submit your profile.</p>
              </div>
            )}
          </div>
        </main>
      )}

      {/* VIEW 6: RESOURCES */}
      {currentView === 'resources' && (
        <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-12 py-8 sm:py-10 space-y-6 sm:space-y-8 animate-fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Career Resources</h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">Playbooks and guides to ace technical interviews</p>
            </div>
            <button
              onClick={() => setCurrentView('jobs')}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:underline self-start sm:self-auto"
            >
              <ArrowLeft className="w-4 h-4" /> Go to Job Board
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {[
              { title: "Crafting ATS-Optimized Resumes", desc: "How to structure technical skills and projects to consistently achieve 90%+ match scores on automated recruitment platforms." },
              { title: "Frontend & Fullstack Technical Playbook", desc: "Comprehensive breakdown of React internals, browser rendering, JavaScript event loops, and fullstack architectural challenges." },
              { title: "Salary & Equity Negotiation Guide", desc: "A practical step-by-step strategy for evaluating stock options, bonuses, and negotiating competitive tech compensation packages." },
              { title: "Machine Learning & AI Engineering Prep", desc: "Core algorithms, transformer architectures, vector embeddings, and real-world system design questions." }
            ].map((res, i) => (
              <div key={i} className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 p-5 sm:p-6 space-y-2.5 shadow-sm hover:shadow-md transition">
                <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <BookOpen className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-sm">{res.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{res.desc}</p>
              </div>
            ))}
          </div>
        </main>
      )}

      {/* Modals */}
      <ApplyModal
        job={activeJobForApply}
        isOpen={!!activeJobForApply}
        onClose={() => setActiveJobForApply(null)}
        onSuccessfulApply={handleApplySuccess}
      />

      <ReportModal
        job={activeJobForReport}
        isOpen={!!activeJobForReport}
        onClose={() => setActiveJobForReport(null)}
      />

      <ResumeParserModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
        onResumeParsed={(res) => applyParsedSkills(res.skills)}
      />

      <GeneralReportModal
        isOpen={isSupportModalOpen}
        onClose={() => setIsSupportModalOpen(false)}
      />

      <Footer
        setCurrentView={setCurrentView}
        onOpenResumeModal={() => setIsResumeModalOpen(true)}
        onOpenSupportModal={() => setIsSupportModalOpen(true)}
      />
    </div>
  );
}
