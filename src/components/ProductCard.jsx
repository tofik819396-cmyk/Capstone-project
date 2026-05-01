import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useStore } from "../context/StoreContext";
import "../styles/ProductCard.css";
import { i } from "framer-motion/client";

export default function ProductCard({ product }) {
  const { addToCart, toggleWishlist, isInWishlist } = useStore();
  const inWishlist = isInWishlist(product.id);

  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`} className="product-image-link">
        <div className="product-image-placeholder">{product.emoji || "📦"}</div>
      </Link>
      
      <div className="product-info">
        <Link to={`/product/${product.id}`} className="product-title-link">
          <h3>{product.title}</h3>
        </Link>
        <p className="product-description">{product.description}</p>
        <p className="product-price">₹{product.price.toLocaleString()}</p>

        <div className="product-actions">
          <button 
            onClick={() => addToCart(product)}
            className="btn-add-to-cart"
          >
            🛒 Add to Cart
          </button>
          <button 
            onClick={() => toggleWishlist(product)}
            className={`btn-wishlist ${inWishlist ? 'in-wishlist' : ''}`}
          >
            {inWishlist ? '❤️' : '🤍'}
          </button>
        </div>
      </div>
    </div>
  );
}