import { createContext, useContext, useState, useEffect } from "react";

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [notification, setNotification] = useState(null);
  const [user, setUser] = useState({ name: "John Doe", email: "john@example.com", phone: "+1234567890" });

  // Load from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    const savedWishlist = localStorage.getItem("wishlist");
    if (savedCart) setCart(JSON.parse(savedCart));
    if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
  }, []);

  // Save to localStorage when cart changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
      ));
      showNotification(`${product.title} quantity updated`);
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
      showNotification(`${product.title} added to cart`);
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
    showNotification("Item removed from cart");
  };

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id);
    } else {
      setCart(cart.map(item => item.id === id ? { ...item, quantity } : item));
    }
  };

  const clearCart = () => {
    setCart([]);
    showNotification("Cart cleared");
  };

  const toggleWishlist = (product) => {
    const exists = wishlist.find(item => item.id === product.id);
    if (exists) {
      setWishlist(wishlist.filter(item => item.id !== product.id));
      showNotification(`${product.title} removed from wishlist`);
    } else {
      setWishlist([...wishlist, product]);
      showNotification(`${product.title} added to wishlist`);
    }
  };

  const isInWishlist = (productId) => wishlist.some(item => item.id === productId);

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);
  };

  const getCartCount = () => {
    return cart.reduce((count, item) => count + (item.quantity || 1), 0);
  };

  return (
    <StoreContext.Provider value={{
      cart, wishlist, notification, user,
      addToCart, removeFromCart, updateQuantity, clearCart,
      toggleWishlist, isInWishlist,
      getCartTotal, getCartCount,
      setUser, showNotification
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);