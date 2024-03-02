import { useContext, useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useParams } from 'react-router-dom'; 
import { CartContext } from '../CartContext/CartContext';

const ItemDetailContainer = () => {
    const { id } = useParams(); 
    const [peli, setPeli] = useState(null);
    const [loading, setLoading] = useState(true);
    const { addItem, isInCart, cart, removeItem } = useContext(CartContext);
    const [cartItemCount, setCartItemCount] = useState(0);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=7602a30b9c6d1828ef7757d759a7eb04`);
                if (!response.ok) {
                    throw new Error('Error al cargar los detalles de la película');
                }
                const data = await response.json();
                setPeli(data);
            } catch (error) {
                console.error('Error al obtener detalles de la película:', error);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchMovieDetails();
        }
    }, [id]);
    useEffect(() => {
        // Calcula la cantidad total de ítems en el carrito
        const totalCount = cart.reduce((total, item) => total + item.quantity, 0);
        setCartItemCount(totalCount);
    }, [cart]); 

    const handleAddToCart = () => {
        const existingItem = cart.find(item => item.id === peli.id);
        
        if (existingItem && existingItem.quantity + quantity > 10) {
            alert('No se pueden agregar más de 10 veces la misma película al carrito.');
            return;
        }
    
        addItem(peli, quantity);
    };
    
    
    if (!id) {
        return <p>Selecciona una película</p>;
    }

    if (loading) {
        return <p>Cargando...</p>;
    }

    if (!peli) {
        return <p>No se pudieron cargar los detalles de la película</p>;
    }
    const handleRemoveFromCart = () => {
        removeItem(peli.id);
    };

    return (
        <Card>
            <Card.Img variant="top" src={`https://image.tmdb.org/t/p/original/${peli.poster_path}`} />
            <Card.Body>
                <Card.Title>{peli.title}</Card.Title>
                <Card.Text>{peli.overview}</Card.Text>
                <Card.Text>Valoración: {peli.vote_average}</Card.Text>
                <div>
                    <Button variant="primary" onClick={() => setQuantity(quantity - 1)} disabled={quantity === 1}>-</Button>
                    <span style={{ margin: '0 10px' }}>{quantity}</span>
                    <Button variant="primary" onClick={() => setQuantity(quantity + 1)} disabled={quantity >= 10}>+</Button>
                </div>
                <Button 
                    style={{ margin: '1rem' }} 
                    variant="primary" 
                    onClick={handleAddToCart}
                    disabled={isInCart(peli.id) && isInCart(peli.id).quantity >= 3} 
                >
                    Agregar al carrito
                </Button>
                {isInCart(peli.id) && (
                    <Button 
                        variant="danger"
                        onClick={handleRemoveFromCart}
                    >
                        Quitar del carrito
                    </Button>
                )}
            </Card.Body>
        </Card>
    );
};

export default ItemDetailContainer;
