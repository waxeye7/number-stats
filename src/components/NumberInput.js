import React, { useState } from "react";
import "../styles/numberInputStyles.css";

const NumberInput = ({ addNumberToList }) => {
  const [number, setNumber] = useState("");

  const handleInputChange = (event) => {
    const inputNumber = event.target.value;

    const sanitizedNumber = inputNumber.replace(/[^0-9]/g, "");

    setNumber(sanitizedNumber);
  };

  const handleButtonClick = async () => {
    console.log(number);
    if (number.trim() !== "") {
      const id = generateUniqueId(); // Generate a unique ID
      const newNumber = { _id: id, number: number };

      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/numbers`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newNumber),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to create number");
        }

        addNumberToList(newNumber);
        setNumber("");
      } catch (error) {
        console.error("Error creating number:", error);
      }
    }
  };

  const generateUniqueId = () => {
    // Generate a unique ID using a suitable approach,
    // such as a random string or an incremental counter.
    // Here's a simple example using a timestamp.
    return Date.now().toString();
  };

  return (
    <div className="input-container">
      <h1 style={{ color: "#" }}>DataDude</h1>
      <img className="datadude" src="/datadude.png" alt="DataDude" />
      <input
        className="input"
        type="number"
        value={number}
        onChange={handleInputChange}
        placeholder="Enter your number"
      />
      <div className="input-button" onClick={handleButtonClick}>
        Go
      </div>
    </div>
  );
};

export default NumberInput;
