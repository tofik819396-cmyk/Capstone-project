import { useStore } from "../context/StoreContext";
import { Link } from "react-router-dom";
import "../styles/Wishlist.css";

export default function Wishlist() {
  const { wishlist, toggleWishlist, addToCart } = useStore();

  if (wishlist.length === 0) {
    return (
      <div className="wishlist-container">
        <h2>My Wishlist</h2>
        <div className="empty-wishlist">
          <p>Your wishlist is empty</p>
          <Link to="/" className="btn-continue-shopping">Start Shopping</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="wishlist-container">
      <h2>My Wishlist ({wishlist.length} items)</h2>
      
      <div className="wishlist-grid">
        {wishlist.map(item => (
          <div key={item.id} className="wishlist-item">
            <div className="wishlist-image-placeholder">{item.emoji || "📦"}</div>
            
            <Link to={`/product/${item.id}`} className="wishlist-title">
              {item.title}
            </Link>
            
            <p className="wishlist-description">{item.description}</p>
            <p className="wishlist-price">₹{item.price.toLocaleString()}</p>

            <div className="wishlist-actions">
              <button 
                onClick={() => addToCart(item)}
                className="btn-add-to-cart-small"
              >
                Add to Cart
              </button>
              <button 
                onClick={() => toggleWishlist(item)}
                className="btn-remove-wishlist"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}