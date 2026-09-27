import React, { useState } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  Sparkles,
  ArrowRight,
  Lock,
  Mail,
  User as UserIcon
} from 'lucide-react';
import { UserProfile } from '../types';

interface AuthViewProps {
  onSuccess: (user: UserProfile) => void;
  onCancelToHome: () => void;
  t: (key: string) => string;
}

export const AuthView: React.FC<AuthViewProps> = ({
  onSuccess,
  onCancelToHome,
  t
}) => {
  const [isLoginMode, setIsLoginMode] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
  const [submitError, setSubmitError] = useState('');

  // Validations
  const isNameValid = fullName.trim().length >= 2;
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const isPasswordValid = password.length >= 6;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ fullName: true, email: true, password: true });

    if (isLoginMode) {
      if (!isEmailValid || !isPasswordValid) {
        setSubmitError('Please enter a valid email and minimum 6-character password.');
        return;
      }
      // Mock login
      const loggedInUser: UserProfile = {
        photoUrl: '',
        fullName: email.split('@')[0].toUpperCase() || 'Citizen User',
        email: email.trim(),
        mobile: '9876543210',
        dob: '1995-08-15',
        gender: 'Female',
        state: 'Maharashtra',
        district: 'Pune',
        category: 'OBC',
        annualFamilyIncome: 250000,
        occupation: 'Self-employed Artisan / Entrepreneur',
        educationQualification: 'Graduate+',
        businessDetails: 'Handloom textile and rural artisan collective'
      };
      onSuccess(loggedInUser);
    } else {
      if (!isNameValid || !isEmailValid || !isPasswordValid) {
        setSubmitError('Please fix highlighted errors before continuing.');
        return;
      }
      // Mock signup
      const newUser: UserProfile = {
        photoUrl: '',
        fullName: fullName.trim(),
        email: email.trim(),
        mobile: '9876543210',
        dob: '1996-06-12',
        gender: 'Male',
        state: 'Uttar Pradesh',
        district: 'Lucknow',
        category: 'SC',
        annualFamilyIncome: 180000,
        occupation: 'Micro Enterprise Owner',
        educationQualification: '10th–12th',
        businessDetails: 'Agro-processing and grain milling venture'
      };
      onSuccess(newUser);
    }
  };

  const handleGoogleSignIn = () => {
    const googleUser: UserProfile = {
      photoUrl: 'https://api.dicebear.com/7.x/bottts/svg?seed=yojanaCitizen',
      fullName: 'Vikramaditya Sharma',
      email: 'vikram.sharma.citizen@gov-connect.in',
      mobile: '9820012345',
      dob: '1992-04-14',
      gender: 'Male',
      state: 'Tamil Nadu',
      district: 'Chennai',
      category: 'OBC',
      annualFamilyIncome: 320000,
      occupation: 'Small Scale Manufacturer',
      educationQualification: 'Graduate+',
      businessDetails: 'Eco-friendly packaging and coir craft manufacturing'
    };
    onSuccess(googleUser);
  };

  const handleDemoCitizenFill = () => {
    const demoUser: UserProfile = {
      photoUrl: 'https://api.dicebear.com/7.x/bottts/svg?seed=radhaVerma',
      fullName: 'Sunita Meena',
      email: 'sunita.meena@yojanamithra.nic.in',
      mobile: '9414098765',
      dob: '1994-11-20',
      gender: 'Female',
      state: 'Rajasthan',
      district: 'Jaipur',
      category: 'ST',
      annualFamilyIncome: 220000,
      occupation: 'Handicraft Artisan & Micro Entrepreneur',
      educationQualification: '8th Pass',
      businessDetails: 'Traditional leather craft and footwear workshop'
    };
    onSuccess(demoUser);
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl p-8 relative">
        {/* Subtle Tricolor stripe */}
        <div className="absolute top-0 left-8 right-8 h-1 bg-gradient-to-r from-amber-500 via-slate-400 to-emerald-500 rounded-b-md" />

        {/* Portal Emblem */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-indigo-900 flex items-center justify-center border border-amber-500/30 mb-3 shadow-md">
            <ShieldCheck className="h-8 w-8 text-amber-500" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            {isLoginMode ? t('loginTitle') : t('authWelcome')}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xs">
            {isLoginMode ? t('loginSubtitle') : t('authSubtitle')}
          </p>
        </div>

        {/* 1. Sign in with Google Button at the Top */}
        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="w-full py-2.5 px-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-200 text-sm font-semibold flex items-center justify-center gap-3 transition-colors shadow-xs cursor-pointer mb-5"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span>{t('signInWithGoogle')}</span>
        </button>

        {/* Divider */}
        <div className="relative flex py-2 items-center mb-5">
          <div className="grow border-t border-slate-200 dark:border-slate-800" />
          <span className="shrink mx-3 text-slate-400 text-xs font-medium">
            {t('orContinueWithEmail')}
          </span>
          <div className="grow border-t border-slate-200 dark:border-slate-800" />
        </div>

        {submitError && (
          <div className="mb-4 p-3 rounded-lg bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{submitError}</span>
          </div>
        )}

        {/* 2. Forms: Sign-up has Full Name, Email, Password. Login has Email, Password */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLoginMode && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {t('fullName')} <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <UserIcon className="h-4 w-4" />
                </div>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    setTouched((prev) => ({ ...prev, fullName: true }));
                  }}
                  placeholder="e.g. Ramesh Chandra Verma"
                  className={`w-full pl-9 pr-10 py-2.5 text-sm rounded-xl border bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white focus:outline-none focus:ring-2 transition-all ${
                    touched.fullName
                      ? isNameValid
                        ? 'border-emerald-500 focus:ring-emerald-500/20'
                        : 'border-rose-500 focus:ring-rose-500/20'
                      : 'border-slate-300 dark:border-slate-700 focus:ring-indigo-500/20 focus:border-indigo-600'
                  }`}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  {touched.fullName && (
                    isNameValid ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-rose-500" />
                    )
                  )}
                </div>
              </div>
              {touched.fullName && !isNameValid && (
                <p className="mt-1 text-[11px] text-rose-500 flex items-center gap-1">
                  <span>Please enter full name (minimum 2 letters)</span>
                </p>
              )}
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              {t('emailAddress')} <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Mail className="h-4 w-4" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setTouched((prev) => ({ ...prev, email: true }));
                }}
                placeholder="citizen@example.gov.in"
                className={`w-full pl-9 pr-10 py-2.5 text-sm rounded-xl border bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white focus:outline-none focus:ring-2 transition-all ${
                  touched.email
                    ? isEmailValid
                      ? 'border-emerald-500 focus:ring-emerald-500/20'
                      : 'border-rose-500 focus:ring-rose-500/20'
                    : 'border-slate-300 dark:border-slate-700 focus:ring-indigo-500/20 focus:border-indigo-600'
                }`}
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                {touched.email && (
                  isEmailValid ? (
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-rose-500" />
                  )
                )}
              </div>
            </div>
            {touched.email && !isEmailValid && (
              <p className="mt-1 text-[11px] text-rose-500 flex items-center gap-1">
                <span>Please enter a valid email address</span>
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              {t('password')} <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Lock className="h-4 w-4" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setTouched((prev) => ({ ...prev, password: true }));
                }}
                placeholder="At least 6 characters"
                className={`w-full pl-9 pr-16 py-2.5 text-sm rounded-xl border bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white focus:outline-none focus:ring-2 transition-all ${
                  touched.password
                    ? isPasswordValid
                      ? 'border-emerald-500 focus:ring-emerald-500/20'
                      : 'border-rose-500 focus:ring-rose-500/20'
                    : 'border-slate-300 dark:border-slate-700 focus:ring-indigo-500/20 focus:border-indigo-600'
                }`}
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
                {touched.password && (
                  isPasswordValid ? (
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 pointer-events-none" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-rose-500 pointer-events-none" />
                  )
                )}
              </div>
            </div>
            {touched.password && !isPasswordValid && (
              <p className="mt-1 text-[11px] text-rose-500 flex items-center gap-1">
                <span>Password must be at least 6 characters long</span>
              </p>
            )}
          </div>

          {/* Toggle between Signup and Login */}
          <div className="text-center pt-1">
            <button
              type="button"
              onClick={() => {
                setIsLoginMode(!isLoginMode);
                setSubmitError('');
              }}
              className="text-xs text-indigo-700 dark:text-indigo-400 hover:underline font-semibold cursor-pointer"
            >
              {isLoginMode ? t('dontHaveAccount') : t('alreadyHaveAccount')}
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2.5 px-4 rounded-xl bg-indigo-900 hover:bg-indigo-800 text-white font-semibold text-sm transition-colors cursor-pointer shadow-md flex items-center justify-center gap-2 mt-4"
          >
            <span>{isLoginMode ? t('loginBtn') : t('signUpBtn')}</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        {/* Demo Fast Login Shortcut */}
        <div className="mt-6 pt-5 border-t border-slate-200 dark:border-slate-800">
          <button
            type="button"
            onClick={handleDemoCitizenFill}
            className="w-full py-2 px-3 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/80 text-amber-900 dark:text-amber-300 text-xs font-medium flex items-center justify-center gap-1.5 hover:bg-amber-100 dark:hover:bg-amber-900/60 transition-colors cursor-pointer"
          >
            <Sparkles className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" />
            <span>{t('demoLogin')}</span>
          </button>

          <div className="mt-3 text-center">
            <button
              type="button"
              onClick={onCancelToHome}
              className="text-xs text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 cursor-pointer"
            >
              Continue as Guest Citizen
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
