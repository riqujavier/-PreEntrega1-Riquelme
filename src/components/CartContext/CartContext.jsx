import { createContext, useState } from "react";

export const CartContext = createContext([]);

export function CartProvider({ children }) {
    const [cart, setCart] = useState([]);

    function addItem(item, quantity) {
        const existingItem = cart.find(cartItem => cartItem.id === item.id);

        
        if (existingItem) {
            const updatedCart = cart.map(cartItem =>
                cartItem.id === item.id
                    ? { ...cartItem, quantity: cartItem.quantity + quantity }
                    : cartItem
            );
            setCart(updatedCart);
        } else {
            setCart([...cart, { ...item, quantity, price: item.price }]);
        }
    }

    function removeItem(itemId) {
        const updatedCart = cart.filter(item => item.id !== itemId);
        setCart(updatedCart);
    }

    function clearCart() {
        setCart([]);
    }

    function isInCart(itemId) {
        return cart.some(item => item.id === itemId);
    }

    return (
        <CartContext.Provider
            value={{ cart, addItem, removeItem, clearCart, isInCart }}
        >
            {children}
        </CartContext.Provider>
    );
}
