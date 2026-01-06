import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    // Load cart from local storage could be added here similar to Auth

    const addToCart = (item, restaurantId) => {
        setCart((prevCart) => {
            // Check if adding from a different restaurant
            if (prevCart.length > 0 && prevCart[0].restaurantId !== restaurantId) {
                if (!window.confirm("Start a new basket? adding items from a new restaurant will clear your current basket.")) {
                    return prevCart;
                }
                return [{ ...item, quantity: 1, restaurantId }];
            }

            const existingItem = prevCart.find((i) => i.id === item.id);
            if (existingItem) {
                return prevCart.map((i) =>
                    i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
                );
            }
            return [...prevCart, { ...item, quantity: 1, restaurantId }];
        });
    };

    const removeFromCart = (itemId) => {
        setCart((prev) => prev.filter((item) => item.id !== itemId));
    };

    const updateQuantity = (itemId, delta) => {
        setCart((prev) =>
            prev.map(item => {
                if (item.id === itemId) {
                    return { ...item, quantity: Math.max(0, item.quantity + delta) }
                }
                return item;
            }).filter(item => item.quantity > 0)
        );
    };

    const clearCart = () => setCart([]);

    const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

    const value = {
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartCount
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};
