import React from 'react';
import {
  CheckCircle2,
  ExternalLink,
  Sparkles,
  Printer,
  RotateCcw,
  FileText,
  AlertCircle,
  HelpCircle,
  Building,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { EligibilityFormData, Scheme, SchemeEvaluationResult } from '../types';

interface ResultsViewProps {
  results: SchemeEvaluationResult[];
  formData: EligibilityFormData;
  onModifyCriteria: () => void;
  onAskAssistantAboutScheme: (scheme: Scheme) => void;
  t: (key: string) => string;
}

export const ResultsView: React.FC<ResultsViewProps> = ({
  results,
  formData,
  onModifyCriteria,
  onAskAssistantAboutScheme,
  t
}) => {
  const eligibleSchemes = results.filter((r) => r.isEligible);
  const nonEligibleSchemes = results.filter((r) => !r.isEligible);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-semibold mb-2">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Assessment Completed · Official Government Standards</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {t('resultsTitle')}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
              {t('resultsSubtitle')}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handlePrint}
              className="py-2 px-3.5 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs"
            >
              <Printer className="h-4 w-4" />
              <span>{t('printSummary')}</span>
            </button>
            <button
              onClick={onModifyCriteria}
              className="py-2 px-3.5 text-xs font-semibold rounded-xl bg-indigo-900 hover:bg-indigo-800 text-white transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs"
            >
              <RotateCcw className="h-4 w-4" />
              <span>{t('recheckForm')}</span>
            </button>
          </div>
        </div>

        {/* Snapshot Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6">
          <div className="p-3.5 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900">
            <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-300 uppercase tracking-wide">
              Eligible Schemes
            </span>
            <p className="text-2xl font-black text-emerald-800 dark:text-emerald-200 tabular-nums mt-0.5">
              {eligibleSchemes.length} of 10
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900">
            <span className="text-[11px] font-semibold text-indigo-700 dark:text-indigo-300 uppercase tracking-wide">
              Applicant Category
            </span>
            <p className="text-lg font-bold text-indigo-900 dark:text-indigo-200 truncate mt-0.5">
              {formData.socialCategory || 'General'} · {formData.gender || 'Citizen'}
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900">
            <span className="text-[11px] font-semibold text-amber-700 dark:text-amber-300 uppercase tracking-wide">
              Sector / Trade
            </span>
            <p className="text-lg font-bold text-amber-900 dark:text-amber-200 truncate mt-0.5">
              {formData.sector || 'Micro-Enterprise'}
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide">
              Location Benefit
            </span>
            <p className="text-lg font-bold text-slate-800 dark:text-slate-200 truncate mt-0.5">
              {formData.addressType || 'Urban/Rural'} ({formData.state ? formData.state.split(' ')[0] : 'India'})
            </p>
          </div>
        </div>
      </div>

      {/* Eligible Schemes Section */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
          <span>{t('matchingSchemes')}</span>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
            {eligibleSchemes.length} Schemes Available
          </span>
        </h2>

        {eligibleSchemes.length === 0 ? (
          <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
            <AlertCircle className="h-10 w-10 text-amber-500 mx-auto mb-3" />
            <p className="text-sm font-semibold text-slate-900 dark:text-white">
              {t('noSchemesMatched')}
            </p>
            <button
              onClick={onModifyCriteria}
              className="mt-4 py-2 px-4 rounded-xl bg-indigo-900 text-white text-xs font-semibold hover:bg-indigo-800 transition-colors cursor-pointer"
            >
              Adjust Form Inputs
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {eligibleSchemes.map(({ scheme, reasons, benefitHighlight }) => (
              <div
                key={scheme.id}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-7 shadow-xs hover:shadow-md transition-all"
              >
                {/* Scheme Title Row */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/70 border border-indigo-200 dark:border-indigo-800 text-indigo-900 dark:text-indigo-300">
                        {scheme.topicTag}
                      </span>
                      <span className="text-xs font-mono font-bold text-slate-500">
                        {scheme.acronym}
                      </span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-snug">
                      {scheme.name}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                      {scheme.ministry}
                    </p>
                  </div>

                  <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 shrink-0 text-right sm:text-right">
                    <span className="text-[10px] font-semibold text-emerald-800 dark:text-emerald-300 block">
                      Benefit Highlight
                    </span>
                    <span className="text-xs sm:text-sm font-extrabold text-emerald-900 dark:text-emerald-200">
                      {benefitHighlight}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-5">
                  {scheme.shortDescription}
                </p>

                {/* 1. Why They Qualify */}
                <div className="mb-5 p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/60">
                  <h4 className="text-xs font-bold text-indigo-950 dark:text-indigo-200 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    <span>{t('whyYouQualify')}</span>
                  </h4>
                  <ul className="space-y-1.5">
                    {reasons.map((reason, idx) => (
                      <li
                        key={idx}
                        className="text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 dark:bg-indigo-400 shrink-0 mt-1.5" />
                        <span>{reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 2. Required Documents */}
                <div className="mb-6">
                  <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                    <FileText className="h-4 w-4 text-amber-500" />
                    <span>{t('requiredDocs')}</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {scheme.requiredDocuments.map((doc, idx) => (
                      <div
                        key={idx}
                        className="text-xs text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 rounded-xl p-2.5 flex items-start gap-2"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-1.5" />
                        <span>{doc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3. Link to the Official Scheme Page & Assistant Button */}
                <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <a
                    href={scheme.officialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-indigo-900 hover:bg-indigo-800 text-white text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-xs"
                  >
                    <span>{t('officialPortal')}</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>

                  <button
                    onClick={() => onAskAssistantAboutScheme(scheme)}
                    className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                  >
                    <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                    <span>Ask Yojana Mitra Assistant</span>
                  </button>

                  <span className="text-[11px] text-slate-400 sm:ml-auto hidden sm:inline">
                    Authentic Gov Service Link
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Non-Eligible / Alternative Schemes review dropdown */}
      {nonEligibleSchemes.length > 0 && (
        <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
          <details className="group rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5">
            <summary className="font-semibold text-xs text-slate-600 dark:text-slate-400 cursor-pointer list-none flex items-center justify-between">
              <span>View other programs not currently matched ({nonEligibleSchemes.length})</span>
              <ChevronRight className="h-4 w-4 transition-transform group-open:rotate-90 text-slate-400" />
            </summary>
            <div className="mt-4 space-y-3 pt-3 border-t border-slate-100 dark:border-slate-800">
              {nonEligibleSchemes.map(({ scheme, disqualificationReasons }) => (
                <div
                  key={scheme.id}
                  className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 text-xs"
                >
                  <p className="font-bold text-slate-800 dark:text-slate-200">{scheme.name}</p>
                  <p className="text-slate-500 dark:text-slate-400 mt-0.5">{scheme.shortDescription}</p>
                  {disqualificationReasons && disqualificationReasons.length > 0 && (
                    <div className="mt-2 text-rose-600 dark:text-rose-400 text-[11px] flex items-start gap-1">
                      <AlertCircle className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                      <span>{disqualificationReasons[0]}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </details>
        </div>
      )}
    </div>
  );
};
