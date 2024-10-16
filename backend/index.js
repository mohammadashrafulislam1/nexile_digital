import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { config as configDotenv } from "dotenv";
import { heroRouter } from "./Router/hero.js";

// Load environment variables
configDotenv();

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// ENDPOINT SETUP:
app.use('/api/hero', heroRouter)

// Check if the required environment variables are available
if (!process.env.MnongoDB_User || !process.env.MnongoDB_Pass) {
    console.error("MongoDB credentials not set in the environment variables");
    process.exit(1);
}

// MongoDB connection URI
const mongoURI = `mongodb+srv://${process.env.MnongoDB_User}:${process.env.MnongoDB_Pass}@cluster0.yfvuq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.connect(mongoURI)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log('MongoDB connection error:', err));

// Sample route
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
