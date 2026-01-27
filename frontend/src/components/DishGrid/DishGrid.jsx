import React from "react";
import DishCard from "../DishCard/DishCard";
import "./DishGrid.css";

const DishGrid = ({ dishes }) => {
  if (dishes.length === 0) {
    return <p>No dishes found.</p>;
  }

  return (
    <div className="dish-grid">
      {dishes
        .filter(dish => dish && dish.imageUrl)
        .map(dish => (
          <DishCard key={dish.id} dish={dish} />
      ))}
    </div>
  );
};

export default DishGrid;