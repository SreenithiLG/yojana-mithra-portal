/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { SplashLoader } from './components/SplashLoader';
import { Navbar } from './components/Navbar';
import { AuthView } from './components/AuthView';
import { HomeView } from './components/HomeView';
import { EligibilityWizard } from './components/EligibilityWizard';
import { ResultsView } from './components/ResultsView';
import { ProfileView } from './components/ProfileView';
import { SettingsView } from './components/SettingsView';
import { ChatbotAssistant } from './components/ChatbotAssistant';
import { TRANSLATIONS } from './data/translations';
import { evaluateUserEligibility } from './utils/eligibilityEngine';
import {
  Language,
  PageView,
  UserProfile,
  EligibilityFormData,
  SchemeEvaluationResult,
  Scheme
} from './types';
import { ShieldCheck, Heart } from 'lucide-react';

const DEFAULT_FORM_DATA: EligibilityFormData = {
  // Step 1: Personal Details
  fullName: 'Arun Kumar',
  dob: '1995-07-15',
  gender: 'Male',
  mobile: '9876543210',
  state: 'Maharashtra',
  district: 'Pune',
  addressType: 'Rural',

  // Step 2: Category & Social Identity
  socialCategory: 'SC',
  casteCertAvailable: 'Yes',
  isPwD: 'No',
  isExServiceman: 'No',
  isMinority: 'No',

  // Step 3: Economic Status
  annualIncome: 240000,
  isBplCardHolder: 'No',

  // Step 4: Education
  highestQualification: '10th–12th',

  // Step 5: Purpose & Business Details
  purpose: 'Start a New Business',
  sector: 'Manufacturing',
  vishwakarmaTrade: '',
  businessStatus: 'Not Started',
  projectCost: 1500000,
  ownershipStructure: 'Individual',
  categoryOwnershipPercent: 100,

  // Step 6: Prior Government Assistance
  availedGovtLoanLast5Years: 'No',
  alreadyReceivedSubsidy: 'No',
  loanDefault: 'No',
  haveBankLoanToGuarantee: 'No',

  // Step 7: Applicant Type
  applicantType: 'Individual',
  govtOrPrivateSubtype: ''
};

