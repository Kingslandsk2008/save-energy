/**
 * Types representing solar calculations and lead inquiries.
 */

export interface LeadInquiry {
  id: string;
  name: string;
  phone: string;
  city: string;
  monthlyBill: number;
  timestamp: string;
  systemSizekW: number;
  estimatedCost: number;
  estimatedSubsidy: number;
  netCost: number;
  startEmi: number;
}

export interface CalculationResult {
  systemSizekW: number;
  totalCost: number;
  subsidy: number;
  netAmount: number;
  emi: number;
}
