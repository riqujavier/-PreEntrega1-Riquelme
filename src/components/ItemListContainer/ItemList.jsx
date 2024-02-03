
import Item from './Item'
import Row from 'react-bootstrap/Row';

const ItemList = ({peliculas}) => {
    return (
        <div>
            <Row xs={1} md={4} className="g-4">
            {peliculas.map (peli => <Item peli={peli} key={peli.id} />)}
            </Row> 
        </div>
    )
}

export default ItemList
