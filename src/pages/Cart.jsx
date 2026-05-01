import { useStore } from "../context/StoreContext";
import { Link } from "react-router-dom";
import "../styles/Cart.css";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } = useStore();

  if (cart.length === 0) {
    return (
      <div className="cart-container">
        <h2>Shopping Cart</h2>
        <div className="empty-cart">
          <p>Your cart is empty</p>
          <Link to="/" className="btn-continue-shopping">Continue Shopping</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2>Shopping Cart ({cart.length} items)</h2>
      
      <div className="cart-content">
        <div className="cart-items">
          {cart.map(item => (
            <div key={item.id} className="cart-item">
              <div className="cart-item-image">{item.emoji || "📦"}</div>
              
              <div className="cart-item-details">
                <Link to={`/product/${item.id}`} className="item-title">
                  {item.title}
                </Link>
                <p className="item-description">{item.description}</p>
                <p className="item-price">₹{item.price.toLocaleString()}</p>
              </div>

              <div className="cart-item-controls">
                <div className="quantity-control">
                  <button 
                    onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)}
                    className="qty-btn"
                  >
                    −
                  </button>
                  <span className="quantity">{item.quantity || 1}</span>
                  <button 
                    onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
                    className="qty-btn"
                  >
                    +
                  </button>
                </div>
                <p className="item-total">
                  ₹{(item.price * (item.quantity || 1)).toLocaleString()}
                </p>
              </div>

              <button 
                onClick={() => removeFromCart(item.id)}
                className="btn-remove"
                title="Remove from cart"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h3>Order Summary</h3>
          <div className="summary-row">
            <span>Subtotal:</span>
            <span>₹{getCartTotal().toLocaleString()}</span>
          </div>
          <div className="summary-row">
            <span>Shipping:</span>
            <span className="free">FREE</span>
          </div>
          <div className="summary-row">
            <span>Tax:</span>
            <span>₹{Math.round(getCartTotal() * 0.18).toLocaleString()}</span>
          </div>
          <div className="summary-row total">
            <span>Total:</span>
            <span>₹{Math.round(getCartTotal() * 1.18).toLocaleString()}</span>
          </div>
          
          <Link to="/checkout" className="btn-checkout">
            Proceed to Checkout
          </Link>
          <button onClick={clearCart} className="btn-clear-cart">
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
}