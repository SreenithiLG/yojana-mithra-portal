import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Info,
  ShieldCheck,
  Check,
  RotateCcw
} from 'lucide-react';
import { INDIAN_STATES_DISTRICTS, PM_VISHWAKARMA_18_TRADES } from '../data/locations';
import { EligibilityFormData } from '../types';

interface EligibilityWizardProps {
  initialData: EligibilityFormData;
  onSubmit: (data: EligibilityFormData) => void;
  onCancel: () => void;
  t: (key: string) => string;
}

export const EligibilityWizard: React.FC<EligibilityWizardProps> = ({
  initialData,
  onSubmit,
  onCancel,
  t
}) => {
  const [formData, setFormData] = useState<EligibilityFormData>(initialData);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const totalSteps = 7;
  const [stepErrors, setStepErrors] = useState<string>('');

  const statesList = Object.keys(INDIAN_STATES_DISTRICTS);
  const districtsForState = formData.state ? INDIAN_STATES_DISTRICTS[formData.state] || [] : [];

  const updateField = (field: keyof EligibilityFormData, value: any) => {
    setFormData((prev) => {
      const updated = { ...prev, [field]: value };
      // Reset district if state changes
      if (field === 'state') {
        updated.district = '';
      }
      return updated;
    });
    setStepErrors('');
  };

  // Step Validation logic
  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        if (!formData.fullName.trim()) {
          setStepErrors('Please provide your Full Name.');
          return false;
        }
        if (!formData.gender) {
          setStepErrors('Please select your gender.');
          return false;
        }
        if (!formData.state) {
          setStepErrors('Please select your residential state.');
          return false;
        }
        return true;

      case 2:
        if (!formData.socialCategory) {
          setStepErrors('Please select your Social Category.');
          return false;
        }
        return true;

      case 3:
        if (formData.annualIncome === '' || formData.annualIncome === undefined) {
          setStepErrors('Please provide your Annual Family Income.');
          return false;
        }
        return true;

      case 4:
        if (!formData.highestQualification) {
          setStepErrors('Please select your Highest Educational Qualification.');
          return false;
        }
        return true;

      case 5:
        if (!formData.purpose) {
          setStepErrors('Please select your Primary Purpose.');
          return false;
        }
        if (!formData.sector) {
          setStepErrors('Please select your Sector.');
          return false;
        }
        if (formData.sector === 'Traditional Craft/Trade' && !formData.vishwakarmaTrade) {
          setStepErrors('Please select one of the 18 PM Vishwakarma traditional trades.');
          return false;
        }
        if (
          formData.ownershipStructure &&
          formData.ownershipStructure !== 'Individual' &&
          (formData.categoryOwnershipPercent === '' || formData.categoryOwnershipPercent === undefined)
        ) {
          setStepErrors("Please specify the percentage ownership held by applicant's category.");
          return false;
        }
        return true;

      case 6:
        if (!formData.loanDefault) {
          setStepErrors('Please answer whether there is any history of loan default.');
          return false;
        }
        return true;

      case 7:
        if (!formData.applicantType) {
          setStepErrors('Please select the Applicant Entity Type.');
          return false;
        }
        if (
          ['Government Body', 'Private Entity'].includes(formData.applicantType) &&
          !formData.govtOrPrivateSubtype
        ) {
          setStepErrors('Please specify the entity classification detail.');
          return false;
        }
        return true;

      default:
        return true;
    }
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setStepErrors('');
      if (currentStep < totalSteps) {
        setCurrentStep((prev) => prev + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        onSubmit(formData);
      }
    }
  };

  const handlePrevious = () => {
    setStepErrors('');
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const stepTitles = [
    t('step1Title'),
    t('step2Title'),
    t('step3Title'),
    t('step4Title'),
    t('step5Title'),
    t('step6Title'),
    t('step7Title')
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      {/* Top Breadcrumb & Step Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
              {t('stepProgress')
                .replace('{current}', currentStep.toString())
                .replace('{total}', totalSteps.toString())}
            </span>
            <span aria-hidden="true" className="text-slate-400">·</span>
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {stepTitles[currentStep - 1]}
            </span>
          </div>

          <button
            onClick={onCancel}
            className="text-xs text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 cursor-pointer flex items-center gap-1"
          >
            <RotateCcw className="h-3 w-3" />
            <span>Cancel</span>
          </button>
        </div>

        {/* Progress bar */}
        <div className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-amber-500 to-indigo-600 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>

        {/* Step Indicator Pills (Clickable if completed) */}
        <div className="hidden sm:grid grid-cols-7 gap-1.5 mt-3">
          {stepTitles.map((title, idx) => {
            const stepNum = idx + 1;
            const isCompleted = stepNum < currentStep;
            const isCurrent = stepNum === currentStep;
            return (
              <button
                key={stepNum}
                onClick={() => {
                  if (stepNum <= currentStep) {
                    setCurrentStep(stepNum);
                  }
                }}
                disabled={stepNum > currentStep}
                className={`py-1.5 px-2 rounded-lg text-[11px] font-medium text-center truncate transition-colors ${
                  isCurrent
                    ? 'bg-indigo-900 text-white font-bold'
                    : isCompleted
                    ? 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 cursor-pointer'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
                }`}
                title={title}
              >
                <span>{stepNum}. {title.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Wizard Form Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-10 shadow-lg">
        {/* Step Header */}
        <div className="mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            {stepTitles[currentStep - 1]}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Please fill in the official details below to accurately compute scheme eligibility.
          </p>
        </div>

        {/* Inline Error Message */}
        {stepErrors && (
          <div className="mb-6 p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{stepErrors}</span>
          </div>
        )}

        {/* STEP 1: Personal Details */}
        {currentStep === 1 && (
          <div className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                {t('fullName')} <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => updateField('fullName', e.target.value)}
                  placeholder="Full name as printed on Aadhaar card"
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all"
                />
                {formData.fullName.trim().length >= 2 && (
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 absolute right-3 top-3 pointer-events-none" />
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  {t('fieldDob')}
                </label>
                <input
                  type="date"
                  value={formData.dob}
                  onChange={(e) => updateField('dob', e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  {t('fieldGender')} <span className="text-rose-500">*</span>
                </label>
                <select
                  value={formData.gender}
                  onChange={(e) => updateField('gender', e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female (Special Stand-Up / NSFDC benefits)</option>
                  <option value="Transgender">Transgender</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                {t('fieldMobile')}
              </label>
              <input
                type="tel"
                value={formData.mobile}
                onChange={(e) => updateField('mobile', e.target.value)}
                placeholder="10-digit mobile number linked to Aadhaar"
                maxLength={10}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  {t('fieldState')} <span className="text-rose-500">*</span>
                </label>
                <select
                  value={formData.state}
                  onChange={(e) => updateField('state', e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
                >
                  <option value="">Select State / UT</option>
                  {statesList.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  {t('fieldDistrict')}
                </label>
                <select
                  value={formData.district}
                  onChange={(e) => updateField('district', e.target.value)}
                  disabled={!formData.state}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 disabled:opacity-50"
                >
                  <option value="">
                    {formData.state ? 'Select District' : 'Select State First'}
                  </option>
                  {districtsForState.map((dst) => (
                    <option key={dst} value={dst}>
                      {dst}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                {t('fieldAddressType')}
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => updateField('addressType', 'Rural')}
                  className={`py-2.5 px-4 text-xs font-semibold rounded-xl border text-center transition-all cursor-pointer ${
                    formData.addressType === 'Rural'
                      ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-800 dark:text-emerald-300 shadow-xs'
                      : 'border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  Rural Area (Highest 35% PMEGP Subsidy)
                </button>
                <button
                  type="button"
                  onClick={() => updateField('addressType', 'Urban')}
                  className={`py-2.5 px-4 text-xs font-semibold rounded-xl border text-center transition-all cursor-pointer ${
                    formData.addressType === 'Urban'
                      ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-800 dark:text-emerald-300 shadow-xs'
                      : 'border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  Urban Area (Up to 25% Subsidy)
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Category & Social Identity */}
        {currentStep === 2 && (
          <div className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                {t('fieldSocialCategory')} <span className="text-rose-500">*</span>
              </label>
              <select
                value={formData.socialCategory}
                onChange={(e) => updateField('socialCategory', e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
              >
                <option value="">Select Social Category</option>
                <option value="General">General / Open Category</option>
                <option value="OBC">Other Backward Class (OBC)</option>
                <option value="SC">Scheduled Caste (SC) — Unlocks NSSH, NSFDC, CEGSSC, VCF-SC, Stand-Up</option>
                <option value="ST">Scheduled Tribe (ST) — Unlocks NSSH, Stand-Up India, PMEGP Special</option>
                <option value="EBC">Economically Backward Class (EBC)</option>
                <option value="DNT">De-notified, Nomadic and Semi-Nomadic Tribes (DNT)</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  {t('fieldCasteCert')}
                </label>
                <div className="flex gap-2">
                  {['Yes', 'No'].map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => updateField('casteCertAvailable', val)}
                      className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold border cursor-pointer transition-colors ${
                        formData.casteCertAvailable === val
                          ? 'bg-indigo-900 text-white border-indigo-900'
                          : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700'
                      }`}
                    >
                      {val}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  {t('fieldPwD')}
                </label>
                <div className="flex gap-2">
                  {['Yes', 'No'].map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => updateField('isPwD', val)}
                      className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold border cursor-pointer transition-colors ${
                        formData.isPwD === val
                          ? 'bg-indigo-900 text-white border-indigo-900'
                          : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700'
                      }`}
                    >
                      {val}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  {t('fieldExServiceman')}
                </label>
                <div className="flex gap-2">
                  {['Yes', 'No'].map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => updateField('isExServiceman', val)}
                      className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold border cursor-pointer transition-colors ${
                        formData.isExServiceman === val
                          ? 'bg-indigo-900 text-white border-indigo-900'
                          : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700'
                      }`}
                    >
                      {val}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  {t('fieldMinority')}
                </label>
                <div className="flex gap-2">
                  {['Yes', 'No'].map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => updateField('isMinority', val)}
                      className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold border cursor-pointer transition-colors ${
                        formData.isMinority === val
                          ? 'bg-indigo-900 text-white border-indigo-900'
                          : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700'
                      }`}
                    >
                      {val}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Economic Status */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                {t('fieldAnnualIncome')} <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-2.5 text-sm font-bold text-slate-400">
                  ₹
                </span>
                <input
                  type="number"
                  value={formData.annualIncome}
                  onChange={(e) => updateField('annualIncome', e.target.value)}
                  placeholder="e.g. 250000"
                  className="w-full pl-8 pr-4 py-2.5 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
                />
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1.5">
                Note: Schemes like NSFDC require annual family income ≤ ₹3,00,000 to qualify for concessional 4% interest rates.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                {t('fieldBplCard')}
              </label>
              <div className="flex gap-3">
                {['Yes', 'No'].map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => updateField('isBplCardHolder', val)}
                    className={`flex-1 py-2 px-4 rounded-xl text-xs font-semibold border cursor-pointer transition-colors ${
                      formData.isBplCardHolder === val
                        ? 'bg-indigo-900 text-white border-indigo-900 shadow-xs'
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700'
                    }`}
                  >
                    {val === 'Yes' ? 'Yes, BPL Card Holder' : 'No BPL Card'}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: Education */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                {t('fieldEducation')} <span className="text-rose-500">*</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { id: 'Below 8th', desc: 'No formal schooling or below 8th standard' },
                  { id: '8th Pass', desc: 'Mandatory minimum for PMEGP manufacturing above ₹10L' },
                  { id: '10th–12th', desc: 'Secondary / Higher Secondary certificate' },
                  { id: 'Graduate+', desc: 'Degree, Diploma, Post-Graduate, or higher' }
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => updateField('highestQualification', item.id)}
                    className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                      formData.highestQualification === item.id
                        ? 'bg-indigo-50 dark:bg-indigo-950/70 border-indigo-600 text-indigo-950 dark:text-white shadow-xs'
                        : 'bg-white dark:bg-slate-800/60 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    <p className="font-bold text-sm">{item.id}</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                      {item.desc}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP 5: Purpose & Business Details */}
        {currentStep === 5 && (
          <div className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                {t('fieldPurpose')} <span className="text-rose-500">*</span>
              </label>
              <select
                value={formData.purpose}
                onChange={(e) => updateField('purpose', e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
              >
                <option value="">Select Purpose</option>
                <option value="Start a New Business">Start a New Business (Greenfield / PMEGP / Stand-Up)</option>
                <option value="Expand an Existing Business">Expand an Existing Business (CGTMSE / CEGSSC / VCF-SC)</option>
                <option value="Get Skill Training">Get Skill Training (PM-DAKSH / PM Vishwakarma)</option>
                <option value="Get a Loan Guarantee for an Existing Loan">Get a Loan Guarantee for an Existing Loan (CGTMSE / CEGSSC)</option>
                <option value="Set Up a Training or Incubation Center">Set Up a Training or Incubation Center (ASPIRE)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                {t('fieldSector')} <span className="text-rose-500">*</span>
              </label>
              <select
                value={formData.sector}
                onChange={(e) => updateField('sector', e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
              >
                <option value="">Select Sector</option>
                <option value="Manufacturing">Manufacturing (PMEGP max ₹50L)</option>
                <option value="Service">Service (PMEGP max ₹20L)</option>
                <option value="Trading">Trading</option>
                <option value="Agro">Agro / Food Processing (ASPIRE / PMEGP)</option>
                <option value="Rural">Rural Artisan / Village Industry</option>
                <option value="Traditional Craft/Trade">Traditional Craft / Trade (PM Vishwakarma Scheme)</option>
              </select>
            </div>

            {/* CONDITIONAL: If Traditional Craft selected → show 18 PM Vishwakarma trades */}
            {formData.sector === 'Traditional Craft/Trade' && (
              <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 animate-fadeIn">
                <label className="block text-xs font-bold text-amber-900 dark:text-amber-200 mb-1.5 flex items-center gap-1.5">
                  <Sparkles className="h-4 w-4 text-amber-600" />
                  <span>{t('fieldVishwakarmaTrade')} <span className="text-rose-500">*</span></span>
                </label>
                <select
                  value={formData.vishwakarmaTrade}
                  onChange={(e) => updateField('vishwakarmaTrade', e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-amber-300 dark:border-amber-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600"
                >
                  <option value="">Select your craft from the 18 eligible trades</option>
                  {PM_VISHWAKARMA_18_TRADES.map((trade) => (
                    <option key={trade} value={trade}>
                      {trade}
                    </option>
                  ))}
                </select>
                <p className="text-[11px] text-amber-800 dark:text-amber-300 mt-2">
                  Enrolls you for PM Vishwakarma ₹3 Lakh loan at 5% interest and ₹15,000 toolkit grant voucher.
                </p>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  {t('fieldBusinessStatus')}
                </label>
                <select
                  value={formData.businessStatus}
                  onChange={(e) => updateField('businessStatus', e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
                >
                  <option value="">Select Status</option>
                  <option value="Not Started">Not Started (New Greenfield Project)</option>
                  <option value="Running Under 1 Year">Running Under 1 Year</option>
                  <option value="Running Over 1 Year">Running Over 1 Year (Existing Unit)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  {t('fieldProjectCost')}
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-2.5 text-sm font-bold text-slate-400">
                    ₹
                  </span>
                  <input
                    type="number"
                    value={formData.projectCost}
                    onChange={(e) => updateField('projectCost', e.target.value)}
                    placeholder="e.g. 1500000"
                    className="w-full pl-8 pr-4 py-2.5 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                {t('fieldOwnership')}
              </label>
              <select
                value={formData.ownershipStructure}
                onChange={(e) => updateField('ownershipStructure', e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
              >
                <option value="">Select Ownership Structure</option>
                <option value="Individual">Individual / Sole Proprietorship</option>
                <option value="Partnership">Partnership Firm</option>
                <option value="Private Limited">Private Limited Company</option>
                <option value="SHG">Self Help Group (SHG)</option>
                <option value="Trust">Trust</option>
                <option value="Society">Cooperative Society</option>
              </select>
            </div>

            {/* CONDITIONAL: If not Individual → Percentage Ownership Held by Applicant's Category (SC/ST/Woman) */}
            {formData.ownershipStructure && formData.ownershipStructure !== 'Individual' && (
              <div className="p-4 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 animate-fadeIn">
                <label className="block text-xs font-semibold text-indigo-900 dark:text-indigo-200 mb-1.5">
                  {t('fieldOwnershipPercent')} <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={formData.categoryOwnershipPercent}
                    onChange={(e) => updateField('categoryOwnershipPercent', e.target.value)}
                    placeholder="e.g. 51"
                    className="w-full pr-8 pl-3.5 py-2.5 text-sm rounded-xl border border-indigo-300 dark:border-indigo-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
                  />
                  <span className="absolute right-3.5 top-2.5 text-sm font-bold text-slate-400">
                    %
                  </span>
                </div>
                <p className="text-[11px] text-indigo-800 dark:text-indigo-300 mt-1.5">
                  Schemes like Stand-Up India and NSSH mandate at least 51% shareholding held by SC, ST, or Woman promoters.
                </p>
              </div>
            )}
          </div>
        )}

        {/* STEP 6: Prior Government Assistance */}
        {currentStep === 6 && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                {t('fieldGovtLoanPast5')}
              </label>
              <div className="flex gap-3">
                {['Yes', 'No'].map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => updateField('availedGovtLoanLast5Years', val)}
                    className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold border cursor-pointer transition-colors ${
                      formData.availedGovtLoanLast5Years === val
                        ? 'bg-indigo-900 text-white border-indigo-900'
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700'
                    }`}
                  >
                    {val}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                {t('fieldSubsidyReceived')}
              </label>
              <div className="flex gap-3">
                {['Yes', 'No'].map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => updateField('alreadyReceivedSubsidy', val)}
                    className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold border cursor-pointer transition-colors ${
                      formData.alreadyReceivedSubsidy === val
                        ? 'bg-indigo-900 text-white border-indigo-900'
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700'
                    }`}
                  >
                    {val}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                {t('fieldLoanDefault')} <span className="text-rose-500">*</span>
              </label>
              <div className="flex gap-3">
                {['No', 'Yes'].map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => updateField('loanDefault', val)}
                    className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold border cursor-pointer transition-colors ${
                      formData.loanDefault === val
                        ? val === 'No'
                          ? 'bg-emerald-700 text-white border-emerald-700'
                          : 'bg-rose-700 text-white border-rose-700'
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700'
                    }`}
                  >
                    {val === 'No' ? 'No Defaults (Clean Track Record)' : 'Yes, Prior Loan Default'}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                {t('fieldExistingBankLoan')}
              </label>
              <div className="flex gap-3">
                {['Yes', 'No'].map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => updateField('haveBankLoanToGuarantee', val)}
                    className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold border cursor-pointer transition-colors ${
                      formData.haveBankLoanToGuarantee === val
                        ? 'bg-indigo-900 text-white border-indigo-900'
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700'
                    }`}
                  >
                    {val}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP 7: Applicant Type */}
        {currentStep === 7 && (
          <div className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                {t('fieldApplicantType')} <span className="text-rose-500">*</span>
              </label>
              <select
                value={formData.applicantType}
                onChange={(e) => updateField('applicantType', e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
              >
                <option value="">Select Applicant Type</option>
                <option value="Individual">Individual Citizen / Entrepreneur</option>
                <option value="University">University / Academic & R&D Institute</option>
                <option value="NGO">Non-Governmental Organization (NGO)</option>
                <option value="Industry Association">Industry Association / MSME Cluster</option>
                <option value="Government Body">Government Body / State Undertaking</option>
                <option value="Private Entity">Private Entity / Commercial Company</option>
              </select>
            </div>

            {/* CONDITIONAL: If Government or Private Entity selected → additional select field */}
            {['Government Body', 'Private Entity'].includes(formData.applicantType) && (
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 animate-fadeIn">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  {t('fieldEntitySubtype')} <span className="text-rose-500">*</span>
                </label>
                <select
                  value={formData.govtOrPrivateSubtype}
                  onChange={(e) => updateField('govtOrPrivateSubtype', e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
                >
                  <option value="">Select Sub-Classification</option>
                  {formData.applicantType === 'Government Body' ? (
                    <>
                      <option value="Central Ministry Dept">Central Ministry Department</option>
                      <option value="State Govt Undertaking">State Government Public Sector Undertaking</option>
                      <option value="District Industries Center (DIC)">District Industries Center (DIC)</option>
                      <option value="KVIC / KVIB Unit">Khadi and Village Industries Commission / Board</option>
                    </>
                  ) : (
                    <>
                      <option value="Registered MSE (Micro/Small)">Registered MSE (Udyam Certified)</option>
                      <option value="Private Limited Startup">Private Limited Startup / Innovation Co.</option>
                      <option value="Section 8 Non-Profit Incubator">Section 8 Non-Profit Incubator</option>
                      <option value="Producer Company">Farmer / Artisan Producer Company (FPO/CPO)</option>
                    </>
                  )}
                </select>
              </div>
            )}

            {/* Confirmation banner */}
            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex items-start gap-3">
              <ShieldCheck className="h-5 w-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-emerald-900 dark:text-emerald-200">
                  Ready to calculate your scheme eligibility
                </p>
                <p className="text-[11px] text-emerald-800 dark:text-emerald-300 mt-0.5">
                  Clicking "Calculate Eligible Schemes" evaluates your criteria against all 10 national programs, verifying subsidies, credit guarantees, and document prerequisites.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Wizard Controls */}
        <div className="flex items-center justify-between pt-6 mt-6 border-t border-slate-100 dark:border-slate-800">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={handlePrevious}
              className="py-2.5 px-4 text-xs font-semibold rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>{t('previousStep')}</span>
            </button>
          ) : (
            <div />
          )}

          <button
            type="button"
            onClick={handleNext}
            className="py-2.5 px-6 text-xs font-bold rounded-xl bg-indigo-900 hover:bg-indigo-800 text-white transition-colors cursor-pointer shadow-md flex items-center gap-2"
          >
            <span>
              {currentStep === totalSteps ? t('submitEvaluation') : t('nextStep')}
            </span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
