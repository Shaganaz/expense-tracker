import type { SortOption } from "../types/transactions";

type TransactionFiltersProps = {
  search: string;
  setSearch: (value: string) => void;

  selectedMonth: string;
  setSelectedMonth: (value: string) => void;

  selectedCategory: string;
  setSelectedCategory: (value: string) => void;

  sortBy: SortOption;
  setSortBy: (value: SortOption) => void;

  monthOptions: string[];
};

function TransactionFilters({
  search,
  setSearch,
  selectedMonth,
  setSelectedMonth,
  selectedCategory,
  setSelectedCategory,
  sortBy,
  setSortBy,
  monthOptions,
}: TransactionFiltersProps) {
  return (
    <div>
      <input
        type="text"
        placeholder="🔍 Search transactions..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <br />
      <br />

      <select
        value={selectedMonth}
        onChange={(e) => setSelectedMonth(e.target.value)}
      >
        <option value="">All Months</option>

        {monthOptions.map((month) => (
          <option key={month} value={month}>
            {new Date(`${month}-01`).toLocaleDateString("en-IN", {
              month: "long",
              year: "numeric",
            })}
          </option>
        ))}
      </select>

      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="All">All Categories</option>
        <option value="Food">🍕 Food</option>
        <option value="Travel">✈✈️Travel</option>
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
    </div>
  );
}

export default TransactionFilters;
