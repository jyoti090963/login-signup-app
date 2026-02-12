const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
require('./Models/db');

const AuthRouter = require('./Routes/AuthRouter');
const ProductRouter = require('./Routes/ProductRouter');

const PORT = process.env.PORT || 8080;

// 🔑 CORS setup for local + deployed frontend
const allowedOrigins = [
  "http://localhost:3000",
  "https://login-signup-app-omega.vercel.app",
  "https://login-signup-app-qq8o.vercel.app"
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
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
