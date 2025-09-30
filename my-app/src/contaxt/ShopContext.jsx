import React, { createContext, useContext, useEffect, useState } from "react";

import axios from "axios";
import { userDataContext } from "./UserContext.jsx";
import { authDataContext } from "./AuthContext.jsx";

export const shopDataContext = createContext();

function ShopContext({ children }) {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItem, setCartItem] = useState({});

  const { serverUrl } = useContext(authDataContext);
  const { userData } = useContext(userDataContext);

  const currency = "Rs";
  const delivery_fee = 50;

  // ✅ Fetch all products
  const getProducts = async () => {
    try {
      const result = await axios.get(serverUrl + "/api/product/list");
      console.log("✅ Products fetched:", result.data);
      setProducts(result.data);
    } catch (error) {
      console.error("❌ Error fetching products:", error.response?.data || error.message);
    }
  };

  // ✅ Add to cart
  const addToCart = async (itemId, size) => {
    if (!size) {
      console.error("❌ Select Product Size");
      return;
    }

    const cartData = structuredClone(cartItem);
    if (cartData[itemId]) {
      cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;
    } else {
      cartData[itemId] = { [size]: 1 };
    }

    setCartItem(cartData);

    if (userData) {
      try {
        const result = await axios.post(
          serverUrl + "/api/cart/add",
          { itemId, size },
          { withCredentials: true }
        );
        console.log("✅ Cart updated:", result.data);
      } catch (error) {
        console.error("❌ Error adding to cart:", error.response?.data || error.message);
      }
    } else {
      console.error("❌ User not logged in. Cannot add to cart.");
    }
  };

  // ✅ Get user's cart from backend
  const getUserCart = async () => {
    try {
      const result = await axios.post(serverUrl + "/api/cart/get", {}, { withCredentials: true });
      setCartItem(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  // ✅ Update quantity in cart
  const updateQuantity = async (itemId, size, quantity) => {
    const cartData = structuredClone(cartItem);
    cartData[itemId][size] = quantity;
    setCartItem(cartData);

    if (userData) {
      try {
        await axios.post(
          serverUrl + "/api/cart/update",
          { itemId, size, quantity },
          { withCredentials: true }
        );
      } catch (error) {
        console.log(error);
      }
    }
  };

  // ✅ Count total items in cart
  const getCartCount = () => {
    let totalCount = 0;
    for (const productId in cartItem) {
      for (const size in cartItem[productId]) {
        totalCount += cartItem[productId][size];
      }
    }
    return totalCount;
  };

  // ✅ Calculate total cart amount
  const getCartAmount = () => {
    let totalAmount = 0;
    for (const productId in cartItem) {
      const itemInfo = products.find((p) => p._id === productId);
      if (!itemInfo) continue;

      for (const size in cartItem[productId]) {
        const quantity = cartItem[productId][size];
        if (quantity > 0) {
          totalAmount += itemInfo.price * quantity;
        }
      }
    }
    return totalAmount;
  };

  // ✅ Fetch products once on mount
  useEffect(() => {
    getProducts();
  }, []);

  // ✅ Fetch cart once on mount
  useEffect(() => {
    getUserCart();
  }, []);

  const value = {
    products,
    currency,
    delivery_fee,
    getProducts,
    showSearch,
    setShowSearch,
    search,
    setSearch,
    cartItem,
    setCartItem,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
  };

  return (
    <shopDataContext.Provider value={value}>
      {children}
    </shopDataContext.Provider>
  );
}

export default ShopContext;
