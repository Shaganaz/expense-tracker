import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import IncomeModal from "../components/IncomeModal";
import BudgetModal from "../components/BudgetModal";
import "../styles/settings.css";

function Settings() {
const [user, setUser] = useState<{
  id: number;
  email: string;
} | null>(null);

const [income, setIncome] = useState<number | null>(null);
const [budget, setBudget] = useState<number | null>(null);

const [showIncomeModal, setShowIncomeModal] = useState(false);
const [showBudgetModal, setShowBudgetModal] = useState(false);

const [incomeInput, setIncomeInput] = useState("");
const [budgetInput, setBudgetInput] = useState("");

const selectedMonth = new Date().toISOString().slice(0, 7);

const navigate = useNavigate();

const fetchProfile = async () => {
  try {
    const response = await api.get("/auth/profile");

    setUser(response.data.user);
  } catch (error) {
    console.error(error);
  }
};

  const fetchBudget = async () => {
    try {
      const response = await api.get(`/budget/${selectedMonth}`);

      setBudget(Number(response.data.budget));
    } catch (error) {
      console.error(error);
    }
  };

  const fetchIncome = async () => {
  try {
    const response = await api.get(`/income/${selectedMonth}`);

    setIncome(Number(response.data.income));
  } catch (error) {
    console.error(error);
  }
};
useEffect(() => {
  fetchProfile();
  fetchIncome();
  fetchBudget();
}, []);

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
const handleLogout = () => {
  localStorage.removeItem("token");
  navigate("/login");
};


return (
  <div className="settings-container">

  <h1>⚙️ Settings</h1>

  <p>Manage your account and preferences.</p>

  <div className="settings-card">

    <h2>Profile</h2>

    <p><strong>Email</strong></p>

    <span>{user?.email}</span>

    <p><strong>User ID</strong></p>

    <span>{user?.id}</span>

  </div>

  <div className="settings-card">

    <h2>Financial Preferences</h2>

    <div className="settings-row">

      <span>Monthly Income</span>

      <div>

        ₹{income?.toLocaleString("en-IN") ?? "Not Set"}

        <button
          onClick={() => {
            setIncomeInput(income?.toString() ?? "");
            setShowIncomeModal(true);
          }}
        >
          Edit
        </button>

      </div>

    </div>

    <div className="settings-row">

      <span>Monthly Budget</span>

      <div>

        ₹{budget?.toLocaleString("en-IN") ?? "Not Set"}

        <button
          onClick={() => {
            setBudgetInput(budget?.toString() ?? "");
            setShowBudgetModal(true);
          }}
        >
          Edit
        </button>

      </div>

    </div>

  </div>

  <div className="settings-card">

    <button
      className="logout-btn"
      onClick={handleLogout}
    >
      Logout
    </button>

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

</div>
);
}
export default Settings;

