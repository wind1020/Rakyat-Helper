export type Program = {
  id: string;
  category: 'Health' | 'Education' | 'Housing' | 'Cash Assistance';
  name: string;
  description: string;
  amount: string;
  cta: string;
  maxIncome: number;
  minAge?: number;
  maxAge?: number;
  states?: string[];
};

export const PROGRAMS: Program[] = [
  {
    id: 'str',
    category: 'Cash Assistance',
    name: 'Sumbangan Tunai Rahmah (STR)',
    description:
      'Direct cash assistance for low-income households and individuals to alleviate cost of living pressures.',
    amount: 'Up to RM 2,500 / year',
    cta: 'View Details',
    maxIncome: 5000,
  },
  {
    id: 'bsh',
    category: 'Cash Assistance',
    name: 'Bantuan Sara Hidup',
    description: 'Cash assistance for B40 households to reduce living costs.',
    amount: 'RM 1,200 / year',
    cta: 'Apply Now',
    maxIncome: 4000,
  },
  {
    id: 'ptptn',
    category: 'Education',
    name: 'PTPTN Loan',
    description: 'Higher education financing for Malaysian students.',
    amount: 'Low Interest Rate',
    cta: 'Apply Now',
    maxIncome: 8000,
    maxAge: 30,
  },
  {
    id: 'ppr',
    category: 'Housing',
    name: 'PPR Housing',
    description: 'Affordable housing rental scheme for urban citizens.',
    amount: 'RM 124 / month',
    cta: 'Check Slots',
    maxIncome: 3000,
  },
  {
    id: 'madani',
    category: 'Health',
    name: 'Skim Kesihatan Madani',
    description: 'Free acute outpatient treatment at private clinics for B40 recipients.',
    amount: 'Full Coverage',
    cta: 'Book Clinic',
    maxIncome: 5000,
  },
  {
    id: 'bakti',
    category: 'Cash Assistance',
    name: 'Bantuan Bakti (State)',
    description: 'State-level social safety net providing monthly support for qualified residents.',
    amount: 'RM 500',
    cta: 'Check Status',
    maxIncome: 3500,
  },
];

export function matchPrograms(profile: { income: number; age: number; state: string }): Program[] {
  return PROGRAMS.filter((p) => {
    if (profile.income > p.maxIncome) return false;
    if (p.minAge && profile.age < p.minAge) return false;
    if (p.maxAge && profile.age > p.maxAge) return false;
    if (p.states && !p.states.includes(profile.state)) return false;
    return true;
  });
}
