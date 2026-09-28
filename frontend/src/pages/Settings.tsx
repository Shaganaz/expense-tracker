import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import IncomeModal from "../components/IncomeModal";
import BudgetModal from "../components/BudgetModal";
import "../styles/settings.css";

function Settings() {
const [user, setUser] = useState<{
  id: number;
  name: string;
  email: string;
  age: number | null;
} | null>(null);

const [income, setIncome] = useState<number | null>(null);
const [budget, setBudget] = useState<number | null>(null);

const [showIncomeModal, setShowIncomeModal] = useState(false);
const [showBudgetModal, setShowBudgetModal] = useState(false);

const [incomeInput, setIncomeInput] = useState("");
const [budgetInput, setBudgetInput] = useState("");
const [editProfile, setEditProfile] = useState(false);

const [nameInput, setNameInput] = useState("");
const [emailInput, setEmailInput] = useState("");
const [ageInput, setAgeInput] = useState("");

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
  if (!budgetInput || Number(budgetInput) <= 0) {
    alert("Please enter a valid budget");
    return;
  }

  try {
    console.log("Saving budget:", budgetInput);

    const response = await api.post("/budget", {
      month: selectedMonth,
      budget: Number(budgetInput),
    });

    console.log("Budget response:", response.data);

    setBudget(Number(budgetInput));
    setShowBudgetModal(false);

    alert("Budget saved successfully!");
  } catch (error: any) {
    console.error("Budget save error:", error.response?.data || error);
    alert(error.response?.data?.message || "Failed to save budget");
  }
};

  const saveIncome = async () => {
  if (!incomeInput || Number(incomeInput) <= 0) {
    alert("Please enter a valid income");
    return;
  }

  try {
    console.log("Saving income:", incomeInput);

    const response = await api.post("/income", {
      month: selectedMonth,
      income: Number(incomeInput),
    });

    console.log("Income response:", response.data);

    setIncome(Number(incomeInput));
    setShowIncomeModal(false);

    alert("Income saved successfully!");
  } catch (error: any) {
    console.error("Income save error:", error.response?.data || error);
    alert(error.response?.data?.message || "Failed to save income");
  }
};

const updateProfile = async () => {
  if (!nameInput.trim() || !emailInput.trim()) {
    alert("Name and email are required");
    return;
  }

  try {
    const response = await api.put("/auth/profile", {
      name: nameInput,
      email: emailInput,
      age: ageInput === "" ? null : Number(ageInput),
    });

    alert(response.data.message);

    // Refresh profile details
    await fetchProfile();

    setEditProfile(false);
  } catch (error: any) {
    console.error(
      "Profile update error:",
      error.response?.data || error
    );

    alert(
      error.response?.data?.message ||
      "Failed to update profile"
    );
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

  <div className="settings-card profile-card">

  <div className="profile-header">
    <div className="profile-avatar">
      {user?.name?.charAt(0).toUpperCase() || "U"}
    </div>

    <div>
      <h2>Profile</h2>
      <p>Manage your personal information</p>
    </div>
  </div>

  {!editProfile ? (
    <>
      <div className="profile-details">

        <div className="profile-field">
          <span className="profile-label">Full Name</span>
          <span className="profile-value">
            {user?.name || "Not Set"}
          </span>
        </div>

        <div className="profile-field">
          <span className="profile-label">Email Address</span>
          <span className="profile-value">
            {user?.email || "Not Set"}
          </span>
        </div>

        <div className="profile-field">
          <span className="profile-label">Age</span>
          <span className="profile-value">
            {user?.age ?? "Not Set"}
          </span>
        </div>

        <div className="profile-field">
          <span className="profile-label">User ID</span>
          <span className="profile-value readonly">
            #{user?.id || "—"}
          </span>
        </div>

      </div>

      <button
        className="edit-profile-btn"
        onClick={() => {
          setNameInput(user?.name || "");
          setEmailInput(user?.email || "");
          setAgeInput(user?.age?.toString() || "");
          setEditProfile(true);
        }}
      >
        ✏️ Edit Profile
      </button>
    </>
  ) : (
    <div className="profile-edit-form">

      <label>Full Name</label>
      <input
        type="text"
        value={nameInput}
        onChange={(e) => setNameInput(e.target.value)}
      />

      <label>Email Address</label>
      <input
        type="email"
        value={emailInput}
        onChange={(e) => setEmailInput(e.target.value)}
      />

      <label>Age</label>
      <input
        type="number"
        value={ageInput}
        onChange={(e) => setAgeInput(e.target.value)}
      />

      <div className="profile-edit-buttons">
        <button
          className="save-profile-btn"
          onClick={updateProfile}
        >
          Save Changes
        </button>

        <button
          className="cancel-profile-btn"
          onClick={() => setEditProfile(false)}
        >
          Cancel
        </button>
      </div>

    </div>
  )}

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

