// ItemList.jsx
import React, { useState } from 'react';
import Item from './Item';
import ItemDetailContainer from './ItemDetailContainer';
import Row from 'react-bootstrap/Row';

const ItemList = ({ peliculas }) => {
    const [selectedMovie, setSelectedMovie] = useState(null);

    const handleMovieClick = (peli) => {
        setSelectedMovie(peli);
    };

    const handleGoBack = () => {
        setSelectedMovie(null);
    };

    return (
        <div>
            {selectedMovie ? (
                <div>
                    <ItemDetailContainer peli={selectedMovie} />
                    <button onClick={handleGoBack}>Volver</button>
                </div>
            ) : (
                <Row xs={1} md={4} className="g-4">
                    {peliculas && peliculas.map(peli => (
                        <Item key={peli.id} peli={peli} onClick={() => handleMovieClick(peli)} />
                    ))}
                </Row>
            )}
        </div>
    );
};

export default ItemList;