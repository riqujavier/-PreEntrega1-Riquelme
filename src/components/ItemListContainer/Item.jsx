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
    const [quantity, setQuantity] = useState(1);
    console.log(peli)
    console.log(peli.poster_path)

    const toggleDetails = () => {
        setShowDetails(!showDetails);
    };

    const limitWords = (text, limit) => {
        const words = text.split(' ');
        return words.slice(0, limit).join(' ') + (words.length > limit ? '...' : '');
    };

    const description = showDetails ? peli.description : limitWords(peli.description, 20);

    const handleAddToCart = () => {
        const existingItem = cart.find(item => item.categoryId === peli.categoryId);
        
        if (existingItem && existingItem.quantity + quantity > 3) {
            alert('No se pueden agregar más de 3 veces la misma película al carrito.');
            return;
        }

        addItem(peli, quantity);
    };

    const handleRemoveFromCart = () => {
        removeItem(peli.categoryId);
    };

    return (
        <Col>
            <Card>
                <Card.Img variant="top" src={peli.poster_path} />
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
                        {isInCart(peli.id) ? 'Ya en el carrito' : `Agregar al carrito - ${peli.price}`}
                    </Button>
                    {isInCart(peli.id) && (
                        <Button 
                            variant="danger"
                            onClick={handleRemoveFromCart}
                        >
                            Quitar del carrito
                        </Button>
                    )} 
                    <Link to={{ pathname: `/pelicula/${peli.categoryId}`, state: { peli: peli } }} style={{ textDecoration: 'none', color: 'inherit' }} >
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
