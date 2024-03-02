import { useContext, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import { MdOutlineShoppingCart } from "react-icons/md";
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom'; 
import { CartContext } from '../CartContext/CartContext';

const Item = ({ peli }) => {
    const [showDetails, setShowDetails] = useState(false);
    const { addItem, removeItem, isInCart, cart } = useContext(CartContext);
    const [price] = useState(10);
    const [quantity, setQuantity] = useState(1);

    const toggleDetails = () => {
        setShowDetails(!showDetails);
    };

    const limitWords = (text, limit) => {
        const words = text.split(' ');
        return words.slice(0, limit).join(' ') + (words.length > limit ? '...' : '');
    };

    const description = showDetails ? peli.overview : limitWords(peli.overview, 20);

    const handleAddToCart = () => {
        const existingItem = cart.find(item => item.id === peli.id);
        
        if (existingItem && existingItem.quantity + quantity > 3) {
            alert('No se pueden agregar más de 3 veces la misma película al carrito.');
            return;
        }

        addItem(peli, quantity);
    };

    const handleRemoveFromCart = () => {
        removeItem(peli.id);
    };

    return (
        <Col>
            <Card>
                <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w500/${peli.poster_path}`} />
                <Card.Body>
                    <Card.Title>{peli.title}</Card.Title>
                    <Card.Text>{description}</Card.Text>
                    <div>
                        <Button variant="primary" onClick={() => setQuantity(quantity - 1)} disabled={quantity === 1}>-</Button>
                        <span style={{ margin: '0 10px' }}>{quantity}</span>
                        <Button variant="primary" onClick={() => setQuantity(quantity + 1)} disabled={quantity >= 3}>+</Button>
                    </div>
                    <Button 
                        style={{ margin: '1rem' }} 
                        variant="primary" 
                        onClick={handleAddToCart}
                        disabled={isInCart(peli.id) || quantity > 3} 
                    >
                        <MdOutlineShoppingCart />
                        {isInCart(peli.id) ? 'Ya en el carrito' : `Agregar al carrito - $${price}`}
                    </Button>
                    {isInCart(peli.id) && (
                        <Button 
                            variant="danger"
                            onClick={handleRemoveFromCart}
                        >
                            Quitar del carrito
                        </Button>
                    )} 
                    <Link to={`/pelicula/${peli.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <Button 
                            style={{ margin: '1rem' }} 
                            onClick={toggleDetails}
                        >
                            Mostrar más detalles
                        </Button>
                    </Link>
                </Card.Body>
            </Card>
        </Col>
    );
};

export default Item;
