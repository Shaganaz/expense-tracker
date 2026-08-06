import { useEffect, useState } from "react";
import api from "../services/api";
import TransactionFilters from "../components/TransactionFilters";
import TransactionSummary from "../components/TransactionSummary";
import type { Expense, SortOption } from "../types/transactions";
import TransactionTable from "../components/TransactionTable";
import Pagination from "../components/Pagination";
import ExpenseModal from "../components/ExpenseModal";
import "../styles/transactions.css";

function Transactions() {
  //State variables
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
  // Load expenses on first render
  useEffect(() => {
    fetchExpenses();
  }, []);

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

  //Filtering

  const monthOptions = [
    ...new Set(expenses.map((expense) => expense.expense_date.slice(0, 7))),
  ]
    .sort()
    .reverse();

  const filteredExpenses = expenses
  .filter((expense) => {
    const matchesMonth =
      selectedMonth === "" ||
      expense.expense_date.startsWith(selectedMonth);

    const matchesCategory =
      selectedCategory === "All" ||
      expense.category === selectedCategory;

    return matchesMonth && matchesCategory;
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
  const totalPages = Math.max(
    1,
    Math.ceil(filteredExpenses.length / expensesPerPage),
  );

  const startIndex = (currentPage - 1) * expensesPerPage;

  const endIndex = startIndex + expensesPerPage;

  const currentExpenses = filteredExpenses.slice(startIndex, endIndex);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedMonth, selectedCategory, sortBy]);

  const formattedMonth = new Date(`${selectedMonth}-01`).toLocaleDateString(
  "en-IN",
  {
    month: "long",
    year: "numeric",
  },
);

  return (
    <div className="transactions-container">

  {/* Header */}

  <div className="transactions-header">

    <div className="transactions-title">

      <h1>Expense Transactions</h1>

      <p>
        Manage, filter and organize your daily spending.
      </p>

    </div>

    

  </div>

  {/* Filters */}

  <div className="table-card">

  <div className="filter-row">

    <TransactionFilters
      selectedMonth={selectedMonth}
      setSelectedMonth={setSelectedMonth}
      selectedCategory={selectedCategory}
      setSelectedCategory={setSelectedCategory}
      monthOptions={monthOptions}
      sortBy={sortBy}
      setSortBy={setSortBy}
      onAddExpense={() => setShowForm(true)}
    />

  </div>

  <div className="table-summary">

    <span className="summary-text">
      ₹{totalSpent.toLocaleString("en-IN")} Spent • {filteredExpenses.length} Transactions
    </span>

  </div>

  <TransactionTable
    expenses={currentExpenses}
    onEdit={handleEdit}
    onDelete={handleDelete}
  />

  <div className="pagination-wrapper">
    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      onPrevious={() => {
        if (currentPage > 1) {
          setCurrentPage(currentPage - 1);
        }
      }}
      onNext={() => {
        if (currentPage < totalPages) {
          setCurrentPage(currentPage + 1);
        }
      }}
    />
  </div>

</div>

    
      <ExpenseModal
        isOpen={showForm}
        onClose={() => {
          setShowForm(false);
          setEditingExpenseId(null);
        }}
        onSave={handleAddExpense}
        amount={amount}
        setAmount={setAmount}
        category={category}
        setCategory={setCategory}
        description={description}
        setDescription={setDescription}
        expenseDate={expenseDate}
        setExpenseDate={setExpenseDate}
        customCategory={customCategory}
        setCustomCategory={setCustomCategory}
        editingExpenseId={editingExpenseId}
      />
    </div>
  );
}

export default Transactions;
