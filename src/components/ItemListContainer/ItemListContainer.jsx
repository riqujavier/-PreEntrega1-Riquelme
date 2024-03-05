import { useEffect, useState } from "react";
import ItemList from "./ItemList";
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const ItemListContainer = () => {
    const [peliculas, setPeliculas] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            const db = getFirestore();
            const peliculasCollection = collection(db, 'items');
            const peliculasSnapshot = await getDocs(peliculasCollection);
            const peliculasData = peliculasSnapshot.docs.map(doc => doc.data());
            setPeliculas(peliculasData);
        };

        fetchMovies();
    }, []);

    return (
        <div>
            <h1>ViendoPelis</h1>
            <ItemList peliculas={peliculas} />
        </div>
    )
}

export default ItemListContainer;
