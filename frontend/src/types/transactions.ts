export type SortOption =
  | "Newest"
  | "Oldest"
  | "Highest"
  | "Lowest";

export type Expense = {
  id: number;
  amount: number;
  category: string;
  description: string;
  expense_date: string;
  source: string;
};