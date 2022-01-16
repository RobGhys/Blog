export interface Company {
  id: number;
  name: string;
  revenue: Revenue[];
  ebitda: Ebitda[];
}

export interface Financials {
  id: number;
  year: number;
  amount: string;
}

export interface Revenue extends Financials { }

export interface Ebitda extends Financials { }

