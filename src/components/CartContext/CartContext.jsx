import { createContext, useState, useEffect } from "react";

export const CartContext = createContext([]);

export function CartProvider({ children }) {
    const [cart, setCart] = useState(() => {
        const savedCart = sessionStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    useEffect(() => {
        sessionStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    function addItem(item, quantity) {
        const existingItemIndex = cart.findIndex(cartItem => cartItem.categoryId === item.categoryId);
        
        if (existingItemIndex !== -1) {
            const updatedCart = [...cart];
            updatedCart[existingItemIndex] = { ...updatedCart[existingItemIndex], quantity: updatedCart[existingItemIndex].quantity + quantity };
            setCart(updatedCart);
        } else {
            const updatedCart = [...cart, { ...item, quantity, price: item.price }];
            setCart(updatedCart);
        }
    }
    
    

    function removeItem(itemId) {
        const updatedCart = cart.filter(item => item.categoryId !== itemId);
        setCart(updatedCart);
    }

    function clearCart() {
        setCart([]);
    }

    function isInCart(itemId) {
        return cart.some(item => item.categoryId === itemId);
    }

    return (
        <CartContext.Provider
            value={{ cart, addItem, removeItem, clearCart, isInCart }}
        >
            {children}
        </CartContext.Provider>
    );
}

