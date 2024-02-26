import { useContext, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import { MdOutlineShoppingCart } from "react-icons/md";
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom'; 
import { CartContext } from '../CartContext/CartContext';

const Item = ({ peli }) => {
    const [showDetails, setShowDetails] = useState(false);
    const { addItem, removeItem, isInCart } = useContext(CartContext);
    const [price] = useState(10);

    const toggleDetails = () => {
        setShowDetails(!showDetails);
    };

    const limitWords = (text, limit) => {
        const words = text.split(' ');
        return words.slice(0, limit).join(' ') + (words.length > limit ? '...' : '');
    };

    const description = showDetails ? peli.overview : limitWords(peli.overview, 20);

    const handleAddToCart = () => {
        addItem(peli, 1);
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
                    <Button 
                        style={{ margin: '1rem' }} 
                        variant="primary" 
                        onClick={handleAddToCart}
                        disabled={isInCart(peli.id)} 
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
