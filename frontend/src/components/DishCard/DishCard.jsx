import React from "react"
import './DishCard.css'
// import { useNavigate } from "react-router-dom";
import { config } from '../../services/config';
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartSlice";

const DishCard = ({ dish }) => {
    const dispatch = useDispatch();
    if (!dish) return null;
    // const navigate = useNavigate()
    return(
        <div className="card dish-card" style={{ width: "18rem "}}>
        <img src={`${config.server}${dish.imageUrl}`} className="card-img-top" alt={dish.name} />
        <div className="card-body dish-card-body">
            <h5 className="card-title">{dish.name}</h5>
            <p className="card-text">{dish.description}</p>
            <span className="price-tag">Rs. {dish.price}</span>
            <div className="button1">
            <button className="btn1 mt-4" 
                onClick = {()=> dispatch(addToCart(dish))}    
            >Add to Cart</button> {/* onClick={() => navigate("/menu")} */}
            </div>
        </div>
        </div>
    )
}

export default DishCard;