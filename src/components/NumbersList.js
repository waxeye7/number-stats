import React, { useEffect, useState } from "react";
import NumberInput from "./NumberInput";
import "../styles/numberListStyles.css";

const NumbersList = () => {
  const [numbers, setNumbers] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState("all");
  const [isNumberEntered, setIsNumberEntered] = useState(false);
  const [average, setAverage] = useState(0);
  const [recentAdditions, setRecentAdditions] = useState([]);
  const [modeNumber, setModeNumber] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const calculateStats = () => {
    // Filter numbers based on selected period
    const filteredNumbers = numbers.filter(filterNumbersByPeriod);

    // Calculate average number
    const sum = filteredNumbers.reduce((acc, num) => acc + num.number, 0);
    const average =
      filteredNumbers.length > 0 ? sum / filteredNumbers.length : 0;
    setAverage(average);

    // Get recent additions (assuming numbers have a `date` property)
    const sortedNumbers = filteredNumbers.sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
    const recentAdditions = sortedNumbers.slice(0, 5);
    setRecentAdditions(recentAdditions);

    // Calculate mode number (most frequent number)
    const numberCounts = {};
    let maxCount = 0;
    let modeNumber = null;

    filteredNumbers.forEach((num) => {
      numberCounts[num.number] = numberCounts[num.number]
        ? numberCounts[num.number] + 1
        : 1;
      if (numberCounts[num.number] > maxCount) {
        maxCount = numberCounts[num.number];
        modeNumber = num.number;
      }
    });

    setModeNumber(modeNumber);
  };

  useEffect(() => {
    const fetchNumbersAndCalculateStats = async () => {
      await fetchNumbers();
      calculateStats(); // Recalculate stats after fetching numbers
      setIsLoading(false);
    };

    fetchNumbersAndCalculateStats();
  }, [numbers, selectedPeriod]); // Include selectedPeriod as a dependency

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
    setIsNumberEntered(true);
    setNumbers([...numbers, number]);
  };

  const handlePeriodChange = (event) => {
    setSelectedPeriod(event.target.value);
  };

  const filterNumbersByPeriod = (number) => {
    const currentDate = new Date();
    const numberDate = new Date(number.date);
    const timeDiff = currentDate - numberDate;
    const oneHour = 60 * 60 * 1000;
    const oneDay = 24 * oneHour;
    const oneWeek = 7 * oneDay;
    const oneMonth = 30 * oneDay;
    const oneYear = 365 * oneDay;

    if (selectedPeriod === "day") {
      return timeDiff <= oneDay;
    } else if (selectedPeriod === "hour") {
      return timeDiff <= oneHour;
    } else if (selectedPeriod === "week") {
      return timeDiff <= oneWeek;
    } else if (selectedPeriod === "month") {
      return timeDiff <= oneMonth;
    } else if (selectedPeriod === "year") {
      return timeDiff <= oneYear;
    }

    return true; // Display all numbers (all time)
  };

  return (
    <div className="container">
      {!isNumberEntered ? (
        <NumberInput addNumberToList={addNumberToList} />
      ) : (
        <></>
      )}
      {!isLoading && isNumberEntered ? (
        <>
          <div className="stats-wrapper">
            <div className="date-selector">
              <label htmlFor="period" className="card-section-title">
                Filter by period:
              </label>
              <select
                id="period"
                value={selectedPeriod}
                onChange={handlePeriodChange}
                className="card-section-content select-input"
              >
                <option value="all">All Time</option>
                <option value="hour">Past Hour</option>
                <option value="day">Past 24 Hours</option>
                <option value="week">Past Week</option>
                <option value="month">Past Month</option>
                <option value="year">Past Year</option>
              </select>
            </div>
            <div className="card">
              {/* Time Filter */}

              {/* Display average */}
              <div className="card-section">
                <p className="card-section-title">Average:</p>
                <p className="card-section-content">{average.toFixed(0)}</p>
              </div>

              {/* Display recent additions */}
              <div className="card-section">
                <p className="card-section-title">Recent Additions:</p>
                <ul className="card-section-content">
                  {recentAdditions
                    .filter(filterNumbersByPeriod)
                    .map((number) => (
                      <li key={number._id}>{number.number}</li>
                    ))}
                </ul>
              </div>

              {/* Display mode number */}
              <div className="card-section">
                <p className="card-section-title">Mode Number:</p>
                <p className="card-section-content">{modeNumber}</p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
      {isLoading && isNumberEntered ? (
        <p>Loading...</p> // Display a loading message while fetching the data
      ) : (
        <></>
      )}
    </div>
  );
};

export default NumbersList;
