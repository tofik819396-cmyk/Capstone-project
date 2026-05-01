import React from "react";
import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import products from "../data/products";
import { useStore } from "../context/StoreContext";
import "../styles/Product.css";

export default function Product() {
  const { id } = useParams();
  const product = products.find(p => p.id === Number(id));
  const { addToCart, toggleWishlist, isInWishlist } = useStore();
  const [quantity, setQuantity] = useState(1);
  const inWishlist = isInWishlist(product?.id);
  const relatedProducts = products.filter(p => p.category === product?.category && p.id !== product.id).slice(0, 3);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    setQuantity(1);
  };

  return (
    <div className="product-detail-container">
      <Link to="/" className="back-link">← Back to Products</Link>
      
      <div className="product-detail">
        <div className="product-image-large">
          {product?.emoji || "📦"}
        </div>

        <div className="product-details-section">
          <h1>{product?.title}</h1>
          <p className="product-category">Category: {product?.category}</p>
          <p className="product-full-description">{product?.description}</p>
          
          <div className="product-specs">
            <h3>Specifications</h3>
            <ul>
              <li>High Quality</li>
              <li>Durable Design</li>
              <li>Fast Shipping Available</li>
              <li>Easy Returns</li>
            </ul>
          </div>

          <div className="pricing-section">
            <h2 className="product-detail-price">₹{product?.price.toLocaleString()}</h2>
            <p className="savings">Save 10% on first order!</p>
          </div>

          <div className="actions-section">
            <div className="quantity-selector">
              <label>Quantity:</label>
              <div className="quantity-input">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="qty-btn"
                >
                  −
                </button>
                <input type="number" value={quantity} min="1" onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))} />
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="qty-btn"
                >
                  +
                </button>
              </div>
            </div>

            <button 
              onClick={handleAddToCart}
              className="btn-product-add-cart"
            >
              🛒 Add {quantity} to Cart
            </button>
            
            <button 
              onClick={() => toggleWishlist(product)}
              className={`btn-product-wishlist ${inWishlist ? 'in-wishlist' : ''}`}
            >
              {inWishlist ? '❤️ In Wishlist' : '🤍 Add to Wishlist'}
            </button>
          </div>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <div className="related-products">
          <h3>Related Products</h3>
          <div className="related-grid">
            {relatedProducts.map(p => (
              <Link key={p.id} to={`/product/${p.id}`} className="related-item">
                <div className="related-image">{p.emoji || "📦"}</div>
                <h4>{p.title}</h4>
                <p>₹{p.price.toLocaleString()}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}