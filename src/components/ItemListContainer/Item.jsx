import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';

const Item = ({ peli, onClick }) => {
    const [showDetails, setShowDetails] = useState(false);

    const toggleDetails = () => {
        setShowDetails(!showDetails);
        onClick(peli);
    };

    const limitWords = (text, limit) => {
        const words = text.split(' ');
        return words.slice(0, limit).join(' ') + (words.length > limit ? '...' : '');
    };

    const description = showDetails ? peli.overview : limitWords(peli.overview, 20);

    return (
        <Col>
        
            <Card onClick={toggleDetails}>
                <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w500/${peli.poster_path}`} />
                <Card.Body>
                    <Card.Title>{peli.title}</Card.Title>
                    <Card.Text>{description}</Card.Text>
                    {!showDetails && (
                        <button onClick={toggleDetails}>Mostrar más detalles</button>
                    )}
                </Card.Body>
            </Card>
        </Col>
    );
};

export default Item;