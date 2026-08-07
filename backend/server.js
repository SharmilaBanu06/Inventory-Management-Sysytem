const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

// Import MongoDB Connection
const connectDB = require("./config/db");
const productRoutes = require("./routes/productRoutes");

// Load .env variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Create Express App
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use("/api/products", productRoutes);

// Test Route
app.get("/", (req, res) => {
    res.send("Inventory Backend is Running...");
});

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server is running on Port ${PORT}`);
});