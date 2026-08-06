import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import protectedRoute from './routes/protectedRoute';
import expenseRoutes from './routes/expenseRoutes';
import dashboardRoutes from './routes/dashboardRoutes';
import budgetRoutes from "./routes/budgetRoutes";
import incomeRoutes from "./routes/incomeRoutes";
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/protected', protectedRoute);
app.use('/api/expenses', expenseRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use("/api/budget", budgetRoutes);
app.use ("/api/income", incomeRoutes);
export default app;