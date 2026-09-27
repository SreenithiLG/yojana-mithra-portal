import React, { useRef, useState, useEffect } from 'react';
import {
  Search,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  CheckCircle,
  FileText,
  Building2,
  TrendingUp,
  Award,
  Users,
  Info,
  X
} from 'lucide-react';
import { ALL_SCHEMES } from '../data/schemes';
import { Scheme } from '../types';

interface HomeViewProps {
  onOpenWizard: () => void;
  onSelectSchemeForAssistant: (scheme: Scheme) => void;
  t: (key: string) => string;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onOpenWizard,
  onSelectSchemeForAssistant,
  t
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [activeModalScheme, setActiveModalScheme] = useState<Scheme | null>(null);

  // Carousel Drag & Scroll State
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollButtons = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScrollButtons();
    const current = carouselRef.current;
    if (current) {
      current.addEventListener('scroll', checkScrollButtons);
      return () => current.removeEventListener('scroll', checkScrollButtons);
    }
  }, []);

  const handleScroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const cardWidth = carouselRef.current.clientWidth / 3;
      const scrollDistance = direction === 'left' ? -cardWidth * 2 : cardWidth * 2;
      carouselRef.current.scrollBy({ left: scrollDistance, behavior: 'smooth' });
    }
  };

  // Mouse Drag Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!carouselRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !carouselRef.current) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    carouselRef.current.scrollLeft = scrollLeft - walk;
    checkScrollButtons();
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  // Touch Swipe Handlers
  const [touchStartX, setTouchStartX] = useState(0);
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 40) {
      handleScroll(diff > 0 ? 'right' : 'left');
    }
  };

  // Filter schemes
  const filteredSchemes = ALL_SCHEMES.filter((scheme) => {
    const matchesSearch =
      scheme.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scheme.acronym.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scheme.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scheme.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesTag =
      selectedTag === 'All' ||
      scheme.topicTag === selectedTag ||
      scheme.tags.includes(selectedTag);

    return matchesSearch && matchesTag;
  });

  const allTags = ['All', 'Employment', 'Finance', 'Skill Development', 'Rural Innovation', 'Credit Guarantee'];

  const getTagColor = (tag: string) => {
    switch (tag) {
      case 'Employment':
        return 'text-emerald-700 bg-emerald-50 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800';
      case 'Finance':
        return 'text-indigo-700 bg-indigo-50 border-indigo-200 dark:bg-indigo-950/60 dark:text-indigo-300 dark:border-indigo-800';
      case 'Skill Development':
        return 'text-sky-700 bg-sky-50 border-sky-200 dark:bg-sky-950/60 dark:text-sky-300 dark:border-sky-800';
      case 'Rural Innovation':
        return 'text-amber-800 bg-amber-50 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800';
      case 'Credit Guarantee':
        return 'text-purple-700 bg-purple-50 border-purple-200 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800';
      default:
        return 'text-slate-700 bg-slate-100 border-slate-200 dark:bg-slate-800 dark:text-slate-300';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white p-8 sm:p-12 border border-slate-800 shadow-xl">
        {/* Subtle Decorative Aura */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-20 w-80 h-80 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold mb-4">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>National Citizen Scheme Discovery Engine</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4 leading-tight">
            {t('heroTitle')}
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
            {t('heroSubtitle')}
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-800/80">
            <div>
              <p className="text-2xl font-bold text-amber-400 tabular-nums">10</p>
              <p className="text-xs text-slate-400">Flagship Central Schemes</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-emerald-400 tabular-nums">Up to 35%</p>
              <p className="text-xs text-slate-400">Capital Subsidies</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-sky-400 tabular-nums">₹500 Lakhs</p>
              <p className="text-xs text-slate-400">Max Guarantee Cover</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-indigo-300 tabular-nums">100% Free</p>
              <p className="text-xs text-slate-400">Official Direct Access</p>
            </div>
          </div>
        </div>
      </div>

      {/* Prominent Search Bar labeled "Find My Scheme" */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-5 border border-slate-200 dark:border-slate-800 shadow-md">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative grow">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Search className="h-5 w-5" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('searchPlaceholder')}
              className="w-full pl-10 pr-4 py-3 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <button
            onClick={onOpenWizard}
            className="shrink-0 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
          >
            <Sparkles className="h-4 w-4 text-slate-950" />
            <span>Find My Scheme</span>
          </button>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 overflow-x-auto pb-1 text-xs">
          <span className="text-slate-400 font-medium shrink-0 mr-1">Filter by Topic:</span>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition-colors cursor-pointer ${
                selectedTag === tag
                  ? 'bg-indigo-900 text-white font-semibold'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* HORIZONTALLY SCROLLABLE CAROUSEL OF SCHEME CARDS (Instagram-story style) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
              <span>{t('storiesTitle')}</span>
              <span className="text-xs font-normal text-slate-500 dark:text-slate-400">
                (10 Key National Programs)
              </span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {t('swipeHint')}
            </p>
          </div>

          {/* Left / Right Arrow Navigation */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => handleScroll('left')}
              disabled={!canScrollLeft}
              className={`p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors shadow-xs ${
                !canScrollLeft
                  ? 'opacity-40 cursor-not-allowed'
                  : 'hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer active:scale-95'
              }`}
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => handleScroll('right')}
              disabled={!canScrollRight}
              className={`p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors shadow-xs ${
                !canScrollRight
                  ? 'opacity-40 cursor-not-allowed'
                  : 'hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer active:scale-95'
              }`}
              aria-label="Scroll right"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Carousel Container: 3 visible on mobile, 4-5 on desktop, drag & swipe support */}
        <div
          ref={carouselRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className={`flex gap-3 sm:gap-4 overflow-x-auto pb-4 pt-1 scroll-smooth select-none no-scrollbar cursor-grab active:cursor-grabbing`}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {ALL_SCHEMES.map((scheme, index) => {
            return (
              <div
                key={scheme.id}
                onClick={() => setActiveModalScheme(scheme)}
                className="shrink-0 w-[calc(33.33%-8px)] min-w-[130px] sm:min-w-[210px] md:min-w-[240px] lg:min-w-[260px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-amber-500/80 dark:hover:border-amber-500/80 rounded-2xl p-3 sm:p-4 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  {/* Top story badge: Index & Topic Tag */}
                  <div className="flex items-center justify-between gap-1 mb-2">
                    <span className="text-[10px] font-mono text-slate-400 font-semibold">
                      0{index + 1}
                    </span>
                    <span
                      className={`text-[9px] sm:text-[10px] font-semibold px-2 py-0.5 rounded-md border truncate max-w-[100px] sm:max-w-none ${getTagColor(
                        scheme.topicTag
                      )}`}
                    >
                      {scheme.topicTag}
                    </span>
                  </div>

                  {/* Scheme Acronym and Full Title */}
                  <h3 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2 leading-snug mb-1">
                    {scheme.name}
                  </h3>

                  <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-tight hidden sm:block">
                    {scheme.shortDescription}
                  </p>
                </div>

                {/* Card Bottom: Max benefit preview & action indicator */}
                <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                  <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 truncate max-w-[85px] sm:max-w-[120px]">
                    {scheme.maxBenefit.split('/')[0]}
                  </span>
                  <span className="text-[10px] text-indigo-700 dark:text-indigo-300 font-semibold group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                    <span className="hidden sm:inline">Details</span>
                    <ChevronRight className="h-3 w-3" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Comprehensive Scheme Catalog Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
            {t('exploreSchemesTitle')}
          </h2>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Showing {filteredSchemes.length} of 10 schemes
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredSchemes.map((scheme) => (
            <div
              key={scheme.id}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span
                    className={`text-xs font-semibold px-2.5 py-0.5 rounded-md border ${getTagColor(
                      scheme.topicTag
                    )}`}
                  >
                    {scheme.topicTag}
                  </span>
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                    {scheme.acronym}
                  </span>
                </div>

                <h3 className="font-bold text-base text-slate-900 dark:text-white mb-2 leading-snug">
                  {scheme.name}
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                  {scheme.shortDescription}
                </p>

                {/* Key Benefits Preview */}
                <div className="space-y-1.5 mb-4">
                  {scheme.keyBenefits.slice(0, 2).map((benefit, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                      <CheckCircle className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="line-clamp-2">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 dark:text-slate-400 font-medium">Assistance:</span>
                  <span className="font-bold text-slate-900 dark:text-white truncate max-w-[180px]">
                    {scheme.maxBenefit}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setActiveModalScheme(scheme)}
                    className="w-full py-2 px-3 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors cursor-pointer text-center"
                  >
                    {t('viewDetails')}
                  </button>
                  <button
                    onClick={onOpenWizard}
                    className="w-full py-2 px-3 text-xs font-semibold rounded-xl bg-indigo-900 hover:bg-indigo-800 text-white transition-colors cursor-pointer text-center shadow-xs"
                  >
                    {t('checkEligibility')}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scheme Detail Modal */}
      {activeModalScheme && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs"
            onClick={() => setActiveModalScheme(null)}
          />
          <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
            {/* Close button */}
            <button
              onClick={() => setActiveModalScheme(null)}
              className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <span
                className={`text-xs font-semibold px-2.5 py-0.5 rounded-md border ${getTagColor(
                  activeModalScheme.topicTag
                )}`}
              >
                {activeModalScheme.topicTag}
              </span>
              <span className="text-xs font-mono text-slate-400 font-semibold">
                {activeModalScheme.acronym}
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-2 leading-tight">
              {activeModalScheme.name}
            </h2>

            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 font-medium">
              {activeModalScheme.ministry}
            </p>

            <div className="p-3.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900 mb-6">
              <p className="text-xs text-indigo-900 dark:text-indigo-200 leading-relaxed">
                {activeModalScheme.fullDescription}
              </p>
            </div>

            {/* Scheme Parameters */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                  Maximum Assistance / Limit
                </p>
                <p className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
                  {activeModalScheme.maxBenefit}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                  Target Beneficiary Group
                </p>
                <p className="text-sm font-bold text-slate-900 dark:text-white mt-0.5 truncate">
                  {activeModalScheme.targetAudience}
                </p>
              </div>
            </div>

            {/* Key Benefits */}
            <div className="mb-6">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2.5 flex items-center gap-1.5">
                <CheckCircle className="h-4 w-4 text-emerald-500" />
                <span>{t('keyBenefits')}</span>
              </h4>
              <ul className="space-y-2">
                {activeModalScheme.keyBenefits.map((b, i) => (
                  <li key={i} className="text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-1.5" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Required Documents */}
            <div className="mb-6">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2.5 flex items-center gap-1.5">
                <FileText className="h-4 w-4 text-amber-500" />
                <span>{t('requiredDocs')}</span>
              </h4>
              <ul className="space-y-2">
                {activeModalScheme.requiredDocuments.map((doc, i) => (
                  <li key={i} className="text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-1.5" />
                    <span>{doc}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
              <a
                href={activeModalScheme.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-200 text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-xs transition-colors"
              >
                <span>{t('officialPortal')}</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>

              <button
                onClick={() => {
                  setActiveModalScheme(null);
                  onSelectSchemeForAssistant(activeModalScheme);
                }}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <Sparkles className="h-3.5 w-3.5 text-slate-950" />
                <span>Ask Yojana Assistant</span>
              </button>

              <button
                onClick={() => {
                  setActiveModalScheme(null);
                  onOpenWizard();
                }}
                className="w-full sm:w-auto sm:ml-auto px-6 py-2.5 rounded-xl bg-indigo-900 hover:bg-indigo-800 text-white text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-sm"
              >
                <span>{t('findMySchemeBtn')}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
