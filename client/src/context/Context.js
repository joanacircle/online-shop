import { createContext, useState } from 'react';
import { PRODUCTS } from '../Products';

export const ShopContext = createContext(null);
export const LoginContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};
  for (let i = 1; i < PRODUCTS.length + 1; i++) {
    cart[i] = 0;
  }
  return cart;
  // cart = {1: 0, 2: 0, 3: 0 ...}
};

// export const ShopContextProvider = (props) => {
export const MainContextProvider = (props) => {
  const [loginStatus, setLoginStatus] = useState(false);
  const [cartItems, setCartItems] = useState(getDefaultCart());

  const updateLoginStatus = () =>{
    setLoginStatus(true);
    return loginStatus;
  };

  const getTotalCartAmount = () =>{
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        // Find the product data corresponding to the given ID.
        let itemInfo = PRODUCTS.find((product) => product.id === Number(item));
        // Retrieve the price information of the product and calculate the total amount.
        totalAmount += cartItems[item] * itemInfo.price;
      }
    }
    return totalAmount;
  };

  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };

  const updateCartItemCount = (newAmount, itemId) => { 
    setCartItems((prev) => ({ ...prev, [itemId]: newAmount }));
  };

  const checkout = () => {
    setCartItems(getDefaultCart());
  };

  const contextValue = { 
    loginStatus,
    updateLoginStatus,
    cartItems, 
    getTotalCartAmount,
    addToCart,
    removeFromCart,
    updateCartItemCount, 
    checkout,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      <LoginContext.Provider value={contextValue}>
        {props.children}
      </LoginContext.Provider>
    </ShopContext.Provider>
  );
};