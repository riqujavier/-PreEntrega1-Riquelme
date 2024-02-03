
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';

const Item = ({peli}) => {
  return (
    <div>
      {Array.from({ length: 1 }).map((_, idx) => (
        <Col key={idx}>
          <Card >
            <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w500/${peli.poster_path}`} />
            <Card.Body >
              <Card.Title>{peli.title}</Card.Title>
              <Card.Text>
              {peli.overview}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </div>
  )
}

export default Item
