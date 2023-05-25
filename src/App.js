import React, { useState } from "react";
import NumbersList from "./components/NumbersList";

const App = () => {
  const [numbers, setNumbers] = useState([]);

  const addNumberToList = (number) => {
    setNumbers([...numbers, number]);
  };

  return (
    <div>
      <NumbersList numbers={numbers} addNumberToList={addNumberToList} />
    </div>
  );
};

export default App;
