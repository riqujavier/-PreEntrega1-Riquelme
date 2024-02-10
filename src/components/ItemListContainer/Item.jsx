/* eslint-disable react/prop-types */
import  { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import { MdOutlineShoppingCart } from "react-icons/md";
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom'; 

const Item = ({ peli }) => {
    const [showDetails, setShowDetails] = useState(false);

    const toggleDetails = () => {
        setShowDetails(!showDetails);
    };

    const limitWords = (text, limit) => {
        const words = text.split(' ');
        return words.slice(0, limit).join(' ') + (words.length > limit ? '...' : '');
    };

    const description = showDetails ? peli.overview : limitWords(peli.overview, 20);

    return (
        <Col>
            <Link to={`/pelicula/${peli.id}`} style={{ textDecoration: 'none', color: 'inherit' }}> {/* Usar Link */}
                <Card onClick={toggleDetails}>
                    <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w500/${peli.poster_path}`} />
                    <Card.Body>
                        <Card.Title>{peli.title}</Card.Title>
                        <Card.Text>{description}</Card.Text>
                        {!showDetails && (
                            <Button style={{ margin: '1rem' }} onClick={toggleDetails}>Mostrar más detalles</Button>
                        )}
                        <Button variant="primary" onClick="">
                        <MdOutlineShoppingCart />
                        </Button>
                    </Card.Body>
                </Card>
            </Link>
        </Col>
    );
};

export default Item;
