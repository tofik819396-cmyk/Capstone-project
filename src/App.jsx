import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StoreProvider, useStore } from "./context/StoreContext";
import { ThemeProvider } from "./context/ThemeContext";
import Navbar from "./components/Navbar";
import Notification from "./components/Notification";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Wishlist from "./pages/Wishlist";
import Profile from "./pages/Profile";
import Products from "./data/products";
import "./App.css";

function AppContent() {
  const { notification } = useStore();

  return (
    <>
      {notification && <Notification message={notification.message} type={notification.type} />}
      <Navbar />
      <main style={{ minHeight: "calc(100vh - 80px)", padding: "20px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/products" element={<Products />} />
        </Routes>
      </main>
    </>
  );
}

function App() {
  return (
    <>
    <BrowserRouter>
      <ThemeProvider>
        <StoreProvider>
          <AppContent />
        </StoreProvider>
      </ThemeProvider>
    </BrowserRouter>
    
    </>
    
  );
}

export default App;