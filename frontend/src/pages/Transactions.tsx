import { useEffect, useState } from "react";
import api from "../services/api";
import TransactionFilters from "../components/TransactionFilters";
import TransactionSummary from "../components/TransactionSummary";
import type { Expense, SortOption } from "../types/transactions";

function Transactions() {

  //State variables
  const [search, setSearch] = useState("");
  const [selectedMonth, setSelectedMonth] = useState(
    new Date().toISOString().slice(0, 7),
  );
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState<SortOption>("Newest");
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [expenseDate, setExpenseDate] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [customCategory, setCustomCategory] = useState("");
  const [editingExpenseId, setEditingExpenseId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  //API Calls
  const fetchExpenses = async () => {
    try {
      const response = await api.get("/expenses");
      setExpenses(response.data.expenses);
    } catch (error) {
      console.error(error);
    }
  };

  //EVENT HANDLERS
  const handleAddExpense = async () => {
    try {
      const finalCategory = category === "Other" ? customCategory : category;

      if (editingExpenseId === null) {
        // Add new expense
        await api.post("/expenses", {
          amount,
          category: finalCategory,
          description,
          expense_date: expenseDate,
        });
      } else {
        // Update existing expense
        await api.put(`/expenses/${editingExpenseId}`, {
          amount,
          category: finalCategory,
          description,
          expense_date: expenseDate,
        });
      }

      await fetchExpenses();

      setCategory("");
      setCustomCategory("");
      setAmount("");
      setDescription("");
      setExpenseDate("");

      setEditingExpenseId(null);

      setShowForm(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (expense: Expense) => {
    setEditingExpenseId(expense.id);

    setCategory(expense.category);

    setAmount(expense.amount.toString());

    setDescription(expense.description);

    setExpenseDate(expense.expense_date);

    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this expense?",
    );

    if (!shouldDelete) {
      return;
    }

    try {
      await api.delete(`/expenses/${id}`);

      await fetchExpenses();
    } catch (error) {
      console.error(error);
    }
  };

    useEffect(() => {
    fetchExpenses();
  }, []);

  //Filtering

  const monthOptions = [
    ...new Set(expenses.map((expense) => expense.expense_date.slice(0, 7))),
  ]
    .sort()
    .reverse();


  const filteredExpenses = expenses
    .filter((expense) => {
      const matchesSearch = expense.description
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesMonth =
        selectedMonth === "" || expense.expense_date.startsWith(selectedMonth);

      const matchesCategory =
        selectedCategory === "All" || expense.category === selectedCategory;

      return matchesSearch && matchesMonth && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "Newest":
          return (
            new Date(b.expense_date).getTime() -
            new Date(a.expense_date).getTime()
          );

        case "Oldest":
          return (
            new Date(a.expense_date).getTime() -
            new Date(b.expense_date).getTime()
          );

        case "Highest":
          return b.amount - a.amount;

        case "Lowest":
          return a.amount - b.amount;

        default:
          return 0;
      }
    });


 //Totals
  const totalSpent = filteredExpenses.reduce(
    (total, expense) => total + Number(expense.amount),
    0,
  );

  //Pagination
  const expensesPerPage = 5;
  const totalPages = Math.ceil(filteredExpenses.length / expensesPerPage);

  const startIndex = (currentPage - 1) * expensesPerPage;

  const endIndex = startIndex + expensesPerPage;

  const currentExpenses = filteredExpenses.slice(startIndex, endIndex);

  


  return (
    <div>
      <h1>Transactions</h1>

      <div>
        <button>+ Add Expense</button>
      </div>

      <TransactionFilters
        search={search}
        setSearch={setSearch}
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        monthOptions={monthOptions}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      <div>
        <TransactionSummary
          selectedMonth={selectedMonth}
          transactionCount={filteredExpenses.length}
          totalSpent={totalSpent}
        />
      </div>

      <div>Transaction Table</div>

      <div>Pagination</div>
    </div>
  );
}

export default Transactions;
