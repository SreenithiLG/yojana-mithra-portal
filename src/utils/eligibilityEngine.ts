import { ALL_SCHEMES } from '../data/schemes';
import { EligibilityFormData, Scheme, SchemeEvaluationResult } from '../types';

export function evaluateUserEligibility(formData: EligibilityFormData): SchemeEvaluationResult[] {
  const results: SchemeEvaluationResult[] = [];

  const income = Number(formData.annualIncome) || 0;
  const projectCost = Number(formData.projectCost) || 0;
  const ownershipPct = Number(formData.categoryOwnershipPercent) || 100;
  const isSC = formData.socialCategory === 'SC';
  const isST = formData.socialCategory === 'ST';
  const isOBC = formData.socialCategory === 'OBC';
  const isEBC = formData.socialCategory === 'EBC';
  const isDNT = formData.socialCategory === 'DNT';
  const isFemale = formData.gender === 'Female';
  const isSpecialCategory = isSC || isST || isOBC || isFemale || formData.isPwD === 'Yes' || formData.isExServiceman === 'Yes';
  const hasNoDefault = formData.loanDefault !== 'Yes';
  const notSubsidized = formData.alreadyReceivedSubsidy !== 'Yes';

  for (const scheme of ALL_SCHEMES) {
    let isEligible = false;
    let matchScore = 0;
    const reasons: string[] = [];
    const disqualifications: string[] = [];
    let benefitHighlight = '';

    switch (scheme.id) {
      case 'pmegp': {
        // PMEGP:
        // Individual/SHG, New or expansion, Mfg/Service, 8th pass if high cost, no default, no duplicate subsidy
        const validApplicant = ['Individual', 'NGO', ''].includes(formData.applicantType) || formData.ownershipStructure === 'SHG';
        const validPurpose = ['Start a New Business', 'Expand an Existing Business'].includes(formData.purpose) || !formData.purpose;
        const validSector = ['Manufacturing', 'Service', 'Rural', 'Agro', 'Traditional Craft/Trade'].includes(formData.sector) || !formData.sector;
        
        let educationMet = true;
        if (formData.highestQualification === 'Below 8th' && projectCost > 1000000 && formData.sector === 'Manufacturing') {
          educationMet = false;
          disqualifications.push('For manufacturing projects above ₹10 Lakhs, minimum 8th standard pass is mandatory.');
        }

        if (validApplicant && validPurpose && validSector && hasNoDefault && notSubsidized && educationMet) {
          isEligible = true;
          matchScore = 92;
          const subsidyRate = formData.addressType === 'Rural' ? (isSpecialCategory ? '35%' : '25%') : (isSpecialCategory ? '25%' : '15%');
          reasons.push(`Eligible for ${subsidyRate} government margin money subsidy (${formData.addressType || 'Rural/Urban'} location).`);
          reasons.push('Eligible for bank loan covering 90% to 95% of project cost with just 5-10% promoter contribution.');
          benefitHighlight = `${subsidyRate} Subsidy on Project Cost (up to ₹50L Mfg / ₹20L Service)`;
        } else {
          if (!hasNoDefault) disqualifications.push('Prior loan default makes enterprise ineligible for bank credit-linked subsidy.');
          if (!notSubsidized) disqualifications.push('Existing units that already availed government subsidy cannot claim repeat capital subsidy.');
        }
        break;
      }

      case 'nssh': {
        // NSSH:
        // SC or ST ownership >= 51%, MSME
        const scStEligible = (isSC || isST) || (ownershipPct >= 51 && (formData.socialCategory === 'SC' || formData.socialCategory === 'ST'));
        if (scStEligible) {
          isEligible = true;
          matchScore = 88;
          reasons.push('Meets mandatory 51%+ SC/ST enterprise shareholding criteria.');
          reasons.push('Eligible for 80% subsidy on exhibition stall charges, testing fees, and free registration under Single Point Registration Scheme.');
          reasons.push('Access to vendor matchmaking for 4% CPSE annual public procurement quota.');
          benefitHighlight = '80% Fee Subsidy + 100% Single Point Registration Waiver';
        } else {
          disqualifications.push('NSSH requires enterprise promoter to belong to Scheduled Caste (SC) or Scheduled Tribe (ST).');
        }
        break;
      }

      case 'nsfdc': {
        // NSFDC:
        // SC only, Annual income <= 3,00,000 (Double poverty line)
        if (isSC) {
          if (income <= 350000 || formData.isBplCardHolder === 'Yes') {
            isEligible = true;
            matchScore = 95;
            reasons.push('Meets Scheduled Caste (SC) criteria with income within the double poverty line benchmark (≤ ₹3.00 Lakhs).');
            if (isFemale) {
              reasons.push('Eligible for Mahila Samriddhi Yojana providing micro-credit up to ₹1.4 Lakhs at ultra-low 4% annual interest.');
            }
            reasons.push('Term loans available up to ₹50 Lakhs at subsidized 4%–8% p.a. interest rates.');
            benefitHighlight = isFemale ? 'Concessional Term Loan + Mahila Samriddhi Micro-credit at 4% Interest' : 'Low-interest Term Loans (4% to 8% p.a.) up to ₹50 Lakhs';
          } else {
            disqualifications.push('Family annual income exceeds ₹3,00,000 benchmark for concessional NSFDC channelizing.');
          }
        } else {
          disqualifications.push('Exclusive for Scheduled Caste (SC) individuals.');
        }
        break;
      }

      case 'cegssc': {
        // CEGSSC:
        // SC promoter > 51%, loans 15L to 5 Cr, guarantee scheme
        const scPromoter = (isSC || ownershipPct > 51) && formData.socialCategory === 'SC';
        const costInRange = projectCost >= 1500000 || formData.purpose === 'Get a Loan Guarantee for an Existing Loan' || formData.haveBankLoanToGuarantee === 'Yes' || projectCost === 0;

        if (scPromoter && costInRange && hasNoDefault) {
          isEligible = true;
          matchScore = 89;
          reasons.push('SC-promoted business qualifies for 100% credit guarantee cover for loans up to ₹1 Crore without third-party physical collateral.');
          reasons.push('Enables banks to sanction expansion facilities between ₹15 Lakhs and ₹5 Crores with guarantee fee as low as 0.50%.');
          benefitHighlight = '100% Collateral-Free Bank Loan Guarantee cover up to ₹5 Crores';
        } else {
          if (!scPromoter) disqualifications.push('Applicant entity must have minimum 51% Scheduled Caste (SC) ownership.');
          if (!hasNoDefault) disqualifications.push('Credit guarantee requires clean credit track record without existing bank default.');
        }
        break;
      }

      case 'vcf-sc': {
        // VCF-SC:
        // SC promoter >= 51%, high growth, Pvt Ltd / Company structure, ₹20L to ₹15Cr
        const scShareholding = (isSC || ownershipPct >= 51) && formData.socialCategory === 'SC';
        const suitableStructure = ['Private Limited', 'Partnership', 'Individual'].includes(formData.ownershipStructure);

        if (scShareholding && suitableStructure && (projectCost >= 2000000 || projectCost === 0)) {
          isEligible = true;
          matchScore = 85;
          reasons.push('SC majority shareholding qualifies for patient venture capital and equity/compulsorily convertible debenture financing.');
          reasons.push('Ticket size from ₹20 Lakhs up to ₹15 Crores with long-term tenure up to 8-10 years.');
          reasons.push('Governance support and institutional board guidance from IFCI Venture Capital.');
          benefitHighlight = 'Venture Capital & Equity Investment from ₹20 Lakhs to ₹15 Crores';
        } else {
          if (!scShareholding) disqualifications.push('Promoters must hold at least 51% equity with SC certification.');
          if (projectCost > 0 && projectCost < 2000000) disqualifications.push('Minimum project funding threshold under VCF-SC is ₹20 Lakhs.');
        }
        break;
      }

      case 'pm-daksh': {
        // PM-DAKSH:
        // Skill training, SC, OBC, EBC, DNT
        const isEligibleCategory = isSC || isOBC || isEBC || isDNT;
        const validIncome = isSC || isDNT || (isOBC && income <= 300000) || (isEBC && income <= 100000) || income === 0;
        const wantsSkillOrYouth = formData.purpose === 'Get Skill Training' || formData.purpose === '' || formData.highestQualification !== 'Graduate+';

        if (isEligibleCategory && validIncome) {
          isEligible = true;
          matchScore = 94;
          reasons.push(`Belongs to targeted social category (${formData.socialCategory || 'SC/OBC/EBC/DNT'}).`);
          reasons.push('100% free certified skill training under NSQF job roles with placement linkages.');
          reasons.push('Monthly stipend of ₹1,000–₹1,500 during training + wage compensation of ₹2,500 for upskilling.');
          benefitHighlight = '100% Free NSQF Skill Training + Monthly Stipend up to ₹1,500';
        } else {
          if (!isEligibleCategory) disqualifications.push('PM-DAKSH is reserved for youths belonging to SC, OBC, EBC, DNT, and Safai Karamchari categories.');
          if (!validIncome) disqualifications.push('Family income exceeds category ceiling for PM-DAKSH (₹3L for OBC, ₹1L for EBC).');
        }
        break;
      }

      case 'pm-vishwakarma': {
        // PM Vishwakarma:
        // Artisans / 18 designated trades, craftspeople
        const isTradeSelected = Boolean(formData.vishwakarmaTrade) || formData.sector === 'Traditional Craft/Trade';
        const isIndividualOrArtisan = ['Individual', 'SHG', ''].includes(formData.ownershipStructure);

        if (isTradeSelected && isIndividualOrArtisan) {
          isEligible = true;
          matchScore = 98;
          reasons.push(`Practices traditional craft (${formData.vishwakarmaTrade || 'Designated Manual Craft'}), making applicant eligible for PM Vishwakarma Digital Certificate.`);
          reasons.push('Collateral-free enterprise loan: Tranche 1 of ₹1,00,000 and Tranche 2 of ₹2,00,000 at concessional 5% interest.');
          reasons.push('₹15,000 grant voucher for modern toolkit procurement + ₹500/day training stipend.');
          benefitHighlight = '₹3 Lakh Collateral-free Loan at 5% + ₹15,000 Free Toolkit Grant';
        } else {
          disqualifications.push('Requires engagement in one of the 18 traditional crafts/trades recognized by the Ministry of MSME.');
        }
        break;
      }

      case 'cgtmse': {
        // CGTMSE:
        // Micro/Small enterprise, manufacturing/service/trading, collateral-free loan up to 5 Cr, no default
        const validSector = ['Manufacturing', 'Service', 'Trading', 'Agro', 'Rural'].includes(formData.sector) || !formData.sector;
        const wantsLoanOrGuarantee = ['Start a New Business', 'Expand an Existing Business', 'Get a Loan Guarantee for an Existing Loan'].includes(formData.purpose) || !formData.purpose;

        if (validSector && hasNoDefault && wantsLoanOrGuarantee) {
          isEligible = true;
          matchScore = 90;
          reasons.push('Micro & Small enterprises qualify for 75% to 85% credit guarantee without pledging third-party physical properties or assets.');
          if (isFemale || isSC || isST || formData.isPwD === 'Yes') {
            reasons.push('Enhanced 85% guarantee cover rate applies for Special Category (Women / SC / ST / PwD) owned MSEs.');
          }
          reasons.push('Covers both Term Loans and Working Capital requirements up to ₹500 Lakhs (₹5 Crores).');
          benefitHighlight = 'Collateral-Free Bank Credit Guarantee up to ₹5 Crores (85% Coverage)';
        } else {
          if (!hasNoDefault) disqualifications.push('CGTMSE requires clean non-NPA credit history without previous loan defaults.');
        }
        break;
      }

      case 'aspire': {
        // ASPIRE:
        // Setting up LBI / TBI, Innovation, Rural / Agro, Univ / NGO / Govt / Private
        const isEligibleApplicant = ['University', 'NGO', 'Industry Association', 'Government Body', 'Private Entity'].includes(formData.applicantType) || formData.purpose === 'Set Up a Training or Incubation Center';
        const isRuralAgro = ['Agro', 'Rural', 'Manufacturing'].includes(formData.sector) || formData.purpose === 'Set Up a Training or Incubation Center' || formData.sector === '';

        if (isEligibleApplicant && isRuralAgro) {
          isEligible = true;
          matchScore = 91;
          reasons.push('Eligible applicant organization for setting up Livelihood Business Incubator (LBI) or Technology Business Incubator (TBI).');
          reasons.push('100% grant for plant & machinery (up to ₹1 Crore) for Government agencies, and up to 75% (₹75 Lakhs) for Private/NGO entities.');
          reasons.push('Fosters agro-rural industrial innovation and localized employment generation.');
          benefitHighlight = 'Up to ₹100 Lakhs Grant for Setting Up Incubation Centers';
        } else {
          disqualifications.push('ASPIRE primarily supports institutions, universities, NGOs, and incubators setting up rural livelihood centers.');
        }
        break;
      }

      case 'stand-up-india': {
        // Stand-Up India:
        // SC / ST OR Woman, Greenfield (Not Started or < 1 yr), ₹10L - ₹1 Cr
        const isTargetGroup = isFemale || isSC || isST || (ownershipPct >= 51 && (formData.socialCategory === 'SC' || formData.socialCategory === 'ST'));
        const isGreenfield = formData.businessStatus === 'Not Started' || formData.businessStatus === 'Running Under 1 Year' || formData.businessStatus === '';
        const loanSizeOk = (projectCost >= 1000000 && projectCost <= 10000000) || projectCost === 0;

        if (isTargetGroup && isGreenfield && hasNoDefault && loanSizeOk) {
          isEligible = true;
          matchScore = 96;
          reasons.push(`Target demographic qualified: Greenfield venture led by ${isFemale ? 'Woman Entrepreneur' : 'SC/ST Entrepreneur'}.`);
          reasons.push('Composite loan (term loan + working capital) between ₹10 Lakhs and ₹1 Crore sanctioned through scheduled bank branches.');
          reasons.push('Borrower margin contribution kept low (15%), combinable with Central/State subsidy schemes.');
          benefitHighlight = 'Bank Loan from ₹10 Lakhs to ₹1 Crore for Greenfield Enterprises';
        } else {
          if (!isTargetGroup) disqualifications.push('Stand-Up India is strictly for Woman borrowers or Scheduled Caste (SC) / Scheduled Tribe (ST) promoters.');
          if (!isGreenfield) disqualifications.push('Stand-Up India is designated for Greenfield (first-time) ventures only.');
          if (!hasNoDefault) disqualifications.push('Borrower should not be in default to any bank or financial institution.');
        }
        break;
      }
    }

    results.push({
      scheme,
      isEligible,
      matchScore: isEligible ? matchScore : 20,
      reasons: isEligible ? reasons : ['General review needed based on applicant demographic and project specifications.'],
      disqualificationReasons: disqualifications.length > 0 ? disqualifications : undefined,
      benefitHighlight: benefitHighlight || scheme.maxBenefit
    });
  }

  // Sort eligible schemes first with highest match score
  return results.sort((a, b) => {
    if (a.isEligible && !b.isEligible) return -1;
    if (!a.isEligible && b.isEligible) return 1;
    return b.matchScore - a.matchScore;
  });
}
