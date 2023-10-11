import React, { useState, useEffect } from "react";
import MoreButton from "./MoreButton";
import Sushi from "./Sushi";
import Table from "./Table";

function SushiContainer(props) {
  const [sushi, setSushi] = useState([]);
  const [visibleSushiIndex, setVisibleSushiIndex] = useState(0);
  const [eatenSushi, setEatenSushi] = useState([]);
  const [emptyPlates, setEmptyPlates] = useState([]);
  const [budget, setBudget] = useState(100); // Set an initial budget.

  useEffect(() => {
    fetch("http://localhost:3001/sushis")
      .then((res) => res.json())
      .then((data) => {
        setSushi(data);
      });
  }, []);

  const handleSushiClick = (sush) => {
    if (budget >= sush.price) {
      // Deduct the price from the budget.
      setBudget(budget - sush.price);

      // Add the sushi to the eatenSushi array.
      setEatenSushi([...eatenSushi, sush]);

      // Add an empty plate to the table.
      setEmptyPlates([...emptyPlates, {}]);
    } else {
      alert("You don't have enough money to eat this sushi!");
    }
  };

  const loadMoreSushi = () => {
    const newIndex = visibleSushiIndex + 4;
    setVisibleSushiIndex(newIndex);
  };

  return (
    <div >
      <div className="belt" >
      {sushi.slice(visibleSushiIndex, visibleSushiIndex + 4).map((sush) => (
        <Sushi
          key={sush.id}
          sush={sush}
          onSushiClick={() => handleSushiClick(sush)}
        />
      ))}
      <MoreButton getNextSushiSet={loadMoreSushi} />
      
      </div>
      <div>
      <Table plates={emptyPlates} budget={budget} />
      </div>
    </div>
  );
}

export default SushiContainer;
