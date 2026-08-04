import { useEffect, useState } from "react";
import api from "../services/api";
import StatCard from "../components/StatCard";
import InsightCard from "../components/InsightCard";
import RecentActivity from "../components/RecentActivity";
import HighestSpendingDayModal from "../components/HighestSpendingDayModal";
import ExpensePieChart from "../components/ExpensePieChart";
import type { Expense } from "../types/transactions";

function Dashboard() {
  //fetching userProfile
  const [user, setUser] = useState<{
    id: number;
    email: string;
  } | null>(null);

  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [budget, setBudget] = useState<number | null>(null);
  const [editingBudget, setEditingBudget] = useState(false);
  const [budgetInput, setBudgetInput] = useState("");
  const income = 50000;
  const [showHighestSpendingDayModal, setShowHighestSpendingDayModal] =
    useState(false);
  const [selectedMonth, setSelectedMonth] = useState(
    new Date().toISOString().slice(0, 7),
  );

  //API Calls
  const fetchProfile = async () => {
    try {
      const response = await api.get("/auth/profile");
      setUser(response.data.user);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchExpenses = async () => {
  try {
    const response = await api.get("/expenses");
    setExpenses(response.data.expenses);
  } catch (error) {
    console.error(error);
  }
};

  const fetchBudget = async () => {
    try {
      const response = await api.get(`/budget/${selectedMonth}`);

      setBudget(response.data.budget);
    } catch (error) {
      console.error(error);
    }
  };

  const saveBudget = async () => {
    try {
      await api.post("/budget", {
        month: selectedMonth,

        budget: Number(budgetInput),
      });

      setBudget(Number(budgetInput));

      setEditingBudget(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProfile();
    fetchExpenses();
  }, []);

  useEffect(() => {
    fetchBudget();
  }, [selectedMonth]);


  //Filtering
  const filteredExpenses = selectedMonth
    ? expenses.filter((expense) =>
        expense.expense_date.startsWith(selectedMonth),
      )
    : expenses;

  //Totals
  const totalExpenses = filteredExpenses.reduce(
    (total, expense) => total + Number(expense.amount),
    0,
  );

  const remaining = (budget ?? 0) - totalExpenses;

  //Analytics

  const spendingByDay = filteredExpenses.reduce(
    (dayTotals: Record<string, number>, expense) => {
      const date = expense.expense_date;

      if (dayTotals[date]) {
        dayTotals[date] = dayTotals[date] + Number(expense.amount);
      } else {
        dayTotals[date] = Number(expense.amount);
      }

      return dayTotals;
    },
    {},
  );

  const highestSpendingDay = Object.entries(spendingByDay).reduce(
    (highest, current) => {
      if (current[1] > highest[1]) {
        return current;
      }

      return highest;
    },
    ["", 0] as [string, number],
  );

  const highestDayExpenses = filteredExpenses.filter(
    (expense) => expense.expense_date === highestSpendingDay[0],
  );

  const recentActivity = Object.entries(spendingByDay)

    .sort((a, b) => new Date(b[0]).getTime() - new Date(a[0]).getTime())

    .slice(0, 3)

    .map(([date, total]) => {
      const transactionCount = filteredExpenses.filter(
        (expense) => expense.expense_date === date,
      ).length;

      return {
        date,
        total,
        transactionCount,
      };
    });
  // Calculate total expense for each category

  const spendingByCategory = filteredExpenses.reduce(
    (categoryTotals: Record<string, number>, expense) => {
      const expenseCategory = expense.category;

      if (categoryTotals[expenseCategory]) {
        categoryTotals[expenseCategory] =
          categoryTotals[expenseCategory] + Number(expense.amount);
      } else {
        categoryTotals[expenseCategory] = Number(expense.amount);
      }

      return categoryTotals;
    },
    {},
  );

  const pieChartData = Object.entries(spendingByCategory).map(
    ([category, amount]) => ({
      label: category,

      value: amount,
    }),
  );

  const highestSpendingCategory = Object.entries(spendingByCategory).reduce(
    (highest, current) => {
      if (current[1] > highest[1]) {
        return current;
      }

      return highest;
    },
    ["", 0] as [string, number],
  );

  const formattedHighestDay = highestSpendingDay[0]
    ? new Date(`${highestSpendingDay[0]}T00:00:00`).toLocaleDateString(
        "en-IN",
        {
          day: "numeric",
          month: "short",
        },
      )
    : "-";

  const getCategoryMessage = (category: string) => {
    switch (category) {
      case "Food":
        return "🍕 Looks like you're a foodie!";

      case "Shopping":
        return "🛍️ Retail therapy was expensive this month!";

      case "Travel":
        return "✈️ Someone loves travelling!";

      case "Fuel":
        return "⛽ Your vehicle is getting all the love.";

      case "Bills":
        return "💡 Adulting isn't cheap!";

      case "Health":
        return "❤️ Investing in your health is always worth it.";

      case "Entertainment":
        return "🍿 Fun comes with a price!";

      default:
        return "💰 Keep tracking your expenses!";
    }
  };

  return (
    <div>
      <h1>Dashboard</h1>

      <h2>Welcome back, {user?.email}</h2>

      <br />

      <label>Select Month </label>

      <input
        type="month"
        value={selectedMonth}
        onChange={(e) => {
          setSelectedMonth(e.target.value);
        }}
      />

      <br />
      <br />

      <div className="stats-grid">
        <StatCard title="Income" value={`₹${income}`} />

        <StatCard title="Budget" value={`₹${budget}`} />

        <StatCard title="Expenses" value={`₹${totalExpenses}`} />

        <StatCard title="Remaining" value={`₹${remaining}`} />
      </div>

      <br />

      <div className="analytics-section">
        <div className="pie-chart">
          <h3>Expense Distribution</h3>

          <ExpensePieChart data={pieChartData} />
        </div>

        <div>
          <InsightCard
            title="Highest Spending Category"
            main={highestSpendingCategory[0]}
            sub={`₹${highestSpendingCategory[1]}`}
            message={getCategoryMessage(highestSpendingCategory[0])}
          />

          <br />

          <InsightCard
            title="Highest Spending Day"
            main={formattedHighestDay}
            sub={`₹${highestSpendingDay[1]}`}
            onClick={() => setShowHighestSpendingDayModal(true)}
          />
        </div>
      </div>

      <br />
      <HighestSpendingDayModal
        isOpen={showHighestSpendingDayModal}
        onClose={() => setShowHighestSpendingDayModal(false)}
        expenses={highestDayExpenses}
      />
      <RecentActivity activities={recentActivity} />
    </div>
  );
}

export default Dashboard;
