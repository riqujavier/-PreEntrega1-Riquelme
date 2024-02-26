import { useState, useContext } from 'react';
import { MdOutlineShoppingCart } from "react-icons/md";
import { CartContext } from '../CartContext/CartContext';

const CartWidget = () => {
    const [showCart, setShowCart] = useState(false);
    const { cart, clearCart } = useContext(CartContext);

    const toggleCart = () => {
        setShowCart(!showCart);
    };

    return (
        <div style={{ position: 'relative' }}>
            <button onClick={toggleCart} style={{ position: 'relative', zIndex: 1 }}>
                <MdOutlineShoppingCart />
            </button>
            {showCart && (
                <div style={{ 
                    position: 'absolute', 
                    top: '50px', 
                    right: '0', 
                    backgroundColor: '#f0f0f0', 
                    padding: '10px', 
                    minWidth: '300px',
                    borderRadius: '10px',
                    border: '1px solid #ccc',
                    zIndex: 2  
                }}>
                    <h4>Carrito de compras</h4>
                    {cart.length > 0 ? (
                        <ul>
                            {cart.map(item => (
                                <li key={item.id}>
                                    {item.title} - Precio: $10- Cantidad: {item.quantity}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>El carrito está vacío</p>
                    )}
                    <button onClick={clearCart}>Vaciar carrito</button>
                </div>
            )}
        </div>
    )
}

export default CartWidget;
