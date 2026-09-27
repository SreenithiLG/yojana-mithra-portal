import React, { useState, useRef, useEffect } from 'react';
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Bot,
  User as UserIcon,
  ChevronDown,
  Minimize2,
  Maximize2,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';
import { ALL_SCHEMES } from '../data/schemes';
import { ChatMessage, Scheme } from '../types';

interface ChatbotAssistantProps {
  onOpenWizard: () => void;
  selectedSchemeForChat?: Scheme | null;
  t: (key: string) => string;
}

export const ChatbotAssistant: React.FC<ChatbotAssistantProps> = ({
  onOpenWizard,
  selectedSchemeForChat,
  t
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: t('chatWelcomeMessage'),
      timestamp: 'Just now'
    }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen && !isMinimized) {
      scrollToBottom();
    }
  }, [messages, isOpen, isMinimized]);

  // If a scheme was selected externally for the assistant, auto-open and inject inquiry
  useEffect(() => {
    if (selectedSchemeForChat) {
      setIsOpen(true);
      setIsMinimized(false);
      const schemeText = `Tell me more about ${selectedSchemeForChat.name} (${selectedSchemeForChat.acronym}) and what I need to apply.`;
      handleSendMessage(schemeText);
    }
  }, [selectedSchemeForChat]);

  const generateSchemeResponse = (userText: string): string => {
    const q = userText.toLowerCase();

    if (q.includes('pmegp') || (q.includes('subsidy') && (q.includes('35%') || q.includes('manufacturing')))) {
      return `Under the Prime Minister's Employment Generation Programme (PMEGP):\n\n• Manufacturing units get financial assistance up to ₹50 Lakhs, and Service units up to ₹20 Lakhs.\n• Special categories (SC, ST, OBC, Women, PwD, Ex-Servicemen) receive a 35% margin money subsidy in rural areas (25% in urban areas).\n• General category applicants receive 25% subsidy in rural areas and 15% in urban areas.\n• Bank loan sanctions 90%–95% of total project cost with only 5%–10% beneficiary contribution. Minimum 8th standard pass is required for projects over ₹10 Lakhs in manufacturing.`;
    }

    if (q.includes('vishwakarma') || q.includes('toolkit') || q.includes('artisan') || q.includes('craft')) {
      return `PM Vishwakarma provides complete end-to-end support for traditional artisans and craftspersons across 18 designated manual trades (Carpenters, Blacksmiths, Potters, Masons, Barbers, Tailors, etc.):\n\n1. Collateral-free enterprise credit: ₹1,00,000 (1st tranche) followed by ₹2,00,000 (2nd tranche) at an ultra-low 5% interest rate (with 8% interest subvention paid by the Govt).\n2. Modern Tool Kit Grant: A digital voucher worth ₹15,000 to purchase quality modern equipment.\n3. Skill Training: 5–7 days basic training with a stipend of ₹500/day, plus a PM Vishwakarma digital ID card and certificate.`;
    }

    if (q.includes('stand-up') || q.includes('stand up') || (q.includes('women') && q.includes('loan'))) {
      return `Stand-Up India is designed specifically for Women and SC/ST entrepreneurs setting up a greenfield (first-time) enterprise in manufacturing, services, agri-allied, or trading.\n\n• Bank loan sizes range from ₹10 Lakhs up to ₹1 Crore.\n• Handholding support is provided through SIDBI Connect Centers and Lead District Managers.\n• In non-individual enterprises, at least 51% shareholding and controlling stake must be held by an SC/ST or Woman promoter.`;
    }

    if (q.includes('cgtmse') || q.includes('collateral') || q.includes('without collateral')) {
      return `The Credit Guarantee Scheme for Micro and Small Enterprises (CGTMSE) provides collateral-free loan guarantees up to ₹500 Lakhs (₹5 Crores) sanctioned by Member Lending Institutions (commercial banks, RRBs, SIDBI):\n\n• No third-party physical asset or collateral is pledged.\n• Guarantee cover is 75% to 85% of the sanctioned credit facility.\n• Enhanced 85% guarantee coverage applies for Women, SC/ST, and PwD promoters, as well as micro enterprises for loans up to ₹5 Lakhs.`;
    }

    if (q.includes('sc') || q.includes('scheduled caste') || q.includes('nssh') || q.includes('nsfdc') || q.includes('cegssc') || q.includes('vcf')) {
      return `For Scheduled Caste (SC) entrepreneurs and citizens, the Government offers several targeted programs:\n\n1. NSSH (National SC/ST Hub): 80% subsidy on exhibition fees, free Single Point Registration, and vendor matchmaking for 4% CPSE procurement.\n2. NSFDC: Concessional term loans up to ₹50 Lakhs (4%–8% p.a.) and Mahila Samriddhi micro-credit for women at 4%.\n3. CEGSSC: 100% guarantee cover on bank loans between ₹15 Lakhs and ₹5 Crores.\n4. VCF-SC: Risk equity / venture capital funding from ₹20 Lakhs to ₹15 Crores for high-growth SC companies.`;
    }

    if (q.includes('daksh') || q.includes('training') || q.includes('stipend') || q.includes('skill')) {
      return `PM-DAKSH (PM Dakshta aur Kushalta Sampann Hitgrahi) Yojana offers 100% free government-sponsored skill training for youths belonging to SC, OBC, EBC, DNT, and Safai Karamchari categories:\n\n• Offers Upskilling/Reskilling, Short-Term, Long-Term, and Entrepreneurship courses.\n• Trainees receive a monthly stipend of ₹1,000 to ₹1,500 during full-time training.\n• Wage compensation of ₹2,500 is provided for candidates taking upskilling programs, along with industry placement linkages.`;
    }

    if (q.includes('aspire') || q.includes('incubation') || q.includes('rural') || q.includes('agro')) {
      return `ASPIRE (A Scheme for Promotion of Innovation, Rural Industries and Entrepreneurship) sets up Livelihood Business Incubators (LBIs) and Technology Business Incubators (TBIs):\n\n• 100% grant of plant & machinery cost up to ₹100 Lakhs (₹1 Crore) for Government agencies.\n• Up to 75% grant (max ₹75 Lakhs) for Private institutions, Universities, and NGOs.\n• Accelerates rural entrepreneurship, agro-processing, and employment generation.`;
    }

    if (q.includes('document') || q.includes('apply') || q.includes('how to')) {
      return `To apply for most Central Government schemes through the single window, you typically need:\n\n1. Aadhaar Card (linked to an active mobile number)\n2. PAN Card of individual/enterprise\n3. Caste/Category Certificate (issued by competent revenue officer, if claiming SC/ST/OBC/EBC benefits)\n4. Detailed Project Report (DPR) with estimated capital expenditure & working capital\n5. Bank Account passbook or cancelled cheque with IFSC\n6. Udyam Registration (for existing MSMEs)\n\nYou can click 'Find My Scheme' in the top navbar to calculate exactly which of the 10 schemes you qualify for!`;
    }

    // Default conversational response
    return `Thank you for your question. Yojana Mithra evaluates your profile across all 10 flagship Central Government programs (PMEGP, PM Vishwakarma, Stand-Up India, CGTMSE, NSSH, NSFDC, CEGSSC, VCF-SC, PM-DAKSH, and ASPIRE).\n\nWould you like me to guide you through checking your scheme eligibility or provide specific requirements for a particular sector?`;
  };

  const handleSendMessage = (textToSend?: string) => {
    const messageText = textToSend || inputValue;
    if (!messageText.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: messageText,
      timestamp: 'Just now'
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputValue('');

    // Simulate conversational response
    setTimeout(() => {
      const responseText = generateSchemeResponse(messageText);
      const assistantMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: responseText,
        timestamp: 'Just now'
      };
      setMessages((prev) => [...prev, assistantMsg]);
    }, 450);
  };

  return (
    <>
      {/* Floating Action Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-indigo-900 to-slate-900 text-white border border-amber-500/40 shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all cursor-pointer group"
          aria-label="Open Yojana Mithra Assistant"
        >
          <div className="relative">
            <Bot className="h-5 w-5 text-amber-400 group-hover:rotate-12 transition-transform" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-slate-900 animate-pulse" />
          </div>
          <span className="text-xs font-bold tracking-wide">
            {t('chatTitle')}
          </span>
        </button>
      )}

      {/* Floating Chat Interface (ChatGPT / Claude style) */}
      {isOpen && (
        <div
          className={`fixed bottom-6 right-4 sm:right-6 z-50 w-[calc(100vw-32px)] sm:w-[420px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden transition-all duration-300 flex flex-col ${
            isMinimized ? 'h-16' : 'h-[580px] max-h-[82vh]'
          }`}
        >
          {/* Header */}
          <div className="bg-slate-900 text-white px-5 py-3.5 flex items-center justify-between border-b border-slate-800 select-none">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center">
                <Bot className="h-4 w-4 text-amber-400" />
              </div>
              <div>
                <p className="text-xs font-bold text-white flex items-center gap-1.5">
                  <span>{t('chatTitle')}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                </p>
                <p className="text-[10px] text-slate-400">
                  {t('chatSubtitle')}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 text-slate-400">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-1 hover:text-white rounded-md cursor-pointer"
                title={isMinimized ? 'Expand' : 'Minimize'}
              >
                {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:text-white rounded-md cursor-pointer"
                title="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Messages Body */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-50/50 dark:bg-slate-950/40">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex items-start gap-2.5 ${
                      msg.sender === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    {msg.sender === 'assistant' && (
                      <div className="w-7 h-7 rounded-full bg-indigo-900 text-amber-400 flex items-center justify-center shrink-0 text-xs border border-amber-500/30">
                        <Bot className="h-3.5 w-3.5" />
                      </div>
                    )}

                    <div
                      className={`max-w-[82%] rounded-2xl px-4 py-2.5 text-xs leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-indigo-900 text-white font-medium rounded-br-xs'
                          : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700/80 shadow-xs rounded-bl-xs whitespace-pre-line'
                      }`}
                    >
                      {msg.text}
                    </div>

                    {msg.sender === 'user' && (
                      <div className="w-7 h-7 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 flex items-center justify-center shrink-0 text-xs">
                        <UserIcon className="h-3.5 w-3.5" />
                      </div>
                    )}
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Prompt Suggestions */}
              <div className="px-4 py-2 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex gap-1.5 overflow-x-auto text-[11px] no-scrollbar">
                {[
                  t('chatSuggestedPrompt1'),
                  t('chatSuggestedPrompt2'),
                  t('chatSuggestedPrompt3')
                ].map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(prompt)}
                    className="shrink-0 py-1 px-2.5 rounded-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:border-amber-500 hover:text-amber-700 dark:hover:text-amber-300 transition-colors text-left cursor-pointer truncate max-w-[200px]"
                  >
                    {prompt}
                  </button>
                ))}
              </div>

              {/* Input Footer */}
              <div className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="flex items-center gap-2"
                >
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder={t('chatPlaceholder')}
                    className="flex-1 px-3.5 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all"
                  />
                  <button
                    type="submit"
                    disabled={!inputValue.trim()}
                    className="p-2.5 rounded-xl bg-indigo-900 hover:bg-indigo-800 disabled:opacity-40 text-white transition-colors cursor-pointer"
                    aria-label="Send message"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </form>

                <div className="mt-2 flex items-center justify-between text-[10px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="h-3 w-3 text-emerald-500" />
                    <span>Official Scheme Knowledge Base</span>
                  </span>
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      onOpenWizard();
                    }}
                    className="text-amber-600 dark:text-amber-400 font-semibold hover:underline cursor-pointer flex items-center gap-0.5"
                  >
                    <span>Check Eligibility</span>
                    <ArrowRight className="h-2.5 w-2.5" />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};
