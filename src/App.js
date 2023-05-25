import React, { useState } from "react";
import NumbersList from "./components/NumbersList";
import ErrorBoundary from "./components/ErrorBoundary";

const App = () => {
  const [numbers, setNumbers] = useState([]);

  const addNumberToList = (number) => {
    setNumbers([...numbers, number]);
  };

  return (
    <div className="App">
      <ErrorBoundary>
        <NumbersList numbers={numbers} addNumberToList={addNumberToList} />
      </ErrorBoundary>
    </div>
  );
};

export default App;
