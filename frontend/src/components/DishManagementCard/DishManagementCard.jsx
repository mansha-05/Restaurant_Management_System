import React from "react";
import "./DishManagementCard.css";
import { toggleMenuStatus } from "../../services/menu";
import { toast } from "react-toastify";

const DishManagementCard = ({ dish, openEditForm, fetchMenu }) => {
  if (!dish) return null;

    const handleToggleStatus = async () => {
    try {
        await toggleMenuStatus(dish.id);

        toast.success(
        dish.status === "ENABLED"
            ? "Dish disabled"
            : "Dish enabled"
        );

        fetchMenu();
    } catch (err) {
        toast.error("Failed to update dish status");
        console.error(err);
    }
    };


  return (
    <div className="card dish-card">
      <img
        src={dish.imageUrl}
        className="card-img-top"
        alt={dish.item_name}
      />

      <div className="card-body dish-card-body">
        <h5 className="card-title">{dish.item_name}</h5>
        <p className="card-text">{dish.description}</p>
        <span className="price-tag">₹ {dish.price}</span>
        <p className="category-text">{dish.categoryName}</p>

        <div className="dish-actions">
          <button className="btn1" onClick={() => openEditForm(dish)}>
            Edit
          </button>

          <button
            className={`btn1 ${dish.status === "ENABLED" ? "disable" : "enable"}`}
            onClick={handleToggleStatus}
          >
            {dish.status === "ENABLED" ? "Disable" : "Enable"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DishManagementCard;
