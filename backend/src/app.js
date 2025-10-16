import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './routes/auth.js'
import categoryRoutes from './routes/categoryRoutes.js'
import taskRoutes from './routes/taskRoutes.js'
import subtaskRoutes from './routes/subtaskRoutes.js'

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Middlewares globaux
app.use(cors());
app.use(express.json()); 

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/subtasks', subtaskRoutes);

export default app;