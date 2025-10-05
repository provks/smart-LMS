import express from 'express';
const app = express()
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import morgan from "morgan";
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import courseRoutes from './routes/courseRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import userRoutes from './routes/userRoutes.js';

// connect to db
connectDB();

app.use(express.json());

app.use(cors());

app.use('/api/auth', authRoutes); // goes to authRoute
app.use('/api/courses', courseRoutes); // goes to courseRoute
app.use('/api/category', categoryRoutes); // goes to categoryRoute
app.use('/api/payment', paymentRoutes); // payment
app.use('/api/user', userRoutes); // user profile

if (process.env.NODE_ENV === 'dev') {
    app.use(morgan('dev'));
}

app.get('/', (req, res) => {
  res.send('Hello World!')
})

const port = process.env.PORT || 3003;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
