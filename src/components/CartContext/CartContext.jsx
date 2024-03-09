import { createContext, useState } from "react";

export const CartContext = createContext([]);

export function CartProvider({ children }) {
    const [cart, setCart] = useState([]);

    function addItem(item, quantity) {
        
        const existingItem = cart.find(cartItem => cartItem.categoryId === item.categoryId);
        console.log(existingItem);
        
        if (existingItem) {
            const updatedCart = cart.map(cartItem =>
                cartItem.categoryId === item.categoryId
                    ? { ...cartItem, quantity: cartItem.quantity + quantity }
                    : cartItem
            );
            setCart(updatedCart);
        } else {
            setCart([...cart, { ...item, quantity, price: item.price }]);
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
        return cart.some(item => item.categoyId === itemId);
    }

    return (
        <CartContext.Provider
            value={{ cart, addItem, removeItem, clearCart, isInCart }}
        >
            {children}
        </CartContext.Provider>
    );
}
