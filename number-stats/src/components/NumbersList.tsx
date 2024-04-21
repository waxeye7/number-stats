import React, { useEffect, useState } from "react";
import NumberInput from "./NumberInput";
import "../theme/numberListStyles.css";

interface NumberData {
  _id: string;
  number: number;
  date: string;
}

interface NumbersListProps {
  addNumberToList: (number: NumberData) => void;
}

const NumbersList: React.FC<NumbersListProps> = ({ addNumberToList }) => {
  const [numbers, setNumbers] = useState<NumberData[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState<string>("all");
  const [isNumberEntered, setIsNumberEntered] = useState<boolean>(false);
  const [average, setAverage] = useState<number>(0);
  const [recentAdditions, setRecentAdditions] = useState<NumberData[]>([]);
  const [modeNumber, setModeNumber] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const calculateStats = () => {
    // Filter numbers based on selected period
    const filteredNumbers = numbers.filter(filterNumbersByPeriod);

    // Calculate average number
    const sum = filteredNumbers.reduce((acc, num) => acc + num.number, 0);
    const average =
      filteredNumbers.length > 0 ? sum / filteredNumbers.length : 0;
    setAverage(average);

    // Get recent additions (assuming numbers have a `date` property)
    const sortedNumbers = filteredNumbers.sort((a, b) => {
      const dateA = a.date ? new Date(a.date) : new Date(0); // Use default value if a.date is null or undefined
      const dateB = b.date ? new Date(b.date) : new Date(0); // Use default value if b.date is null or undefined
      return dateB.getTime() - dateA.getTime();
    });
    const recentAdditions = sortedNumbers.slice(0, 5);
    setRecentAdditions(recentAdditions);

    // Calculate mode number (most frequent number)
    const numberCounts: { [key: number]: number } = {};
    let maxCount = 0;
    let modeNumber: number | null = null;

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
      const response = await fetch(`http://localhost:5000/numbers`);
      const data: NumberData[] = await response.json();
      setNumbers(data);
    } catch (error) {
      console.error("Error fetching numbers:", error);
    }
  };

  const addNumberToListHandler = (number: NumberData) => {
    setIsNumberEntered(true);
    addNumberToList(number);
  };

  const handlePeriodChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPeriod(event.target.value);
  };

  const filterNumbersByPeriod = (number: NumberData) => {
    const currentDate = new Date();
    const numberDate = new Date(number.date);
    const timeDiff = currentDate.getTime() - numberDate.getTime();
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
        <NumberInput addNumberToList={addNumberToListHandler} />
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
