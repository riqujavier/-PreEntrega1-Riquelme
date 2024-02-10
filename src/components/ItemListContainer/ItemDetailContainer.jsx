import  { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useParams } from 'react-router-dom'; 

const ItemDetailContainer = () => {
    const { id } = useParams(); 
    const [peli, setPeli] = useState(null);
    const [loading, setLoading] = useState(true);

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
            <Card.Img variant="top" src={`https://image.tmdb.org/t/p/original/${peli.poster_path}`} />
            <Card.Body>
                <Card.Title>{peli.title}</Card.Title>
                <Card.Text>{peli.overview}</Card.Text>
                <Card.Text>Valoración: {peli.vote_average}</Card.Text>
                <Button variant="primary" onClick="">Agregar al carrito</Button>
            </Card.Body>
        </Card>
    );
};

export default ItemDetailContainer;
