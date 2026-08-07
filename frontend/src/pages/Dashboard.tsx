import { useEffect, useState } from "react";
import api from "../services/api";
import StatCard from "../components/StatCard";
import IncomeModal from "../components/IncomeModal";
import BudgetModal from "../components/BudgetModal";
import RecentActivity from "../components/RecentActivity";
import HighestSpendingDayModal from "../components/HighestSpendingDayModal";
import ExpensePieChart from "../components/ExpensePieChart";
import type { Expense } from "../types/transactions";
import "../styles/dashboard.css";

function Dashboard() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [budget, setBudget] = useState<number | null>(null);
  const [budgetInput, setBudgetInput] = useState("");
  const [income, setIncome] = useState<number | null>(null);
  const [showIncomeModal, setShowIncomeModal] = useState(false);
  const [showBudgetModal, setShowBudgetModal] = useState(false);

  const [incomeInput, setIncomeInput] = useState("");
  const [showHighestSpendingDayModal, setShowHighestSpendingDayModal] =
    useState(false);
  const [selectedMonth, setSelectedMonth] = useState(
    new Date().toISOString().slice(0, 7),
  );

  const fetchBudget = async () => {
    try {
      const response = await api.get(`/budget/${selectedMonth}`);
      setBudget(response.data.budget);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchIncome = async () => {
    try {
      const response = await api.get(`/income/${selectedMonth}`);
      setIncome(response.data.income);
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

  const saveIncome = async () => {
    try {
      await api.post("/income", {
        month: selectedMonth,
        income: Number(incomeInput),
      });

      setIncome(Number(incomeInput));
      setShowIncomeModal(false);
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
      setShowBudgetModal(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
  fetchExpenses();
}, []);

useEffect(() => {
  fetchBudget();
  fetchIncome();
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

  const recentActivity = [...filteredExpenses]
    .sort(
      (a, b) =>
        new Date(b.expense_date).getTime() - new Date(a.expense_date).getTime(),
    )
    .slice(0, 3);
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
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div>
          <div className="dashboard-title">
            <h1>Expense Dashboard</h1>

            <p>Track your spending and stay within your budget ✨</p>
          </div>
        </div>

        <div className="month-picker">
          <label>🗓️ Month</label>

          <input
            type="month"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          />
        </div>
      </div>

      <div className="stats-grid">
        <StatCard
          title="Income"
          value={
            income !== null ? `₹${income.toLocaleString("en-IN")}` : "Not Set"
          }
          buttonText={income === null ? "Set Income" : "Edit"}
          onButtonClick={() => {
            setIncomeInput(income?.toString() ?? "");
            setShowIncomeModal(true);
          }}
          icon="💰"
        />

        <StatCard
          title="Budget"
          value={
            budget !== null ? `₹${budget.toLocaleString("en-IN")}` : "Not Set"
          }
          buttonText={budget === null ? "Set Budget" : "Edit"}
          onButtonClick={() => {
            setBudgetInput(budget?.toString() ?? "");
            setShowBudgetModal(true);
          }}
          icon="🐷"
        />

        <StatCard
          title="Expenses"
          value={`₹${totalExpenses.toLocaleString("en-IN")}`}
          icon="💸"
        />

        <StatCard
          title="Remaining"
          value={`₹${remaining.toLocaleString("en-IN")}`}
          icon="✨"
        />
      </div>

      <div className="analytics-section">
        <div className="analytics-card">
          <h3>Expense Distribution</h3>

          <div className="analytics-content">
            {pieChartData.length > 0 ? (
              <ExpensePieChart data={pieChartData} />
            ) : (
              <div className="no-chart">
                <p>No expenses for this month.</p>
              </div>
            )}

            <div className="analytics-insights">
              <div className="mini-card">
                <h4>🛍 Highest Spending Category</h4>

                <h2>{highestSpendingCategory[0]}</h2>

                <p>₹{highestSpendingCategory[1]}</p>

                <small>{getCategoryMessage(highestSpendingCategory[0])}</small>
              </div>

              <div
                className="mini-card clickable"
                onClick={() => setShowHighestSpendingDayModal(true)}
              >
                <h4>🗓️ Highest Spending Day</h4>

                <h2>{formattedHighestDay}</h2>

                <p>₹{highestSpendingDay[1]}</p>

                <small>View Transactions →</small>
              </div>
            </div>
          </div>
        </div>
      </div>

      <IncomeModal
        isOpen={showIncomeModal}
        onClose={() => setShowIncomeModal(false)}
        onSave={saveIncome}
        income={incomeInput}
        setIncome={setIncomeInput}
      />

      <BudgetModal
        isOpen={showBudgetModal}
        onClose={() => setShowBudgetModal(false)}
        onSave={saveBudget}
        budget={budgetInput}
        setBudget={setBudgetInput}
      />

      <HighestSpendingDayModal
        isOpen={showHighestSpendingDayModal}
        onClose={() => setShowHighestSpendingDayModal(false)}
        expenses={highestDayExpenses}
      />
      <div className="recent-activity-card">
        <RecentActivity activities={recentActivity} />
      </div>
    </div>
  );
}

export default Dashboard;
