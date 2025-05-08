export interface Offer {
  id: number;
  sources: string[];
  spend: number;
  profit: number;
  title: string;
  status: string;
}

export interface PaymentTerm {
  payment_method: string;
  exchange_extras: number;
  vat: number;
  start_date: string;
  id: number;
  status: string;
}

export interface Client {
  id: number;
  name: string;
  account_manager_image: string,
  sales_manager_image: string,
  account_manager: string;
  sales_manager: string;
  start_date: string;
  status: string;
  type_of_client: string;
  monthly_budgets: string;
  balance_usd: number;
  balance_rub: number;
  loans_rub: number;
  offers: Offer[];
  payment_terms: PaymentTerm[];
  experience: string;
}
