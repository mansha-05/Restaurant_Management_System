import DishCard from '../DishCard/DishCard'
import './PopularDishes.css'
import { config } from '../../services/config';
import React, { useEffect, useState } from "react";
import axios from "axios";

const PopularDishes = () => {
//   const [dishes, setDishes] = useState([]);
     const [popularDishes, setPopularDishes] = useState([]);
  useEffect(() => {
    axios.get(`${config.server}/menu/popular`)
      .then(res => {
        // Map backend response to match DishCard
        const mappedDishes = res.data.map(d => ({
          ...d,
          name: d.itemName,       // map item_name → name
          description: d.description || "",  // keep description
        }));
        setPopularDishes(mappedDishes);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="popular-dishes">
      <div className="top">
            <div className="pill-tag-container">
            <div className="pill-tag" style={{justifyItems: "center"}}>Customer Favorites</div>
            </div>
            <h2 className='heading'>Popular Dishes</h2>
            <p className='p1'>Discover our most loved dishes, handpicked by our customers</p>
            <div className="popular-container">
                <div className="dish-grid">
                {popularDishes.map(dish => (
                <DishCard key={dish.menuId} dish={dish} />
                ))}
            </div>
      </div>
    </div>
    </div>
  );
};

export default PopularDishes;


// function PopularDishes(){
//   const navigate = useNavigate()
//     return(
//         <div className="top">
//             <div className="pill-tag-container">
//             <div className="pill-tag" style={{justifyItems: "center"}}>Customer Favorites</div>
//             </div>
//             <h2 className='heading'>Popular Dishes</h2>
//             <p className='p1'>Discover our most loved dishes, handpicked by our customers</p>
//             <div className="popular-container">
//             {dishes.map((dish,index) => (
//                 <DishCard
//                 key={index}
//                 title={dish.title}
//                 price={dish.price}
//                 description={dish.description}
//                 image={dish.image}
//                 />
//             ))}
//             </div>
//             <div className="view-menu-container">
//   <button className="view-menu-btn"  onClick={()=> navigate("menu")}>View Full Menu</button>
// </div>

//         </div>
//     )
// }

// export default PopularDishes;