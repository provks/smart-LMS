import express from 'express';
const app = express()
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import morgan from "morgan";
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';

// connect to db
connectDB();

app.use(express.json());

app.use(cors());

app.use('/api/auth', authRoutes); // goes to authRoute

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
