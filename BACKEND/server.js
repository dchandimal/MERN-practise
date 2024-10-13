// Import necessary modules
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config(); // Load environment variables from .env file

// Create an instance of Express
const app = express();

app.use(cors());

// Middleware to parse JSON
app.use(express.json());

// Define MongoDB URI from .env file
const uri = process.env.MONGO_URI; // Ensure this line comes after dotenv is loaded

// Check if the URI is defined
if (!uri) {
  console.error("MONGO_URI is undefined. Please check your .env file.");
  process.exit(1); // Exit the application
}

// Connect to MongoDB
mongoose
  .connect(uri)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.log("Error connecting to MongoDB:", err));

// Define a simple route to test if the server is working
app.get("/", (req, res) => {
  res.send("API is working!");
});

const studentRouter = require("./routes/students.js");

//http:localhost:8070/student will redirect to routes/student.js by below line
app.use("/student", studentRouter);

// Start the server
const PORT = process.env.PORT || 8070; // Use PORT from .env or default to 8070
app.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}`);
});
