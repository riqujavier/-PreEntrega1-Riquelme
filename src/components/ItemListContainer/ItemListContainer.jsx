import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ItemList from "./ItemList";
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore';

const ItemListContainer = () => {
    const [peliculas, setPeliculas] = useState([]);
    const { category } = useParams();

    useEffect(() => {
        const fetchMovies = async () => {
            const db = getFirestore();
            const peliculasCollection = collection(db, 'items');
            let queryRef = peliculasCollection;

            if (category) {
                queryRef = query(peliculasCollection, where('genre', '==', category));
            }

            const peliculasSnapshot = await getDocs(queryRef);
            const peliculasData = peliculasSnapshot.docs.map(doc => doc.data());
            setPeliculas(peliculasData);
        };

        fetchMovies();
    }, [category]);

    return (
        <div>
            <h1>ViendoPelis</h1>
            <ItemList peliculas={peliculas} />
        </div>
    )
}

export default ItemListContainer;
