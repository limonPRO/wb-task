import React, { createContext, useReducer, useContext, useEffect } from 'react';

// Create the CartContext
const CartContext = createContext();

// Initial cart state
const initialState = {
  items: [],
  totalPrice: 0,
  totalDiscount: 0,
  subTotal: 0,  // Add subTotal to the initial state
};

// Utility function to save cart state to local storage
const saveCartToLocalStorage = (cartState) => {
  localStorage.setItem('cart', JSON.stringify(cartState));
};

// Utility function to load cart state from local storage
const loadCartFromLocalStorage = () => {
  const cart = localStorage.getItem('cart');
  return cart ? JSON.parse(cart) : initialState;
};

// Cart reducer function
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const itemExists = state.items.find(item => item.id === action.payload.id);
      const updatedItems = itemExists
        ? state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [...state.items, { ...action.payload, quantity: 1 }];
      
      const totalPrice = updatedItems.reduce((total, item) => total + item.discount_price * item.quantity, 0);
      const totalDiscount = updatedItems.reduce((total, item) => total + (item.regular_price - item.discount_price) * item.quantity, 0);
      
      const updatedCartState = {
        ...state,
        items: updatedItems,
        totalPrice,
        totalDiscount,
        subTotal: totalPrice - totalDiscount, // Subtotal is now total price - total discount
      };
      
      // Save updated cart state to local storage
      saveCartToLocalStorage(updatedCartState);
      
      return updatedCartState;

    case 'REMOVE_FROM_CART':
      const filteredItems = state.items.filter(item => item.id !== action.payload.id);
      
      const newTotalPrice = filteredItems.reduce((total, item) => total + item.discount_price * item.quantity, 0);
      const newTotalDiscount = filteredItems.reduce((total, item) => total + (item.regular_price - item.discount_price) * item.quantity, 0);
      
      const removedCartState = {
        ...state,
        items: filteredItems,
        totalPrice: newTotalPrice,
        totalDiscount: newTotalDiscount,
        subTotal: newTotalPrice - newTotalDiscount, // Subtotal is now total price - total discount
      };
      
      // Save updated cart state to local storage
      saveCartToLocalStorage(removedCartState);
      
      return removedCartState;

    case 'UPDATE_QUANTITY':
      const updatedQuantityItems = state.items.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );

      const updatedQuantityTotalPrice = updatedQuantityItems.reduce((total, item) => total + item.discount_price * item.quantity, 0);
      const updatedQuantityTotalDiscount = updatedQuantityItems.reduce((total, item) => total + (item.regular_price - item.discount_price) * item.quantity, 0);

      const updatedQuantityState = {
        ...state,
        items: updatedQuantityItems,
        totalPrice: updatedQuantityTotalPrice,
        totalDiscount: updatedQuantityTotalDiscount,
        subTotal: updatedQuantityTotalPrice - updatedQuantityTotalDiscount, // Subtotal is now total price - total discount
      };

      // Save updated cart state to local storage
      saveCartToLocalStorage(updatedQuantityState);

      return updatedQuantityState;

    case 'CLEAR_CART':
        // Reset the cart to its initial state
        saveCartToLocalStorage(initialState);
        return initialState;

    default:
      return state;
  }
};

// CartProvider component to wrap around the parts of the app where the cart is needed
export const CartProvider = ({ children }) => {
  // Load the initial state from local storage if it exists, otherwise use the default initialState
  const [state, dispatch] = useReducer(cartReducer, loadCartFromLocalStorage());

  // Save the cart to local storage on state changes (to keep it in sync)
  useEffect(() => {
    saveCartToLocalStorage(state);
  }, [state]);

  const addToCart = (item) => {
    dispatch({ type: 'ADD_TO_CART', payload: item });
  };

  const removeFromCart = (id) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: { id } });
  };

  const updateQuantity = (id, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <CartContext.Provider value={{ ...state, addToCart, removeFromCart, updateQuantity ,clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use cart context
export const useCart = () => {
  return useContext(CartContext);
};
