import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import FilterSidebar from "../components/FilterSidebar";
import products from "../data/products";
import "../styles/Home.css";

export default function Home() {
  const [filter, setFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [searchParams] = useSearchParams();
  const navSearch = searchParams.get("search") || "";

  let filteredProducts = [...products];

  // Apply category filter
  if (categoryFilter) {
    filteredProducts = filteredProducts.filter(p => p.category === categoryFilter);
  }

  // Apply price sort
  if (filter === "low") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (filter === "high") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  // Apply search
  if (navSearch) {
    filteredProducts = filteredProducts.filter(p =>
      p.title.toLowerCase().includes(navSearch.toLowerCase()) ||
      p.description.toLowerCase().includes(navSearch.toLowerCase())
    );
  }

  return (
    <div className="home-container">
      <FilterSidebar 
        setFilter={setFilter} 
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
      />

      <div className="products-section">
        <h1>Products</h1>
        {navSearch && <p className="search-result-text">Results for: <strong>{navSearch}</strong></p>}
        
        {filteredProducts.length === 0 ? (
          <p className="no-products">No products found</p>
        ) : (
          <div className="products-grid">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}