const DEFAULT_USER_PROFILE: UserProfile = {
  photoUrl: 'https://api.dicebear.com/7.x/bottts/svg?seed=arunCitizen',
  fullName: 'Arun Kumar',
  email: 'arun.kumar@yojanamithra.in',
  mobile: '9876543210',
  dob: '1995-07-15',
  gender: 'Male',
  state: 'Maharashtra',
  district: 'Pune',
  category: 'SC',
  annualFamilyIncome: 240000,
  occupation: 'Manufacturing Artisan / Entrepreneur',
  educationQualification: '10th–12th',
  businessDetails: 'Agro-processing and food manufacturing micro-enterprise'
};

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [currentView, setCurrentView] = useState<PageView>('home');
  const [language, setLanguage] = useState<Language>('en');
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [user, setUser] = useState<UserProfile | null>(DEFAULT_USER_PROFILE);
  const [formData, setFormData] = useState<EligibilityFormData>(DEFAULT_FORM_DATA);
  const [evaluationResults, setEvaluationResults] = useState<SchemeEvaluationResult[]>([]);
  const [selectedSchemeForChat, setSelectedSchemeForChat] = useState<Scheme | null>(null);

  // Sync dark mode class on document element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Translation helper
  const t = (key: string): string => {
    return TRANSLATIONS[language]?.[key] || TRANSLATIONS.en[key] || key;
  };

  // Sync User Profile changes to Form Data
  const handleProfileSave = (updatedProfile: UserProfile) => {
    setUser(updatedProfile);
    setFormData((prev) => ({
      ...prev,
      fullName: updatedProfile.fullName,
      dob: updatedProfile.dob,
      gender: (updatedProfile.gender as any) || prev.gender,
      mobile: updatedProfile.mobile,
      state: updatedProfile.state,
      district: updatedProfile.district,
      socialCategory: (updatedProfile.category as any) || prev.socialCategory,
      annualIncome: updatedProfile.annualFamilyIncome,
      highestQualification: (updatedProfile.educationQualification as any) || prev.highestQualification
    }));
  };

  // Run Eligibility Assessment
  const handleFormSubmit = (submittedData: EligibilityFormData) => {
    setFormData(submittedData);
    const results = evaluateUserEligibility(submittedData);
    setEvaluationResults(results);
    setCurrentView('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAuthSuccess = (loggedInUser: UserProfile) => {
    setUser(loggedInUser);
    handleProfileSave(loggedInUser);
    setCurrentView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSignOut = () => {
    setUser(null);
    setCurrentView('home');
  };

  const handleDeleteAccount = () => {
    setUser(null);
    setFormData(DEFAULT_FORM_DATA);
    setCurrentView('home');
  };

  const handleSelectSchemeForAssistant = (scheme: Scheme) => {
    setSelectedSchemeForChat(scheme);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200">
      {/* 1. Splash Screen Animation */}
      {showSplash && (
        <SplashLoader
          onComplete={() => setShowSplash(false)}
          brandTitle={t('brandName')}
          brandTagline={t('brandTagline')}
        />
      )}

      {/* Top Navbar */}
      <Navbar
        currentView={currentView}
        onNavigate={(view) => {
          setCurrentView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        language={language}
        onLanguageChange={setLanguage}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
        user={user}
        onSignOut={handleSignOut}
        t={t}
      />

      {/* Main View Router */}
      <main className="flex-1 pb-16">
        {currentView === 'home' && (
          <HomeView
            onOpenWizard={() => setCurrentView('wizard')}
            onSelectSchemeForAssistant={handleSelectSchemeForAssistant}
            t={t}
          />
        )}

        {currentView === 'auth' && (
          <AuthView
            onSuccess={handleAuthSuccess}
            onCancelToHome={() => setCurrentView('home')}
            t={t}
          />
        )}

        {currentView === 'wizard' && (
          <EligibilityWizard
            initialData={formData}
            onSubmit={handleFormSubmit}
            onCancel={() => setCurrentView('home')}
            t={t}
          />
        )}

        {currentView === 'results' && (
          <ResultsView
            results={evaluationResults.length > 0 ? evaluationResults : evaluateUserEligibility(formData)}
            formData={formData}
            onModifyCriteria={() => setCurrentView('wizard')}
            onAskAssistantAboutScheme={handleSelectSchemeForAssistant}
            t={t}
          />
        )}

        {currentView === 'profile' && (
          <ProfileView
            user={user || DEFAULT_USER_PROFILE}
            onSave={handleProfileSave}
            t={t}
          />
        )}

        {currentView === 'settings' && (
          <SettingsView
            language={language}
            onLanguageChange={setLanguage}
            user={user}
            onSignOut={handleSignOut}
            onDeleteAccount={handleDeleteAccount}
            t={t}
          />
        )}
      </main>

      {/* Floating Chatbot Assistant */}
      <ChatbotAssistant
        onOpenWizard={() => {
          setCurrentView('wizard');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        selectedSchemeForChat={selectedSchemeForChat}
        t={t}
      />

      {/* Official Government Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 text-xs py-8 px-4 sm:px-6 lg:px-8 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-slate-800 border border-amber-500/40 flex items-center justify-center">
              <ShieldCheck className="h-4 w-4 text-amber-500" />
            </div>
            <div>
              <p className="font-bold text-slate-200">
                {t('brandName')} · {t('brandTagline')}
              </p>
              <p className="text-[11px] text-slate-500">
                Government of India · Ministry of Micro, Small and Medium Enterprises & Ministry of Social Justice
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-slate-400 text-xs">
            <button
              onClick={() => setCurrentView('home')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              {t('navHome')}
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => setCurrentView('wizard')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              {t('navFindScheme')}
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => setCurrentView('settings')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              {t('secSupport')}
            </button>
            <span aria-hidden="true">·</span>
            <span>Helpline: 1800-180-2026 (Toll-Free)</span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-6 pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-2">
          <p>© 2026 Yojana Mithra. Designed for citizen accessibility across desktop, tablet, and mobile.</p>
          <p>Official Schemes: PMEGP · NSSH · NSFDC · CEGSSC · VCF-SC · PM-DAKSH · PM Vishwakarma · CGTMSE · ASPIRE · Stand-Up India</p>
        </div>
      </footer>
    </div>
  );
}
