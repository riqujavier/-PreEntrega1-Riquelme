import  { useState, useContext } from 'react';
import { MdOutlineShoppingCart } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { CartContext } from '../CartContext/CartContext';

const CartWidget = () => {
    const { cart, clearCart } = useContext(CartContext);
    const [showCart, setShowCart] = useState(false);

    const toggleCart = () => {
        setShowCart(!showCart);
    };

    const itemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <>
            {itemCount > 0 && (
                <div className="cart-widget">
                    <button className="cart-button" onClick={toggleCart}>
                        <MdOutlineShoppingCart />
                        {itemCount > 0 && <span className="cart-count">{itemCount}</span>}
                    </button>
                    <Link to="/cart">
                        <button className="link-button">Ver carrito</button>
                    </Link>
                    {showCart && (
                        <div className="cart-container">
                            <h4>Carrito de compras</h4>
                            {cart.length > 0 ? (
                                <ul>
                                    {cart.map(item => (
                                        <li key={item.id}>
                                            {item.title} - Precio: ${item.price} - Cantidad: {item.quantity}
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
    );
};

export default CartWidget;
