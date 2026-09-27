import React, { useState } from 'react';
import {
  Camera,
  CheckCircle2,
  Edit3,
  Save,
  RotateCcw,
  User as UserIcon,
  ShieldCheck,
  Check,
  Sparkles
} from 'lucide-react';
import { INDIAN_STATES_DISTRICTS } from '../data/locations';
import { UserProfile } from '../types';

interface ProfileViewProps {
  user: UserProfile;
  onSave: (updated: UserProfile) => void;
  t: (key: string) => string;
}

export const ProfileView: React.FC<ProfileViewProps> = ({ user, onSave, t }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState<UserProfile>(user);
  const [showSavedToast, setShowSavedToast] = useState(false);

  const statesList = Object.keys(INDIAN_STATES_DISTRICTS);
  const districtsForState = form.state ? INDIAN_STATES_DISTRICTS[form.state] || [] : [];

  const handleFieldChange = (field: keyof UserProfile, value: any) => {
    setForm((prev) => {
      const updated = { ...prev, [field]: value };
      if (field === 'state') {
        updated.district = '';
      }
      return updated;
    });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
    setIsEditing(false);
    setShowSavedToast(true);
    setTimeout(() => setShowSavedToast(false), 3500);
  };

  const handleCancel = () => {
    setForm(user);
    setIsEditing(false);
  };

  // Avatar presets
  const handleAvatarSelect = (seed: string) => {
    const newUrl = `https://api.dicebear.com/7.x/bottts/svg?seed=${seed}`;
    handleFieldChange('photoUrl', newUrl);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      {/* Saved Toast */}
      {showSavedToast && (
        <div className="mb-6 p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-xs font-semibold flex items-center justify-between shadow-sm animate-fadeIn">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            <span>{t('profileSavedSuccess')}</span>
          </div>
          <span className="text-[11px] text-emerald-700 dark:text-emerald-300">
            Synced with Scheme Discovery Engine
          </span>
        </div>
      )}

      {/* Profile Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-lg">
        {/* Header with Edit Button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-800 dark:text-indigo-300 text-xs font-semibold mb-2">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Verified Citizen Record · Aadhaar Tier</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              {t('profileTitle')}
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {t('profileSubtitle')}
            </p>
          </div>

          <div className="flex items-center gap-2">
            {!isEditing ? (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="py-2.5 px-5 text-xs font-bold rounded-xl bg-indigo-900 hover:bg-indigo-800 text-white transition-colors cursor-pointer flex items-center gap-2 shadow-xs"
              >
                <Edit3 className="h-4 w-4" />
                <span>{t('editProfile')}</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleCancel}
                className="py-2.5 px-4 text-xs font-semibold rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>{t('cancelEdit')}</span>
              </button>
            )}
          </div>
        </div>

        {/* Editable profile form with fields in the EXACT specified order */}
        <form onSubmit={handleSave} className="space-y-6">
          {/* 1. Profile photo (optional, upload/placeholder circle) */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
            <div className="relative group">
              <div className="w-24 h-24 rounded-full bg-indigo-900 text-amber-400 border-2 border-amber-500/40 flex items-center justify-center text-3xl font-extrabold overflow-hidden shadow-inner">
                {form.photoUrl ? (
                  <img
                    src={form.photoUrl}
                    alt={form.fullName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span>{form.fullName ? form.fullName.charAt(0) : 'U'}</span>
                )}
              </div>
              {isEditing && (
                <div className="absolute inset-0 bg-slate-900/60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera className="h-6 w-6 text-white" />
                </div>
              )}
            </div>

            <div className="text-center sm:text-left">
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                1. Profile Photo
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Official Citizen Avatar (Optional)
              </p>
              {isEditing && (
                <div className="mt-2 flex flex-wrap items-center justify-center sm:justify-start gap-1.5">
                  <span className="text-[11px] text-slate-400 mr-1">Choose Preset:</span>
                  {['sharma', 'artisan', 'verma', 'priya', 'singh'].map((seed) => (
                    <button
                      key={seed}
                      type="button"
                      onClick={() => handleAvatarSelect(seed)}
                      className="px-2.5 py-1 text-[10px] font-semibold rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-amber-500 cursor-pointer"
                    >
                      {seed}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* 2. Full Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                2. {t('fullName')} <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                disabled={!isEditing}
                value={form.fullName}
                onChange={(e) => handleFieldChange('fullName', e.target.value)}
                placeholder="Citizen Full Name"
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white disabled:opacity-75 disabled:bg-slate-50 dark:disabled:bg-slate-850 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all"
              />
            </div>

            {/* 3. Email */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                3. {t('emailAddress')} <span className="text-rose-500">*</span>
              </label>
              <input
                type="email"
                disabled={!isEditing}
                value={form.email}
                onChange={(e) => handleFieldChange('email', e.target.value)}
                placeholder="citizen@example.gov.in"
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white disabled:opacity-75 disabled:bg-slate-50 dark:disabled:bg-slate-850 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all"
              />
            </div>

            {/* 4. Mobile Number */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                4. {t('fieldMobile')}
              </label>
              <input
                type="tel"
                disabled={!isEditing}
                value={form.mobile}
                onChange={(e) => handleFieldChange('mobile', e.target.value)}
                placeholder="10-digit mobile number"
                maxLength={10}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white disabled:opacity-75 disabled:bg-slate-50 dark:disabled:bg-slate-850 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all"
              />
            </div>

            {/* 5. Date of Birth */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                5. {t('fieldDob')}
              </label>
              <input
                type="date"
                disabled={!isEditing}
                value={form.dob}
                onChange={(e) => handleFieldChange('dob', e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white disabled:opacity-75 disabled:bg-slate-50 dark:disabled:bg-slate-850 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all"
              />
            </div>

            {/* 6. Gender */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                6. {t('fieldGender')}
              </label>
              <select
                disabled={!isEditing}
                value={form.gender}
                onChange={(e) => handleFieldChange('gender', e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white disabled:opacity-75 disabled:bg-slate-50 dark:disabled:bg-slate-850 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Transgender">Transgender</option>
              </select>
            </div>

            {/* 7. State */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                7. {t('fieldState')}
              </label>
              <select
                disabled={!isEditing}
                value={form.state}
                onChange={(e) => handleFieldChange('state', e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white disabled:opacity-75 disabled:bg-slate-50 dark:disabled:bg-slate-850 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all"
              >
                <option value="">Select State</option>
                {statesList.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>

            {/* 8. District */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                8. {t('fieldDistrict')}
              </label>
              <select
                disabled={!isEditing || !form.state}
                value={form.district}
                onChange={(e) => handleFieldChange('district', e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white disabled:opacity-75 disabled:bg-slate-50 dark:disabled:bg-slate-850 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all"
              >
                <option value="">{form.state ? 'Select District' : 'Select State First'}</option>
                {districtsForState.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>

            {/* 9. Category (relevant to scheme eligibility) */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                9. {t('fieldSocialCategory')}
              </label>
              <select
                disabled={!isEditing}
                value={form.category}
                onChange={(e) => handleFieldChange('category', e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white disabled:opacity-75 disabled:bg-slate-50 dark:disabled:bg-slate-850 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all"
              >
                <option value="">Select Social Category</option>
                <option value="General">General / Open</option>
                <option value="OBC">OBC (Other Backward Class)</option>
                <option value="SC">SC (Scheduled Caste)</option>
                <option value="ST">ST (Scheduled Tribe)</option>
                <option value="EBC">EBC (Economically Backward Class)</option>
                <option value="DNT">DNT (De-notified Tribes)</option>
              </select>
            </div>

            {/* 10. Annual Family Income */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                10. {t('fieldAnnualIncome')}
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-2.5 text-sm font-bold text-slate-400">
                  ₹
                </span>
                <input
                  type="number"
                  disabled={!isEditing}
                  value={form.annualFamilyIncome}
                  onChange={(e) => handleFieldChange('annualFamilyIncome', e.target.value)}
                  placeholder="e.g. 250000"
                  className="w-full pl-8 pr-4 py-2.5 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white disabled:opacity-75 disabled:bg-slate-50 dark:disabled:bg-slate-850 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all"
                />
              </div>
            </div>

            {/* 11. Occupation */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                11. {t('occupation')}
              </label>
              <input
                type="text"
                disabled={!isEditing}
                value={form.occupation}
                onChange={(e) => handleFieldChange('occupation', e.target.value)}
                placeholder="e.g. Self-employed Artisan / Farmer / Small Business"
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white disabled:opacity-75 disabled:bg-slate-50 dark:disabled:bg-slate-850 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all"
              />
            </div>

            {/* 12. Education Qualification */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                12. {t('fieldEducation')}
              </label>
              <select
                disabled={!isEditing}
                value={form.educationQualification}
                onChange={(e) => handleFieldChange('educationQualification', e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white disabled:opacity-75 disabled:bg-slate-50 dark:disabled:bg-slate-850 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all"
              >
                <option value="">Select Qualification</option>
                <option value="Below 8th">Below 8th standard</option>
                <option value="8th Pass">8th Pass</option>
                <option value="10th–12th">10th–12th Standard</option>
                <option value="Graduate+">Graduate / Post-Graduate / Professional</option>
              </select>
            </div>

            {/* 13. Business/Entrepreneur Details */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                13. {t('businessDetails')}
              </label>
              <textarea
                rows={3}
                disabled={!isEditing}
                value={form.businessDetails}
                onChange={(e) => handleFieldChange('businessDetails', e.target.value)}
                placeholder="Brief summary of your existing enterprise, planned venture, or traditional craft workshop..."
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white disabled:opacity-75 disabled:bg-slate-50 dark:disabled:bg-slate-850 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all"
              />
            </div>
          </div>

          {/* Bottom Action Buttons: Edit Profile and Save Changes */}
          <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-6 border-t border-slate-100 dark:border-slate-800">
            {!isEditing ? (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="w-full sm:w-auto py-2.5 px-6 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <Edit3 className="h-4 w-4" />
                <span>{t('editProfile')}</span>
              </button>
            ) : (
              <>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="w-full sm:w-auto py-2.5 px-5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-semibold cursor-pointer transition-colors"
                >
                  {t('cancelEdit')}
                </button>
                <button
                  type="submit"
                  className="w-full sm:w-auto py-2.5 px-6 rounded-xl bg-indigo-900 hover:bg-indigo-800 text-white text-xs font-bold transition-colors cursor-pointer shadow-md flex items-center justify-center gap-2"
                >
                  <Save className="h-4 w-4" />
                  <span>{t('saveChanges')}</span>
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
