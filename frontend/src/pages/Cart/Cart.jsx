import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart, removeFromCart } from "../../redux/cartSlice";
import "./Cart.css";
import React from "react";
import { config } from "../../services/config";

const Cart = () => {
  const navigate = useNavigate();  
  const dispatch = useDispatch();
  const { items, totalAmount, totalQuantity } = useSelector(
    (state) => state.cart
  );

  const tax = totalAmount * 0.1;
  const grandTotal = totalAmount + tax;

  if (items.length === 0) {
    return <h2 style={{ textAlign: "center" }}>Your cart is empty 🛒</h2>;
  }

  return (
    <div className="cart-page">
      {/* <h1>Shopping Cart</h1> */}
      <h1>Shopping Cart ({totalQuantity} items)</h1>

      <p>Review your items before checkout</p>

      <div className="cart-layout">
        {/* LEFT SIDE — CART ITEMS */}
        <div className="cart-items">
          {items.map((item) => {
            console.log("IMAGE URL 👉", `${config.server}${item.imageUrl}`);
            console.log("RAW imageUrl 👉", item.imageUrl);
            return(<div className="cart-item-card" key={item.id}>

              <img
                src={`${config.server}${item.imageUrl}`}
                alt={item.name}
                className="cart-item-img"
                />

              <div className="cart-item-info">
                <h3>{item.name}</h3>
                <span className="category-tag">{item.categoryName}</span>
                <p className="desc">{item.description}</p>

                <div className="quantity-control">
                  <button onClick={() => dispatch(removeFromCart(item.id))}>
                    −
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => dispatch(addToCart(item))}>+</button>
                </div>
              </div>

              <div className="cart-item-price">
                ₹ {item.totalPrice.toFixed(2)}
              </div>
            </div>);
            })}
        </div>

        {/* RIGHT SIDE — ORDER SUMMARY */}
        <div className="order-summary">
          <h2>Order Summary</h2>

          <div className="summary-row">
            <span>Subtotal</span>
            <span>₹ {totalAmount.toFixed(2)}</span>
          </div>

          <div className="summary-row">
            <span>Tax (10%)</span>
            <span>₹ {tax.toFixed(2)}</span>
          </div>

          <hr />

          <div className="summary-row total">
            <span>Total</span>
            <span>₹ {grandTotal.toFixed(2)}</span>
          </div>

          <button
            className="checkout-btn"
            disabled={totalQuantity === 0}
            onClick={() => navigate("/checkout")}
            >
            Proceed to Checkout →
            </button>


        </div>
      </div>
    </div>
  );
};

export default Cart;

// const Cart = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { items, totalAmount, totalQuantity } = useSelector(
//     (state) => state.cart
//   );

//   const handleCheckout = () => {
//     if (totalQuantity === 0) {
//       alert("Your cart is empty");
//       return;
//     }

//     // NEXT PHASE
//     // 1. Check login
//     // 2. Check table reservation
//     navigate("/checkout");
//   };

//   if (items.length === 0) {
//     return (
//       <div style={{ padding: "2rem", textAlign: "center" }}>
//         <h2>Your cart is empty 🛒</h2>
//         <button onClick={() => navigate("/")}>Go to Menu</button>
//       </div>
//     );
//   }

//   return (
//     <div style={{ padding: "2rem", maxWidth: "900px", margin: "auto" }}>
//       <h2>Your Cart</h2>

//       {items.map((item) => (
//         <div
//           key={item.id}
//           style={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             borderBottom: "1px solid #ddd",
//             padding: "1rem 0"
//           }}
//         >
//           <div>
//             <h4>{item.name}</h4>
//             <p>₹ {item.price} x {item.quantity}</p>
//           </div>

//           <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
//             <button onClick={() => dispatch(removeFromCart(item.id))}>−</button>
//             <span>{item.quantity}</span>
//             <button onClick={() => dispatch(addToCart(item))}>+</button>
//           </div>

//           <div>
//             <strong>₹ {item.totalPrice}</strong>
//           </div>
//         </div>
//       ))}

//       <div style={{ marginTop: "2rem", textAlign: "right" }}>
//         <h3>Total Items: {totalQuantity}</h3>
//         <h2>Total Amount: ₹ {totalAmount}</h2>

//         <div style={{ marginTop: "1rem" }}>
//           <button
//             onClick={() => dispatch(clearCart())}
//             style={{ marginRight: "10px" }}
//           >
//             Clear Cart
//           </button>

//           <button onClick={handleCheckout}>
//             Proceed to Checkout
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Cart;

