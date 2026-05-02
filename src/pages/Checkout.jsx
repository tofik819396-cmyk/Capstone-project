import { useState } from "react";
import { useStore } from "../context/StoreContext";
import { useNavigate } from "react-router-dom";
import "../styles/Checkout.css";

export default function Checkout() {
  const { cart, getCartTotal, clearCart, showNotification } = useStore();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    zipCode: "",
    cardNumber: "",
    cardName: "",
    cardExpiry: "",
    cardCVV: ""
  });
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.address) {
      showNotification("Please fill all required fields", "error");
      return;
    }

    if (!formData.cardNumber || !formData.cardExpiry || !formData.cardCVV) {
      showNotification("Please enter valid payment details", "error");
      return;
    }

    setOrderPlaced(true);
    setOrderId(Math.floor(Math.random() * 1000000));
    showNotification("Order placed successfully!", "success");
    
    setTimeout(() => {
      clearCart();
      navigate("/");
    }, 2000);
  };

  if (cart.length === 0 && !orderPlaced) {
    return (
      <div className="checkout-empty">
        <h2>Your cart is empty</h2>
        <p>Add items before checkout</p>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="checkout-success">
        <div className="success-message">
          <h2>✓ Order Placed Successfully!</h2>
          <p>Thank you for your purchase.</p>
          <p>Order ID: #ORD{orderId}</p>
          <p>Redirecting to home...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <div className="checkout-content">
        <div className="checkout-form-section">
          <h2>Checkout</h2>
          
          <form onSubmit={handleSubmit} className="checkout-form">
            <div className="form-section">
              <h3>Shipping Information</h3>
              <div className="form-row">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name *"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name *"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <input
                type="email"
                name="email"
                placeholder="Email Address *"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              
              <input
                type="text"
                name="address"
                placeholder="Street Address *"
                value={formData.address}
                onChange={handleInputChange}
                required
              />
              
              <div className="form-row">
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  name="zipCode"
                  placeholder="ZIP Code"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="form-section">
              <h3>Payment Information</h3>
              <input
                type="text"
                name="cardName"
                placeholder="Cardholder Name"
                value={formData.cardName}
                onChange={handleInputChange}
              />
              
              <input
                type="text"
                name="cardNumber"
                placeholder="Card Number (16 digits)"
                value={formData.cardNumber}
                onChange={handleInputChange}
                maxLength="16"
              />
              
              <div className="form-row">
                <input
                  type="text"
                  name="cardExpiry"
                  placeholder="MM/YY"
                  value={formData.cardExpiry}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  name="cardCVV"
                  placeholder="CVV"
                  value={formData.cardCVV}
                  onChange={handleInputChange}
                  maxLength="3"
                />
              </div>
            </div>

            <button type="submit" className="btn-place-order">
              Place Order
            </button>
          </form>
        </div>

        <div className="checkout-summary">
          <h3>Order Summary</h3>
          
          <div className="summary-items">
            {cart.map(item => (
              <div key={item.id} className="summary-item">
                <div>
                  <p>{item.title}</p>
                  <small>Qty: {item.quantity || 1}</small>
                </div>
                <p>₹{(item.price * (item.quantity || 1)).toLocaleString()}</p>
              </div>
            ))}
          </div>

          <div className="summary-details">
            <div className="detail-row">
              <span>Subtotal:</span>
              <span>₹{getCartTotal().toLocaleString()}</span>
            </div>
            <div className="detail-row">
              <span>Shipping:</span>
              <span className="free">FREE</span>
            </div>
            <div className="detail-row">
              <span>Tax (18%):</span>
              <span>₹{Math.round(getCartTotal() * 0.18).toLocaleString()}</span>
            </div>
            <div className="detail-row total">
              <span>Total:</span>
              <span>₹{Math.round(getCartTotal() * 1.18).toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}