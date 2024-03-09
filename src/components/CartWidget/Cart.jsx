import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../CartContext/CartContext';
import { Button, Card, Col, Row } from 'react-bootstrap';

const Cart = () => {
    const { cart, removeItem, clearCart } = useContext(CartContext);
    const [showCheckout, setShowCheckout] = useState(false);

    const handleRemoveItem = (itemId) => {
        removeItem(itemId);
    };

    const handleClearCart = () => {
        clearCart();
    };

    const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <div>
            {cart.length === 0 ? (
                <div>
                    <p>No hay ítems en el carrito</p>
                    <Link to="/cart">Volver al Landing</Link>
                </div>
            ) : (
                <div className="container">
                    <h1>Carrito de Compras</h1>
                    <Row xs={1} md={2} lg={3} className="g-4">
                        {cart.map(item => (
                            <Col key={item.id}>
                                <Card>
                                    <Card.Img variant="top" src={`${item.poster_path}`} />
                                    <Card.Body>
                                        <Card.Title>{item.title}</Card.Title>
                                        <Card.Text>Cantidad: {item.quantity}</Card.Text>
                                        <Button variant="danger" onClick={() => handleRemoveItem(item.id)}>Eliminar</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                    <div style={{ marginTop: '20px' }}>
                        <p>Precio Total: ${totalPrice}</p>
                        <Link to="/checkout"><Button variant="primary" onClick={() => setShowCheckout(true)}>Continuar al Checkout</Button></Link>
                        <Button variant="danger" onClick={handleClearCart}>Vaciar carrito</Button>
                    </div>
                    <Link to="/">Volver al inicio</Link>
                </div>
            )}
            {showCheckout && <Link to="/checkout">Ir al Checkout</Link>}
        </div>
    );
};

export default Cart;
