import { useState, useContext } from 'react';
import { MdOutlineShoppingCart } from "react-icons/md";
import { Link } from 'react-router-dom'; 
import { CartContext } from '../CartContext/CartContext';

const CartWidget = () => {
    const { cart, clearCart } = useContext(CartContext);
    const [showCart, setShowCart] = useState(false);

    const toggleCart = () => {
        setShowCart(!showCart);
    };

    // Calcula la cantidad total de ítems en el carrito
    const itemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <>
            {/* Renderiza el CartWidget solo si hay ítems en el carrito */}
            {itemCount > 0 && (
                <div style={{ position: 'relative' }}>
                    <button onClick={toggleCart} style={{ position: 'relative', zIndex: 1 }}>
                        <MdOutlineShoppingCart />
                        {/* Muestra la cantidad de ítems junto al ícono del carrito */}
                        {itemCount > 0 && <span style={{ position: 'absolute', top: '-10px', right: '-10px', backgroundColor: 'red', borderRadius: '50%', padding: '2px 5px', color: 'white', fontSize: '12px' }}>{itemCount}</span>}
                    </button>
                    <Link to="/cart"> 
                        <button style={{ position: 'relative', zIndex: 1, marginLeft: '10px' }}>Ver carrito</button>
                    </Link>
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
            )}
        </>
    )
}

export default CartWidget;
