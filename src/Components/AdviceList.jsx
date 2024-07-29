import React, { useState, useEffect } from "react";

const AdviceList = () => {
  const [adviceList, setAdviceList] = useState([]);
  const [numberOfAdvice, setNumberOfAdvice] = useState(5);
  const [loading, setLoading] = useState(false);

  const fetchAdvice = async (count) => {
    setLoading(true);
    try {
      const responses = await Promise.all(
        Array.from({ length: count }, () =>
          fetch("https://api.adviceslip.com/advice").then((response) =>
            response.json()
          )
        )
      );
      const adviceData = responses.map((response) => response.slip.advice);
      setAdviceList(adviceData);
    } catch (error) {
      console.error("Error fetching advice:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdvice(numberOfAdvice);
  }, [numberOfAdvice]);

  const handleNumberChange = (event) => {
    const value = parseInt(event.target.value, 10);
    if (value > 0) {
      setNumberOfAdvice(value);
    }
  };

  return (
    <div>
      <h1>Random Advice</h1>
      <label>
        Number of advice pieces:
        <input
          type="number"
          value={numberOfAdvice}
          onChange={handleNumberChange}
          min="1"
        />
      </label>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {adviceList.map((advice, index) => (
            <li key={index}>{advice}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdviceList;
