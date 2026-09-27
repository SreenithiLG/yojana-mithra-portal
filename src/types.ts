export type Language = 'en' | 'hi' | 'ta';

export type PageView = 'home' | 'wizard' | 'results' | 'profile' | 'settings' | 'auth';

export interface UserProfile {
  photoUrl: string;
  fullName: string;
  email: string;
  mobile: string;
  dob: string;
  gender: string;
  state: string;
  district: string;
  category: string;
  annualFamilyIncome: number | string;
  occupation: string;
  educationQualification: string;
  businessDetails: string;
}

export interface EligibilityFormData {
  // Step 1: Personal Details
  fullName: string;
  dob: string;
  gender: 'Male' | 'Female' | 'Transgender' | '';
  mobile: string;
  state: string;
  district: string;
  addressType: 'Rural' | 'Urban' | '';

  // Step 2: Category & Social Identity
  socialCategory: 'General' | 'OBC' | 'SC' | 'ST' | 'EBC' | 'DNT' | '';
  casteCertAvailable: 'Yes' | 'No' | '';
  isPwD: 'Yes' | 'No' | '';
  isExServiceman: 'Yes' | 'No' | '';
  isMinority: 'Yes' | 'No' | '';

  // Step 3: Economic Status
  annualIncome: number | string;
  isBplCardHolder: 'Yes' | 'No' | '';

  // Step 4: Education
  highestQualification: 'Below 8th' | '8th Pass' | '10th–12th' | 'Graduate+' | '';

  // Step 5: Purpose & Business Details
  purpose:
    | 'Start a New Business'
    | 'Expand an Existing Business'
    | 'Get Skill Training'
    | 'Get a Loan Guarantee for an Existing Loan'
    | 'Set Up a Training or Incubation Center'
    | '';
  sector:
    | 'Manufacturing'
    | 'Service'
    | 'Trading'
    | 'Agro'
    | 'Rural'
    | 'Traditional Craft/Trade'
    | '';
  vishwakarmaTrade: string;
  businessStatus: 'Not Started' | 'Running Under 1 Year' | 'Running Over 1 Year' | '';
  projectCost: number | string;
  ownershipStructure:
    | 'Individual'
    | 'Partnership'
    | 'Private Limited'
    | 'SHG'
    | 'Trust'
    | 'Society'
    | '';
  categoryOwnershipPercent: number | string;

  // Step 6: Prior Government Assistance
  availedGovtLoanLast5Years: 'Yes' | 'No' | '';
  alreadyReceivedSubsidy: 'Yes' | 'No' | '';
  loanDefault: 'Yes' | 'No' | '';
  haveBankLoanToGuarantee: 'Yes' | 'No' | '';

  // Step 7: Applicant Type
  applicantType:
    | 'Individual'
    | 'University'
    | 'NGO'
    | 'Industry Association'
    | 'Government Body'
    | 'Private Entity'
    | '';
  govtOrPrivateSubtype: string;
}

export interface Scheme {
  id: string;
  name: string;
  acronym: string;
  topicTag: 'Finance' | 'Healthcare' | 'Employment' | 'Skill Development' | 'Rural Innovation' | 'Credit Guarantee';
  ministry: string;
  shortDescription: string;
  fullDescription: string;
  maxBenefit: string;
  subsidyPercentage?: string;
  officialUrl: string;
  targetAudience: string;
  keyBenefits: string[];
  requiredDocuments: string[];
  tags: string[];
}

export interface SchemeEvaluationResult {
  scheme: Scheme;
  isEligible: boolean;
  matchScore: number; // 0 to 100
  reasons: string[];
  disqualificationReasons?: string[];
  benefitHighlight: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  suggestedAction?: {
    label: string;
    actionType: 'navigate_scheme' | 'open_wizard' | 'open_profile';
    payload?: string;
  };
}
