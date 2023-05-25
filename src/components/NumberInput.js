import React, { useState } from "react";

const NumberInput = ({ addNumberToList }) => {
  const [number, setNumber] = useState("");

  const handleInputChange = (event) => {
    setNumber(event.target.value);
  };

  const handleButtonClick = async () => {
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
    <div>
      <input type="text" value={number} onChange={handleInputChange} />
      <button onClick={handleButtonClick}>Add Number</button>
    </div>
  );
};

export default NumberInput;
