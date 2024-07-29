import { useState, useEffect } from "react";

const RandomAdvice = () => {
  const [adviceList, setAdviceList] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUniqueAdvice = async (existingAdvice) => {
    try {
      let isUnique = false;
      let advice = "";

      while (!isUnique) {
        const response = await fetch(
          `https://api.adviceslip.com/advice?timestamp=${new Date().getTime()}`
        );
        const data = await response.json();
        advice = data.slip.advice;

        if (!existingAdvice.includes(advice)) {
          isUnique = true;
        }
      }

      return advice;
    } catch (error) {
      console.error("Error fetching advice:", error);
    }
  };

  const fetchAdvice = async (count) => {
    setLoading(true);
    const adviceSet = new Set();

    try {
      while (adviceSet.size < count) {
        const advice = await fetchUniqueAdvice(Array.from(adviceSet));
        adviceSet.add(advice);
      }

      setAdviceList(Array.from(adviceSet));
    } catch (error) {
      console.error("Error fetching advice:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdvice(5);
  }, []);

  return (
    <div>
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

export default RandomAdvice;
