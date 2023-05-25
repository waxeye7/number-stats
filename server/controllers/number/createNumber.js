// Assuming you have already set up the necessary dependencies and established the database connection

// Import the Number model
const NumberModel = require("../../models/number");

// Create a function to handle the POST request
const createNumber = async (req, res) => {
  try {
    // Retrieve the number from the request body
    const { number } = req.body;

    // Create a new instance of the Number model
    const newNumber = new NumberModel({
      number,
    });

    // Save the new number to the database
    await newNumber.save();

    // Send a success response
    res.status(201).json({ message: "Number created successfully" });
  } catch (error) {
    // Handle any errors
    console.error("Error creating number:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = createNumber;
