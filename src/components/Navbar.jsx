import { Link, useNavigate } from "react-router-dom";
import { useStore } from "../context/StoreContext";
import { useTheme } from "../context/ThemeContext";
import { useState } from "react";
import "../styles/Navbar.css";

 export default function Navbar() {
  const { getCartCount, wishlist } = useStore();
  const { isDark, toggleTheme } = useTheme();
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      navigate(`/?search=${searchInput}`);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">🛍️ ShopHub</Link>
        
        <form className="search-form" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search products..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-btn">Search</button>
        </form>

        <div className="navbar-links">
          <Link to="/" className="nav-link">Shop</Link>
          <Link to="/cart" className="nav-link">
            🛒 Cart {getCartCount() > 0 && <span className="badge">{getCartCount()}</span>}
          </Link>
          <Link to="/wishlist" className="nav-link">
            ❤️ Wishlist {wishlist.length > 0 && <span className="badge">{wishlist.length}</span>}
          </Link>
          <Link to="/profile" className="nav-link">👤 Profile</Link>
          <button onClick={toggleTheme} className="theme-toggle" title={isDark ? "Light Mode" : "Dark Mode"}>
            {isDark ? "☀️" : "🌙"}
          </button>
        </div>
      </div>
    </nav>
  );
}
