import { useEffect, useState,useContext } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useParams } from 'react-router-dom'; 
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { CartContext } from '../CartContext/CartContext';

const ItemDetailContainer = () => {
    const { id } = useParams(); 
    const [peli, setPeli] = useState(null);
    const [loading, setLoading] = useState(true);
    const { addItem, isInCart, cart, removeItem } = useContext(CartContext);
    const [quantity, setQuantity] = useState(1);
    
    
    useEffect(() => {
        const fetchItem = async () => {
            const db = getFirestore();
            const itemRef = doc(db, 'items', id);
            const itemSnapshot = await getDoc(itemRef);
            if (itemSnapshot.exists()) {
                setPeli(itemSnapshot.data());
                console.log(itemSnapshot.data());
            } else {
                console.log('Item not found!');
            }
            setLoading(false);
        };
        
        console.log(peli)

        fetchItem();
    }, [id]);

    const handleAddToCart = () => {
        const existingItem = cart.find(item => item.id === peli.id);
        
        if (existingItem && existingItem.quantity + quantity > 10) {
            alert('No se pueden agregar más de 10 veces la misma película al carrito.');
            return;
        }
    
        addItem(peli, quantity);
    };
    
    const handleRemoveFromCart = () => {
        removeItem(peli.id);
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

    return (
        <Card>
            <Card.Img variant="top" src={peli.poster_path} />
            <Card.Body>
                <Card.Title>{peli.title}</Card.Title>
                <Card.Text>{peli.description}</Card.Text>
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
