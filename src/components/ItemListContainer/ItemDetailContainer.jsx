/* eslint-disable react/prop-types */
    import { useEffect, useState } from 'react';
    import Card from 'react-bootstrap/Card';
    import { Link } from 'react-router-dom';

    const ItemDetailContainer = ({ peli }) => {
        const [loading, setLoading] = useState(true);
        

        useEffect(() => {
            const fetchMovieDetails = async () => {
                try {
                    const response = await fetch(`https://api.themoviedb.org/3/movie/${peli.id}?api_key=7602a30b9c6d1828ef7757d759a7eb04`);
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

            if (peli) {
                fetchMovieDetails();
            }
        }, [peli]);

        if (!peli) {
            return <p>Selecciona una película</p>;
        }

        if (loading) {
            return <p>Cargando...</p>;
        }

        return (
            
            <Card>
                <Card.Img variant="top" src={`https://image.tmdb.org/t/p/original/${peli.poster_path}`} />
                <Card.Body>
                    <Card.Title>{peli.title}</Card.Title>
                    <Card.Text>{peli.overview}</Card.Text>
                    <Card.Text>Valoración: {peli.vote_average}</Card.Text>
                </Card.Body>
            </Card>
        );
    };

    export default ItemDetailContainer;
