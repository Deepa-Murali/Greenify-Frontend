import express from 'express';
import treeRoutes from './routes/treeRoute.js';

const app = express();

app.use(express.json());
app.use('/api/trees', treeRoutes); // ✅ Make sure this is correct
app.use("/uploads", express.static("uploads"));
