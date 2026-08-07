import type { SortOption } from "../types/transactions";

type TransactionFiltersProps = {

  selectedMonth: string;
  setSelectedMonth: (value: string) => void;

  selectedYear: string;
  setSelectedYear: (value: string) => void;

  months: {
    value: string;
    label: string;
  }[];

  years: string[];

  selectedCategory: string;
  setSelectedCategory: (value: string) => void;

  sortBy: SortOption;
  setSortBy: (value: SortOption) => void;

  onAddExpense: () => void;
};

function TransactionFilters({
  selectedMonth,
  setSelectedMonth,
   selectedYear,
  setSelectedYear,
  months,
  years,
  selectedCategory,
  setSelectedCategory,
  sortBy,
  setSortBy,
  onAddExpense,
}: TransactionFiltersProps) {
  return (
    <div>

      <div className="filter-row">

    <select
  value={selectedMonth}
  onChange={(e) => setSelectedMonth(e.target.value)}
>
  {months.map((month) => (
    <option
      key={month.value}
      value={month.value}
    >
      {month.label}
    </option>
  ))}
</select>

      <select
  value={selectedYear}
  onChange={(e) => setSelectedYear(e.target.value)}
>
  {years.map((year) => (
    <option
      key={year}
      value={year}
    >
      {year}
    </option>
  ))}
</select>
<select>
        <option value="All">All Categories</option>
        <option value="Food">🍕 Food</option>
        <option value="Travel">✈️Travel</option>
        <option value="Shopping">🛍️ Shopping</option>
        <option value="Fuel">⛽ Fuel</option>
        <option value="Bills">💡 Bills</option>
        <option value="Health">❤️ Health</option>
        <option value="Entertainment"> 🍿 Entertainment </option>
      </select>

      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value as SortOption)}
      >
        <option value="Newest">Newest</option>

        <option value="Oldest">Oldest</option>

        <option value="Highest">Highest Amount</option>

        <option value="Lowest">Lowest Amount</option>
      </select>
       <button
    className="add-expense-btn"
    onClick={onAddExpense}
  >
    + Add Expense
  </button>
    </div>
    </div>
  );
}

export default TransactionFilters;
