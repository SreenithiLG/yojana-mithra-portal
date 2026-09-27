import React, { useState } from 'react';
import {
  ShieldCheck,
  Sun,
  Moon,
  Menu,
  X,
  User,
  Home,
  Sliders,
  Sparkles,
  Languages,
  LogOut,
  LogIn
} from 'lucide-react';
import { Language, PageView, UserProfile } from '../types';

interface NavbarProps {
  currentView: PageView;
  onNavigate: (view: PageView) => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  user: UserProfile | null;
  onSignOut: () => void;
  t: (key: string) => string;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  language,
  onLanguageChange,
  darkMode,
  onToggleDarkMode,
  user,
  onSignOut,
  t
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  const navItems = [
    { id: 'home' as PageView, label: t('navHome'), icon: Home },
    { id: 'wizard' as PageView, label: t('navFindScheme'), icon: Sparkles },
    { id: 'profile' as PageView, label: t('navProfile'), icon: User },
    { id: 'settings' as PageView, label: t('navSettings'), icon: Sliders }
  ];

  const handleNavClick = (view: PageView) => {
    onNavigate(view);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Official Government Micro Top Header */}
      <div className="bg-slate-900 border-b border-slate-800 text-slate-300 text-xs px-4 py-1.5 flex items-center justify-between">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-amber-500" />
            <span className="font-medium tracking-wide">
              {t('portalSubtext')}
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-slate-400">
            <span>National Single-Window Portal</span>
            <span aria-hidden="true">·</span>
            <span>Helpline: 1800-180-2026</span>
          </div>
        </div>
      </div>

