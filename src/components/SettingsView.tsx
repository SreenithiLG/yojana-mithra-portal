import React, { useState } from 'react';
import {
  Lock,
  Mail,
  Phone,
  Globe,
  Bell,
  Shield,
  KeyRound,
  FileDown,
  HelpCircle,
  Headphones,
  LogOut,
  Trash2,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  AlertTriangle,
  X
} from 'lucide-react';
import { Language, UserProfile } from '../types';

interface SettingsViewProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  user: UserProfile | null;
  onSignOut: () => void;
  onDeleteAccount: () => void;
  t: (key: string) => string;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  language,
  onLanguageChange,
  user,
  onSignOut,
  onDeleteAccount,
  t
}) => {
  // Modal / Interaction states
  const [activeModal, setActiveModal] = useState<
    'password' | 'email' | 'mobile' | 'privacy' | 'security' | 'export' | 'delete' | null
  >(null);

  // Preference switches
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [smsNotifs, setSmsNotifs] = useState(true);
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [dataSharing, setDataSharing] = useState(false);

  // Modal Inputs
  const [tempPassword, setTempPassword] = useState('');
  const [tempEmail, setTempEmail] = useState('');
  const [tempMobile, setTempMobile] = useState('');
  const [actionNotice, setActionNotice] = useState('');

  // FAQ Accordion State
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: 'How does Yojana Mithra calculate scheme eligibility?',
      a: 'Yojana Mithra evaluates your verified criteria (social category, educational qualification, income benchmarks, project sector, and location type) against gazetted Ministry guidelines and credit limits across all 10 flagship schemes.'
    },
    {
      q: 'Is there any application fee for using Yojana Mithra?',
      a: 'No. Yojana Mithra is 100% free citizen-welfare software developed to democratize awareness of Government of India financial schemes and subsidies.'
    },
    {
      q: 'What is the highest capital subsidy available for manufacturing?',
      a: 'Under PMEGP, special category beneficiaries (SC, ST, OBC, Women, PwD, Ex-Servicemen) establishing manufacturing units in rural areas can receive up to 35% margin money capital subsidy on projects up to ₹50 Lakhs.'
    },
    {
      q: 'Do I need physical collateral to secure loans under CGTMSE or CEGSSC?',
      a: 'No. Both CGTMSE (for all MSEs up to ₹5 Cr) and CEGSSC (for SC entrepreneurs up to ₹5 Cr) provide institutional credit guarantee coverage to banks, eliminating the requirement for third-party collateral or personal guarantees.'
    }
  ];

  const handleActionComplete = (msg: string) => {
    setActionNotice(msg);
    setActiveModal(null);
    setTempPassword('');
    setTempEmail('');
    setTempMobile('');
    setTimeout(() => setActionNotice(''), 3500);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          {t('settingsTitle')}
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          {t('settingsSubtitle')}
        </p>
      </div>

      {actionNotice && (
        <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-xs font-semibold flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span>{actionNotice}</span>
        </div>
      )}

      {/* SECTION 1: Account */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-7 shadow-xs space-y-4">
        <h2 className="text-sm font-bold uppercase tracking-wider text-indigo-900 dark:text-indigo-300 flex items-center gap-2">
          <Lock className="h-4 w-4" />
          <span>{t('secAccount')}</span>
        </h2>

        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          <div className="py-3 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-white">
                {t('changePassword')}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Update account login credentials and session keys
              </p>
            </div>
            <button
              onClick={() => setActiveModal('password')}
              className="py-1.5 px-3 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer text-slate-700 dark:text-slate-200 transition-colors"
            >
              Update
            </button>
          </div>

          <div className="py-3 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-white">
                {t('changeEmail')}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Current: {user?.email || 'citizen@example.gov.in'}
              </p>
            </div>
            <button
              onClick={() => setActiveModal('email')}
              className="py-1.5 px-3 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer text-slate-700 dark:text-slate-200 transition-colors"
            >
              Update
            </button>
          </div>

          <div className="py-3 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-white">
                {t('changeMobile')}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Current Aadhaar-linked: {user?.mobile || '9876543210'}
              </p>
            </div>
            <button
              onClick={() => setActiveModal('mobile')}
              className="py-1.5 px-3 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer text-slate-700 dark:text-slate-200 transition-colors"
            >
              Update
            </button>
          </div>
        </div>
      </div>

      {/* SECTION 2: Preferences */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-7 shadow-xs space-y-5">
        <h2 className="text-sm font-bold uppercase tracking-wider text-indigo-900 dark:text-indigo-300 flex items-center gap-2">
          <Globe className="h-4 w-4" />
          <span>{t('secPreferences')}</span>
        </h2>

        {/* Language Selection: Hindi / Tamil / English */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
            {t('selectLanguage')} (Changes All Site Text)
          </label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { id: 'en' as Language, title: 'English', subtitle: 'Standard' },
              { id: 'hi' as Language, title: 'हिन्दी', subtitle: 'Hindi' },
              { id: 'ta' as Language, title: 'தமிழ்', subtitle: 'Tamil' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => onLanguageChange(item.id)}
                className={`py-3 px-4 rounded-xl border text-center transition-all cursor-pointer ${
                  language === item.id
                    ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/80 text-indigo-950 dark:text-white shadow-xs font-bold'
                    : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <p className="text-sm font-bold">{item.title}</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  {item.subtitle}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Notification Preferences */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
          <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            {t('notificationPrefs')}
          </p>

          <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2.5">
              <Mail className="h-4 w-4 text-slate-400" />
              <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                {t('emailNotifications')}
              </span>
            </div>
            <input
              type="checkbox"
              checked={emailNotifs}
              onChange={(e) => setEmailNotifs(e.target.checked)}
              className="h-4 w-4 rounded accent-indigo-900 cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2.5">
              <Phone className="h-4 w-4 text-slate-400" />
              <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                {t('smsNotifications')}
              </span>
            </div>
            <input
              type="checkbox"
              checked={smsNotifs}
              onChange={(e) => setSmsNotifs(e.target.checked)}
              className="h-4 w-4 rounded accent-indigo-900 cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* SECTION 3: Privacy & Security */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-7 shadow-xs space-y-4">
        <h2 className="text-sm font-bold uppercase tracking-wider text-indigo-900 dark:text-indigo-300 flex items-center gap-2">
          <Shield className="h-4 w-4" />
          <span>{t('secPrivacy')}</span>
        </h2>

        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          <div className="py-3 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-white">
                {t('privacySettings')}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Data consent preferences for Lead District Managers & Lending Institutions
              </p>
            </div>
            <button
              onClick={() => setActiveModal('privacy')}
              className="py-1.5 px-3 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer text-slate-700 dark:text-slate-200 transition-colors"
            >
              Manage
            </button>
          </div>

          <div className="py-3 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-white">
                {t('loginSecurity')}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Two-Factor OTP authorization via DigiLocker / Aadhaar linked device
              </p>
            </div>
            <button
              onClick={() => setActiveModal('security')}
              className="py-1.5 px-3 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer text-slate-700 dark:text-slate-200 transition-colors"
            >
              Configure
            </button>
          </div>

          <div className="py-3 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-white">
                {t('manageAccountData')}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Download verified certificate archive or clear locally cached profile
              </p>
            </div>
            <button
              onClick={() => setActiveModal('export')}
              className="py-1.5 px-3 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer text-slate-700 dark:text-slate-200 transition-colors"
            >
              Export
            </button>
          </div>
        </div>
      </div>

      {/* SECTION 4: Support */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-7 shadow-xs space-y-5">
        <h2 className="text-sm font-bold uppercase tracking-wider text-indigo-900 dark:text-indigo-300 flex items-center gap-2">
          <HelpCircle className="h-4 w-4" />
          <span>{t('secSupport')}</span>
        </h2>

        {/* Contact Banner */}
        <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/80 flex items-start gap-3">
          <Headphones className="h-5 w-5 text-amber-700 dark:text-amber-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-bold text-amber-950 dark:text-amber-200">
              {t('contactUs')}
            </p>
            <p className="text-[11px] text-amber-800 dark:text-amber-300 mt-0.5">
              Available 24x7 in Hindi, Tamil, and English. Email grievance support: support@yojanamithra.gov.in
            </p>
          </div>
        </div>

        {/* FAQs Accordion */}
        <div className="space-y-2">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
            {t('faqs')}
          </p>
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden"
            >
              <button
                onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                className="w-full text-left px-4 py-3 bg-slate-50/50 dark:bg-slate-800/40 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-between text-xs font-bold text-slate-800 dark:text-slate-200 cursor-pointer"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`h-4 w-4 text-slate-400 transition-transform ${
                    expandedFaq === i ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {expandedFaq === i && (
                <div className="px-4 py-3 text-xs text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 leading-relaxed">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 5: Account Danger / Logout */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-7 shadow-xs space-y-4">
        <h2 className="text-sm font-bold uppercase tracking-wider text-rose-700 dark:text-rose-400 flex items-center gap-2">
          <AlertTriangle className="h-4 w-4" />
          <span>Account Actions</span>
        </h2>

        <div className="flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={onSignOut}
            className="w-full sm:w-auto py-2.5 px-5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-2"
          >
            <LogOut className="h-4 w-4 text-slate-500" />
            <span>{t('logOutConfirm')}</span>
          </button>

          <button
            onClick={() => setActiveModal('delete')}
            className="w-full sm:w-auto py-2.5 px-5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 hover:bg-rose-100 dark:hover:bg-rose-900/60 text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-2"
          >
            <Trash2 className="h-4 w-4 text-rose-600 dark:text-rose-400" />
            <span>{t('deleteAccount')}</span>
          </button>
        </div>
      </div>

      {/* MODALS */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs"
            onClick={() => setActiveModal(null)}
          />
          <div className="relative w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-2xl">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            {activeModal === 'password' && (
              <div className="space-y-4">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Change Password
                </h3>
                <p className="text-xs text-slate-500">
                  Enter your new password (minimum 6 characters).
                </p>
                <input
                  type="password"
                  placeholder="New password"
                  value={tempPassword}
                  onChange={(e) => setTempPassword(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
                <button
                  onClick={() => handleActionComplete('Password updated successfully!')}
                  disabled={tempPassword.length < 6}
                  className="w-full py-2.5 rounded-xl bg-indigo-900 hover:bg-indigo-800 text-white font-bold text-xs disabled:opacity-50 cursor-pointer"
                >
                  Save New Password
                </button>
              </div>
            )}

            {activeModal === 'email' && (
              <div className="space-y-4">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Change Email Address
                </h3>
                <p className="text-xs text-slate-500">
                  A verification code will be sent to confirm ownership.
                </p>
                <input
                  type="email"
                  placeholder="new.email@gov.in"
                  value={tempEmail}
                  onChange={(e) => setTempEmail(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
                <button
                  onClick={() => handleActionComplete('Email updated successfully!')}
                  disabled={!tempEmail.includes('@')}
                  className="w-full py-2.5 rounded-xl bg-indigo-900 hover:bg-indigo-800 text-white font-bold text-xs disabled:opacity-50 cursor-pointer"
                >
                  Send Verification Code
                </button>
              </div>
            )}

            {activeModal === 'mobile' && (
              <div className="space-y-4">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Change Mobile Number
                </h3>
                <p className="text-xs text-slate-500">
                  Enter 10-digit Aadhaar-linked mobile number.
                </p>
                <input
                  type="tel"
                  placeholder="98XXXXXXXX"
                  maxLength={10}
                  value={tempMobile}
                  onChange={(e) => setTempMobile(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
                <button
                  onClick={() => handleActionComplete('Mobile number updated successfully!')}
                  disabled={tempMobile.length < 10}
                  className="w-full py-2.5 rounded-xl bg-indigo-900 hover:bg-indigo-800 text-white font-bold text-xs disabled:opacity-50 cursor-pointer"
                >
                  Verify via Aadhaar OTP
                </button>
              </div>
            )}

            {activeModal === 'privacy' && (
              <div className="space-y-4">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Privacy & Data Sharing Settings
                </h3>
                <p className="text-xs text-slate-500">
                  Allow Member Lending Institutions (MLIs) to contact you regarding pre-qualified scheme facilities:
                </p>
                <label className="flex items-center gap-2 p-3 rounded-xl border border-slate-200 dark:border-slate-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={dataSharing}
                    onChange={(e) => setDataSharing(e.target.checked)}
                    className="accent-indigo-900"
                  />
                  <span className="text-xs text-slate-700 dark:text-slate-300">
                    Consent to share contact details with Lead District Manager (LDM)
                  </span>
                </label>
                <button
                  onClick={() => handleActionComplete('Privacy settings saved!')}
                  className="w-full py-2.5 rounded-xl bg-indigo-900 hover:bg-indigo-800 text-white font-bold text-xs cursor-pointer"
                >
                  Save Privacy Preferences
                </button>
              </div>
            )}

            {activeModal === 'security' && (
              <div className="space-y-4">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Login Security & 2FA
                </h3>
                <p className="text-xs text-slate-500">
                  Enable mandatory Aadhaar OTP authentication for high-value subsidy applications:
                </p>
                <label className="flex items-center gap-2 p-3 rounded-xl border border-slate-200 dark:border-slate-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={twoFactorAuth}
                    onChange={(e) => setTwoFactorAuth(e.target.checked)}
                    className="accent-indigo-900"
                  />
                  <span className="text-xs text-slate-700 dark:text-slate-300">
                    Require Aadhaar OTP for each login session
                  </span>
                </label>
                <button
                  onClick={() => handleActionComplete('Security configuration updated!')}
                  className="w-full py-2.5 rounded-xl bg-indigo-900 hover:bg-indigo-800 text-white font-bold text-xs cursor-pointer"
                >
                  Confirm Security Settings
                </button>
              </div>
            )}

            {activeModal === 'export' && (
              <div className="space-y-4">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Manage Citizen Data Archive
                </h3>
                <p className="text-xs text-slate-500">
                  Download a complete JSON / CSV copy of your profile parameters and eligible scheme calculations.
                </p>
                <button
                  onClick={() => handleActionComplete('Citizen data bundle downloaded successfully!')}
                  className="w-full py-2.5 rounded-xl bg-indigo-900 hover:bg-indigo-800 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer"
                >
                  <FileDown className="h-4 w-4" />
                  <span>Download Archive (.JSON)</span>
                </button>
              </div>
            )}

            {activeModal === 'delete' && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-rose-600">
                  <AlertTriangle className="h-5 w-5" />
                  <h3 className="text-base font-bold">Permanently Delete Account?</h3>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  This will erase all saved application drafts, eligibility criteria, and verified certificates from your local device session. This action cannot be undone.
                </p>
                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    onClick={() => setActiveModal(null)}
                    className="py-2 px-3 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      setActiveModal(null);
                      onDeleteAccount();
                    }}
                    className="py-2 px-4 rounded-xl bg-rose-600 text-white text-xs font-bold hover:bg-rose-700 cursor-pointer"
                  >
                    Yes, Delete My Account
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
