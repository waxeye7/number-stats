import React, { useState } from "react";
import "../theme/numberInputStyles.css";

interface NumberData {
  _id: string;
  number: number;
  date: string; // Ensure the 'date' property is of type 'string'
}

interface NumberInputProps {
  addNumberToList: (number: NumberData) => void;
}

const NumberInput: React.FC<NumberInputProps> = ({ addNumberToList }) => {
  const [number, setNumber] = useState<number>(0);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputNumber = event.target.value;
    const sanitizedNumber = inputNumber.replace(/[^0-9]/g, "");
    setNumber(Number(sanitizedNumber));
  };

  const handleButtonClick = async () => {
    console.log(number);
    if (number !== 0) {
      const id = generateUniqueId();
      const newNumber: NumberData = {
        _id: id,
        number: number,
        date: "", // Provide a suitable value for the 'date' property
      };

      try {
        const response = await fetch(`http://localhost:5000/numbers`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newNumber),
        });

        if (!response.ok) {
          throw new Error("Failed to create number");
        }

        addNumberToList(newNumber);
        setNumber(0);
      } catch (error) {
        console.error("Error creating number:", error);
      }
    }
  };

  const generateUniqueId = (): string => {
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