      {/* Main Official Navbar */}
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Brand Left */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-2.5 text-left group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-900 via-slate-900 to-slate-950 flex items-center justify-center border border-amber-500/30 shadow-sm group-hover:border-amber-500 transition-colors">
                <ShieldCheck className="h-6 w-6 text-amber-500" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                  {t('brandName')}
                </span>
                <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 -mt-1 hidden sm:inline">
                  {t('brandTagline')}
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Persistent Nav Items */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-indigo-50 text-indigo-900 dark:bg-indigo-950/70 dark:text-indigo-300 font-bold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className={`h-4 w-4 ${isActive ? 'text-amber-600 dark:text-amber-400' : ''}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Island: Language, Theme Toggle, Auth */}
          <div className="hidden md:flex items-center gap-2">
            {/* Language Selector Dropdown */}
            <div className="relative">
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                title="Select Language"
              >
                <Languages className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" />
                <span>
                  {language === 'en' ? 'English' : language === 'hi' ? 'हिन्दी' : 'தமிழ்'}
                </span>
              </button>

              {langMenuOpen && (
                <div
                  className="absolute right-0 mt-2 w-36 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl py-1.5 z-50"
                  onClick={() => setLangMenuOpen(false)}
                >
                  <button
                    onClick={() => onLanguageChange('en')}
                    className={`w-full text-left px-3.5 py-1.5 text-xs font-medium cursor-pointer ${
                      language === 'en'
                        ? 'bg-indigo-50 text-indigo-900 font-semibold dark:bg-indigo-950 dark:text-indigo-300'
                        : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700'
                    }`}
                  >
                    English
                  </button>
                  <button
                    onClick={() => onLanguageChange('hi')}
                    className={`w-full text-left px-3.5 py-1.5 text-xs font-medium cursor-pointer ${
                      language === 'hi'
                        ? 'bg-indigo-50 text-indigo-900 font-semibold dark:bg-indigo-950 dark:text-indigo-300'
                        : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700'
                    }`}
                  >
                    हिन्दी (Hindi)
                  </button>
                  <button
                    onClick={() => onLanguageChange('ta')}
                    className={`w-full text-left px-3.5 py-1.5 text-xs font-medium cursor-pointer ${
                      language === 'ta'
                        ? 'bg-indigo-50 text-indigo-900 font-semibold dark:bg-indigo-950 dark:text-indigo-300'
                        : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700'
                    }`}
                  >
                    தமிழ் (Tamil)
                  </button>
                </div>
              )}
            </div>

            {/* Dark / Light Toggle */}
            <button
              onClick={onToggleDarkMode}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800 transition-colors cursor-pointer"
              title={darkMode ? t('lightMode') : t('darkMode')}
              aria-label="Toggle Dark Mode"
            >
              {darkMode ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-slate-700" />}
            </button>

            {/* User Profile or Sign In */}
            {user ? (
              <div className="flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-slate-700">
                <button
                  onClick={() => handleNavClick('profile')}
                  className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer text-left"
                >
                  <div className="w-8 h-8 rounded-full bg-indigo-900 text-amber-400 font-semibold text-xs flex items-center justify-center border border-amber-500/40 overflow-hidden">
                    {user.photoUrl ? (
                      <img src={user.photoUrl} alt={user.fullName} className="w-full h-full object-cover" />
                    ) : (
                      user.fullName.charAt(0) || 'U'
                    )}
                  </div>
                  <div className="hidden xl:flex flex-col">
                    <span className="text-xs font-semibold text-slate-900 dark:text-white leading-tight">
                      {user.fullName.split(' ')[0]}
                    </span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400">
                      {user.category || 'Citizen'}
                    </span>
                  </div>
                </button>
              </div>
            ) : (
              <button
                onClick={() => handleNavClick('auth')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-900 hover:bg-indigo-800 text-white text-xs font-semibold transition-colors cursor-pointer shadow-sm"
              >
                <LogIn className="h-3.5 w-3.5" />
                <span>{t('navSignIn')}</span>
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-1 md:hidden">
            <button
              onClick={onToggleDarkMode}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              aria-label="Open menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Slide-Out Side Panel / Drawer */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 md:hidden flex">
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Side Drawer Content */}
            <div className="relative ml-auto w-4/5 max-w-sm h-full bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 p-6 shadow-2xl flex flex-col justify-between">
              <div>
                {/* Header */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 mb-6">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-6 w-6 text-amber-500" />
                    <span className="font-bold text-lg text-slate-900 dark:text-white">
                      {t('brandName')}
                    </span>
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1 rounded-md text-slate-500 hover:text-slate-900 dark:hover:text-white cursor-pointer"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* User quick status if signed in */}
                {user ? (
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-100 dark:bg-slate-800/80 mb-6">
                    <div className="w-10 h-10 rounded-full bg-indigo-900 text-amber-400 font-bold text-sm flex items-center justify-center">
                      {user.photoUrl ? (
                        <img src={user.photoUrl} alt={user.fullName} className="w-full h-full rounded-full object-cover" />
                      ) : (
                        user.fullName.charAt(0) || 'U'
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900 dark:text-white leading-tight">
                        {user.fullName}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {user.email || 'Citizen Profile'}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="mb-6">
                    <button
                      onClick={() => handleNavClick('auth')}
                      className="w-full py-2.5 px-4 rounded-xl bg-indigo-900 hover:bg-indigo-800 text-white font-semibold text-sm flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                    >
                      <LogIn className="h-4 w-4" />
                      <span>{t('navSignIn')}</span>
                    </button>
                  </div>
                )}

                {/* Nav Links */}
                <div className="space-y-1.5">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = currentView === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleNavClick(item.id)}
                        className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
                          isActive
                            ? 'bg-indigo-50 text-indigo-900 dark:bg-indigo-950/80 dark:text-indigo-300 font-semibold'
                            : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                      >
                        <Icon className={`h-5 w-5 ${isActive ? 'text-amber-500' : 'text-slate-400'}`} />
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Language Switcher for Mobile */}
                <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-800">
                  <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-3 flex items-center gap-1.5">
                    <Languages className="h-3.5 w-3.5 text-amber-500" />
                    <span>Language / भाषा / மொழி</span>
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => onLanguageChange('en')}
                      className={`py-2 px-2 text-xs rounded-lg font-medium cursor-pointer border text-center transition-colors ${
                        language === 'en'
                          ? 'border-indigo-600 bg-indigo-50 text-indigo-900 font-bold dark:bg-indigo-950 dark:text-indigo-300'
                          : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      English
                    </button>
                    <button
                      onClick={() => onLanguageChange('hi')}
                      className={`py-2 px-2 text-xs rounded-lg font-medium cursor-pointer border text-center transition-colors ${
                        language === 'hi'
                          ? 'border-indigo-600 bg-indigo-50 text-indigo-900 font-bold dark:bg-indigo-950 dark:text-indigo-300'
                          : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      हिन्दी
                    </button>
                    <button
                      onClick={() => onLanguageChange('ta')}
                      className={`py-2 px-2 text-xs rounded-lg font-medium cursor-pointer border text-center transition-colors ${
                        language === 'ta'
                          ? 'border-indigo-600 bg-indigo-50 text-indigo-900 font-bold dark:bg-indigo-950 dark:text-indigo-300'
                          : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      தமிழ்
                    </button>
                  </div>
                </div>
              </div>

              {/* Drawer Bottom Actions */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
                {user ? (
                  <button
                    onClick={() => {
                      onSignOut();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xl transition-colors cursor-pointer"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>{t('navLogOut')}</span>
                  </button>
                ) : (
                  <p className="text-[11px] text-center text-slate-500">
                    Official Yojana Mithra Citizen Portal
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
