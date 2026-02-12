const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
require('./Models/db');

const AuthRouter = require('./Routes/AuthRouter');
const ProductRouter = require('./Routes/ProductRouter');

const PORT = process.env.PORT || 8080;

// 🔑 middleware (ONLY ONCE)
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

app.use(express.json());

// 🔑 test route
app.get('/', (req, res) => {
  res.send("hello from server");
});

// 🔑 routes
app.use('/auth', AuthRouter);
app.use('/products', ProductRouter);

// 🔑 start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
