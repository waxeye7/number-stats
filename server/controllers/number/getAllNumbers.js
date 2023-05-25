// Assuming you have already set up the necessary dependencies and established the database connection

// Import the Number model
const NumberModel = require("../../models/number");

// Create a function to handle the GET request
const getAllNumbers = async (req, res) => {
  try {
    // Retrieve all numbers from the database
    const numbers = await NumberModel.find();

    // Send the numbers as a response
    res.status(200).json(numbers);
  } catch (error) {
    // Handle any errors
    console.error("Error getting numbers:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = getAllNumbers;
