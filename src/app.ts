import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import protectedRoute from './routes/protectedRoute';
import expenseRoutes from './routes/expenseRoutes';
import dashboardRoutes from './routes/dashboardRoutes';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/protected', protectedRoute);
app.use('/api/expenses', expenseRoutes);
app.use('/api/dashboard', dashboardRoutes);
export default app;