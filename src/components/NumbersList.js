import React, { useEffect, useState } from "react";
import NumberInput from "./NumberInput";

const NumbersList = () => {
  const [numbers, setNumbers] = useState([]);

  useEffect(() => {
    fetchNumbers();
  }, []);

  const fetchNumbers = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/numbers`);
      const data = await response.json();
      setNumbers(data);
    } catch (error) {
      console.error("Error fetching numbers:", error);
    }
  };

  const addNumberToList = (number) => {
    setNumbers([...numbers, number]);
  };

  return (
    <div>
      <h2>Numbers List</h2>
      <ul>
        {numbers.map((number) => (
          <li key={number._id}>{number.number}</li>
        ))}
      </ul>
      <NumberInput addNumberToList={addNumberToList} />
    </div>
  );
};

export default NumbersList;
