import "dotenv/config";
import express, { type Express, type Request, type Response } from 'express';
import router from './routes/supplierRoutes.ts';
import dotenv from "dotenv";
import pool from './config/db.ts';

dotenv.config();

const app: Express = express();

const PORT = process.env.PORT || 3001

// Routes
app.use('/api/suppliers/', router)

// Server
app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});