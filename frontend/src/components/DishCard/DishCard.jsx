import React from "react"
import './DishCard.css'
// import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartSlice";

const DishCard = ({ dish }) => {
    const dispatch = useDispatch();
    if (!dish) return null;
    // const navigate = useNavigate()
    return(
        <div className="card dish-card" >
        <img src={dish.imageUrl} className="card-img-top" alt={dish.name} />
        <div className="card-body dish-card-body">
           <div className="dish-content">
            <h5 className="card-title">{dish.name}</h5>
            <p className="card-text">{dish.description}</p>
            <span className="price-tag">Rs. {dish.price}</span>
           </div>
            <div className="button1">
            <button className="add-to-cart-btn" 
                onClick = {()=> dispatch(addToCart(dish))}    
            >Add to Cart</button> {/* onClick={() => navigate("/menu")} */}
            </div>
        </div>
        </div>
    )
}

export default DishCard;