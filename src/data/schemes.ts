import { Scheme } from '../types';

export const ALL_SCHEMES: Scheme[] = [
  {
    id: 'pmegp',
    name: "Prime Minister's Employment Generation Programme (PMEGP)",
    acronym: 'PMEGP',
    topicTag: 'Employment',
    ministry: 'Ministry of Micro, Small and Medium Enterprises (MSME)',
    shortDescription:
      'Credit-linked subsidy programme to generate self-employment micro-enterprises in manufacturing and services sector.',
    fullDescription:
      "A flagship central sector credit-linked subsidy programme launched to generate continuous, sustainable employment opportunities in rural as well as urban areas through setting up of new self-employment micro-enterprises and projects.",
    maxBenefit: 'Up to ₹50 Lakhs (Mfg) / ₹20 Lakhs (Service)',
    subsidyPercentage: '15% to 35% margin money subsidy',
    officialUrl: 'https://www.kviconline.gov.in/pmegpeportal/',
    targetAudience: 'Individuals aged 18+, SHGs, Co-operative Societies, Charitable Trusts',
    keyBenefits: [
      'Subsidized capital: 25% to 35% subsidy for rural projects, 15% to 25% for urban projects',
      'Special categories (SC/ST/OBC/Women/Ex-Servicemen/PwD) get highest 35% subsidy in rural areas',
      'Beneficiary contribution is only 5% for special categories and 10% for general category',
      'Bank finance: 90% to 95% of project cost sanctioned through nationalized commercial banks'
    ],
    requiredDocuments: [
      'Aadhaar Card and PAN Card',
      'Caste / Special Category Certificate (if applicable)',
      'Detailed Project Report (DPR) with cost breakdown',
      'Highest Educational Qualification Certificate (8th pass minimum for projects > ₹10L in Mfg / ₹5L in Service)',
      'EDP (Entrepreneurship Development Programme) Training Certificate or undertaking',
      'Rural Area Certificate from local authority (for rural subsidy rate)'
    ],
    tags: ['Manufacturing', 'Service', 'Rural', 'Urban', 'Subsidy', 'Self Employment']
  },
  {
    id: 'nssh',
    name: 'National SC/ST Hub (NSSH)',
    acronym: 'NSSH',
    topicTag: 'Skill Development',
    ministry: 'Ministry of MSME',
    shortDescription:
      'Capacity building and market linkage support to achieve 4% procurement mandate from SC/ST enterprises.',
    fullDescription:
      'Initiative set up to provide professional support to Scheduled Caste and Scheduled Tribe entrepreneurs to fulfill the Public Procurement Policy 4% procurement quota from SC/ST MSEs by Central Ministries and CPSEs.',
    maxBenefit: 'Up to ₹1 Crore credit assistance + 80% fee reimbursement',
    subsidyPercentage: 'Up to 80% subsidy on exhibition fees, testing and tender filing',
    officialUrl: 'https://www.scsthub.in/',
    targetAudience: 'SC/ST Micro & Small Enterprises with 51%+ SC/ST ownership',
    keyBenefits: [
      'Special Single Point Registration Scheme (SSPRS) 100% fee subsidy',
      '80% subsidy on stall charges in domestic and international trade fairs and exhibitions',
      'Financial support for credit rating, capacity building and quality certifications',
      'Vendor development programmes with Central Public Sector Enterprises (CPSEs)'
    ],
    requiredDocuments: [
      'Valid Udyam Registration Certificate',
      'Caste Certificate of Proprietor / Partners / Majority Directors (SC/ST)',
      'Shareholding pattern certificate showing minimum 51% SC/ST stake',
      'PAN, GSTIN and Bank Statements of the enterprise',
      'Proof of existing enterprise operations (Audited balance sheet or ITR)'
    ],
    tags: ['SC/ST', 'Capacity Building', 'Public Procurement', 'Enterprise Growth']
  },
  {
    id: 'nsfdc',
    name: 'NSFDC Credit/Financial Assistance Scheme',
    acronym: 'NSFDC',
    topicTag: 'Finance',
    ministry: 'Ministry of Social Justice and Empowerment',
    shortDescription:
      'Term loans and micro-credit financing at low concessional interest rates for Scheduled Castes living below double poverty line.',
    fullDescription:
      'National Scheduled Castes Finance and Development Corporation (NSFDC) provides concessional credit for self-employment ventures, educational loans, and skill upgradation specifically for SC beneficiaries.',
    maxBenefit: 'Term Loans up to ₹50 Lakhs / Micro-credit up to ₹1.5 Lakhs',
    subsidyPercentage: 'Highly concessional interest rate (4% to 8% p.a.)',
    officialUrl: 'https://nsfdc.nic.in/',
    targetAudience: 'Scheduled Caste individuals with annual family income up to ₹3,00,000',
    keyBenefits: [
      'Term Loan up to 90% of unit cost (maximum ₹50 Lakhs for eligible projects)',
      'Mahila Samriddhi Yojana: Micro-credit up to ₹1,40,000 for SC women at 4% interest per annum',
      'Skill development training with complete tuition waiver and monthly stipend',
      'Repayment tenure up to 5 to 10 years with flexible moratorium periods'
    ],
    requiredDocuments: [
      'Scheduled Caste (SC) Certificate from competent revenue authority',
      'Family Income Certificate (< ₹3 Lakh per annum)',
      'Aadhaar and Voter ID Card',
      'Bank Account passbook with IFSC code',
      'Quotation / Project profile for machinery or equipment'
    ],
    tags: ['SC Beneficiaries', 'Concessional Interest', 'Women Entrepreneurs', 'Term Loan']
  },
  {
    id: 'cegssc',
    name: 'Credit Enhancement Guarantee Scheme for Scheduled Castes (CEGSSC)',
    acronym: 'CEGSSC',
    topicTag: 'Credit Guarantee',
    ministry: 'Ministry of Social Justice and Empowerment (implemented by IFCI Ltd)',
    shortDescription:
      'Guarantee cover to Member Lending Institutions (MLIs) encouraging collateral-free loans for SC entrepreneurs.',
    fullDescription:
      'A dedicated guarantee scheme that provides 100% guarantee cover to banks for loans between ₹15 Lakhs and ₹5 Crores sanctioned to SC entrepreneurs who lack adequate secondary collateral.',
    maxBenefit: 'Guarantee cover up to ₹5 Crores',
    subsidyPercentage: 'Up to 100% credit guarantee cover on bank facility',
    officialUrl: 'https://www.cegssc.in/',
    targetAudience: 'SC Enterprises (SC ownership > 51%) seeking term loans or working capital',
    keyBenefits: [
      'Enables banks to sanction loans without insisting on third-party physical collateral',
      'Guarantee coverage: 100% for loans ₹15L to ₹1Cr, 80% for loans ₹1Cr to ₹2Cr, 70% for loans ₹2Cr to ₹5Cr',
      'Tenure of guarantee covers maximum loan duration up to 7 years',
      'Low annual guarantee fee (0.50% - 0.75% per annum)'
    ],
    requiredDocuments: [
      'Registered Company / Partnership / Proprietorship deeds',
      'SC Category certificates of promoters showing > 51% equity holding',
      'Bank Loan sanction letter or formal application',
      'Audited financials / projected cash flows for 3-5 years',
      'KYC documents of promoters (Aadhaar, PAN)'
    ],
    tags: ['Credit Guarantee', 'SC Entrepreneurs', 'No Collateral', 'High Value Loans']
  },
  {
    id: 'vcf-sc',
    name: 'Venture Capital Fund for Scheduled Castes (VCF-SC)',
    acronym: 'VCF-SC',
    topicTag: 'Finance',
    ministry: 'Ministry of Social Justice and Empowerment (managed by IFCI Venture)',
    shortDescription:
      'Alternative equity and quasi-equity investment fund for innovative, growth-stage SC-owned companies.',
    fullDescription:
      'A dedicated venture capital fund that invests risk capital and long-term equity to promote entrepreneurship among Scheduled Castes who run high-growth, innovative, and employment-generating commercial enterprises.',
    maxBenefit: 'Equity / debt financing from ₹20 Lakhs up to ₹15 Crores',
    subsidyPercentage: 'Long-term risk patient capital with concessional returns',
    officialUrl: 'https://www.vcfsc.in/',
    targetAudience: 'Companies with at least 51% SC shareholding and SC management control',
    keyBenefits: [
      'Direct equity participation or compulsorily convertible debentures (CCDs)',
      'Substantial growth capital ranging from ₹20 Lakhs up to ₹15 Crores per company',
      'Tenor of investment up to 8 to 10 years with patient exit strategies',
      'Mentorship, board advisory, and financial governance support from IFCI Venture'
    ],
    requiredDocuments: [
      'Certificate of Incorporation (Pvt Ltd / Public Ltd) & Memorandum of Association (MoA)',
      'Proof of 51%+ SC shareholding held for minimum 12 months',
      'Detailed Techno-Economic Feasibility Report and 5-Year Business Plan',
      '3 Years Audited Financial Statements (for operational entities)',
      'Caste Certificates of promoters authenticated by State District Magistrate'
    ],
    tags: ['Venture Capital', 'SC Startups', 'High Growth', 'Equity Financing']
  },
  {
    id: 'pm-daksh',
    name: 'PM Dakshta aur Kushalta Sampann Hitgrahi (PM-DAKSH) Yojana',
    acronym: 'PM-DAKSH',
    topicTag: 'Skill Development',
    ministry: 'Ministry of Social Justice and Empowerment',
    shortDescription:
      'Free national skill development programmes, upskilling, and stipend support for marginalized youths.',
    fullDescription:
      'National action plan aimed at providing high-standard skill training (Upskilling/Reskilling, Short Term Training, Long Term Training, and Entrepreneurship Development) to empower youths from SC, OBC, EBC, DNT, and Safai Karamchari backgrounds.',
    maxBenefit: '100% Free Training + Monthly Stipend up to ₹1,500 + Certification',
    subsidyPercentage: '100% government sponsored training cost',
    officialUrl: 'https://pmdaksh.dosje.gov.in/',
    targetAudience: 'Youths aged 18-45 years from SC, OBC, EBC, DNT, and Safai Karamchari categories',
    keyBenefits: [
      'Zero cost high-quality certified training in NSQF-aligned job roles',
      'Stipend of ₹1,000 to ₹1,500/month during full-time training courses',
      'Wage loss compensation of ₹2,500 for candidates undergoing upskilling/reskilling',
      'Placement assistance with industry employers and post-training self-employment linkage'
    ],
    requiredDocuments: [
      'Aadhaar Card',
      'Caste Certificate (SC/OBC/EBC/DNT)',
      'Income Certificate (OBC family income < ₹3 Lakh; EBC < ₹1 Lakh; No income limit for SC)',
      'Educational Qualification Marksheet (8th, 10th, 12th, or ITI/Diploma)',
      'Bank Account Details for direct stipend transfer (DBT)'
    ],
    tags: ['Skill Training', 'Stipend', 'Youth', 'OBC/SC/EBC', 'Employment']
  },
  {
    id: 'pm-vishwakarma',
    name: 'PM Vishwakarma',
    acronym: 'PM Vishwakarma',
    topicTag: 'Rural Innovation',
    ministry: 'Ministry of MSME and Ministry of Skill Development',
    shortDescription:
      'Holistic end-to-end support for traditional artisans and craftspeople working with their hands and tools.',
    fullDescription:
      'Central sector scheme launched to provide comprehensive recognition and financial backing to traditional artisans and craftspersons (Vishwakarmas) across 18 designated manual trades, integrating them into domestic and global value chains.',
    maxBenefit: '₹3 Lakh Collateral-free Credit (₹1L + ₹2L) at 5% interest + ₹15,000 toolkit grant',
    subsidyPercentage: '8% interest subvention paid directly by Government of India',
    officialUrl: 'https://pmvishwakarma.gov.in/',
    targetAudience: 'Artisans and craftspersons engaged in one of the 18 traditional trades',
    keyBenefits: [
      'PM Vishwakarma Certificate & Digital ID Card recognizing master craftsperson status',
      'Collateral-free enterprise credit: Tranche 1 of ₹1,00,000 (18 mo) + Tranche 2 of ₹2,00,000 (30 mo) at just 5% interest',
      'Skill upgradation with ₹500/day stipend during 5-7 days basic training',
      'Toolkit incentive grant of ₹15,000 digital voucher for purchasing modern equipment',
      'Incentives for digital transactions (₹1 per transaction up to 100 txns/month)'
    ],
    requiredDocuments: [
      'Aadhaar Card and active mobile number linked with Aadhaar',
      'Bank Account Passbook / Cancelled Cheque',
      'Ration Card / Family details',
      'Self-declaration of practicing one of the 18 designated traditional trades',
      'Gram Panchayat / Urban Local Body verification certificate'
    ],
    tags: ['Traditional Crafts', 'Artisans', 'Micro Credit', 'Tool Kit Grant', 'Low Interest']
  },
  {
    id: 'cgtmse',
    name: 'Credit Guarantee Scheme for Micro and Small Enterprises (CGTMSE)',
    acronym: 'CGTMSE',
    topicTag: 'Credit Guarantee',
    ministry: 'Ministry of MSME and SIDBI',
    shortDescription:
      'Collateral-free credit facility guarantee for micro and small enterprises up to ₹5 Crores.',
    fullDescription:
      'Setup jointly by the Ministry of MSME and SIDBI to provide institutional credit guarantee coverage to Member Lending Institutions (MLIs), enabling banks to sanction term loans and working capital to MSEs without requiring physical collateral or third-party guarantee.',
    maxBenefit: 'Guarantee cover for credit facility up to ₹500 Lakhs (₹5 Crores)',
    subsidyPercentage: '75% to 85% credit risk guarantee cover',
    officialUrl: 'https://www.cgtmse.in/',
    targetAudience: 'New and existing Micro & Small Enterprises in Manufacturing, Services, and Trading',
    keyBenefits: [
      'Completely collateral-free and third-party guarantee-free bank borrowing',
      '85% guarantee cover for loans up to ₹5 Lakhs to micro enterprises',
      '85% guarantee cover for MSEs operated and owned by Women, SC/ST, and Persons with Disabilities',
      'Includes both Term Loan and Working Capital limits under one unified guarantee structure'
    ],
    requiredDocuments: [
      'Udyam Registration Certificate',
      'Business KYC & PAN of Enterprise',
      'Bank Loan Application & Detailed Project Report (DPR)',
      'Audited balance sheets, ITRs, and GST returns for past 2 years (if existing)',
      'No Objection / Clean credit history declaration from promoter'
    ],
    tags: ['Credit Guarantee', 'Collateral Free', 'MSME', 'Bank Finance', 'Business Expansion']
  },
  {
    id: 'aspire',
    name: 'A Scheme for Promotion of Innovation, Rural Industries and Entrepreneurship (ASPIRE)',
    acronym: 'ASPIRE',
    topicTag: 'Rural Innovation',
    ministry: 'Ministry of MSME',
    shortDescription:
      'Establishment of Livelihood Business Incubators (LBI) and Technology Business Incubators (TBI) in rural areas.',
    fullDescription:
      'ASPIRE aims to set up a network of technology centers and incubation centers to accelerate entrepreneurship, promote agro-rural innovation, create local employment, and commercialize grassroot ideas in rural industries.',
    maxBenefit: 'Up to ₹1 Crore grant for LBIs / ₹1 Crore for TBIs',
    subsidyPercentage: '100% cost of plant & machinery for Govt LBIs (up to ₹1 Crore)',
    officialUrl: 'https://aspire.msme.gov.in/',
    targetAudience: 'Govt bodies, Universities, R&D Labs, Industry Associations, Agri-entrepreneurs, NGOs',
    keyBenefits: [
      'Grant of 100% cost of plant and machinery up to ₹100 Lakhs for Government LBIs',
      'Grant of 75% cost of plant and machinery up to ₹75 Lakhs for Private LBIs',
      'Handholding, prototyping, and seed funding support for rural and agro-based innovations',
      'Market acceleration through specialized MSME rural clusters and technical institutes'
    ],
    requiredDocuments: [
      'Registration Certificate of University / NGO / Incubator / Society',
      'Detailed Project Proposal on proposed incubation facility and economic feasibility',
      'Proof of available land / built-up infrastructure (minimum 1,500 to 3,000 sq ft)',
      'Audited accounts and annual reports of applicant entity for past 3 years',
      'MoU with industry partners or local MSME clusters'
    ],
    tags: ['Incubation', 'Agro-rural', 'Innovation', 'LBI/TBI', 'Grant Funding']
  },
  {
    id: 'stand-up-india',
    name: 'Stand-Up India',
    acronym: 'Stand-Up India',
    topicTag: 'Finance',
    ministry: 'Ministry of Finance and SIDBI',
    shortDescription:
      'Bank loans between ₹10 Lakhs and ₹1 Crore for greenfield enterprises set up by SC/ST or Women entrepreneurs.',
    fullDescription:
      'Launched to facilitate bank loans between ₹10 Lakhs and ₹1 Crore to at least one Scheduled Caste (SC) or Scheduled Tribe (ST) borrower and at least one woman borrower per bank branch for setting up a greenfield enterprise in manufacturing, services, agri-allied, or trading.',
    maxBenefit: 'Composite loan from ₹10 Lakhs to ₹100 Lakhs (₹1 Crore)',
    subsidyPercentage: 'Margin money support can be converged with central/state subsidies (up to 15%)',
    officialUrl: 'https://www.standupmitra.in/',
    targetAudience: 'Women and SC/ST entrepreneurs setting up a greenfield (first-time) venture',
    keyBenefits: [
      'Composite loan (term loan + working capital) covering up to 85% of project cost',
      'Applicable across all commercial scheduled bank branches in India',
      'Handholding support through Lead District Managers and SIDBI Connect Centers',
      'Convergence with State Government subsidy schemes to reduce promoter contribution to 10%'
    ],
    requiredDocuments: [
      'Aadhaar Card, PAN Card, Voter ID',
      'Proof of Category: Caste Certificate (SC/ST) OR identity proof of Woman applicant',
      'Detailed Project Report (DPR) for greenfield (new) enterprise',
      'Partnership deed or Certificate of Incorporation with 51%+ SC/ST/Woman ownership',
      'Bank sanction application and lease agreement for business premises'
    ],
    tags: ['Women Entrepreneurs', 'SC/ST', 'Greenfield Venture', 'Bank Credit', 'New Business']
  }
];
