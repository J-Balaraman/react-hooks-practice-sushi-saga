import React, { useState } from "react";

function Sushi({ sush, onSushiClick }) {
  const { id, name, img_url, price, created_at } = sush;
  const [isEaten, setIsEaten] = useState(false);

  const handleSushiClick = () => {
    if (!isEaten) {
      onSushiClick();
      setIsEaten(true);
    }
  };

  return (
    <div className="sushi">
      <div className={`plate ${isEaten ? "eaten" : ""}`} onClick={handleSushiClick}>
        {isEaten ? null : (
          <img src={img_url} alt={`${name} Sushi`} width="100%" />
        )}
      </div>
      <h4 className="sushi-details">
        {name} - ${price}
      </h4>
    </div>
  );
}

export default Sushi;
