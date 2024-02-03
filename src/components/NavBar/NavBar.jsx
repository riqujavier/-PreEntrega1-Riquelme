import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import CartWidget from '../CartWidget/CartWidget';


function NavBar({ handleCategoryFilter }) {
  
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
    <Container fluid>
      <Navbar.Brand href="#">ViendoPelis</Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse id="navbarScroll">
        <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
          <Nav.Link href="#action1">Inicio</Nav.Link>
          <Nav.Link href="#action2">Novedades</Nav.Link>
          <NavDropdown title="Categorias" id="navbarScrollingDropdown">
            <NavDropdown.Item onClick={() => handleCategoryFilter(28)}>Acción</NavDropdown.Item>
            <NavDropdown.Item onClick={() => handleCategoryFilter(35)}>Comedia</NavDropdown.Item>
            {/* Agregar más elementos de NavDropdown según sea necesario */}
          </NavDropdown>
          <Nav.Link href="#">
            <CartWidget />
          </Nav.Link>
        </Nav>
        <Form className="d-flex">
          <Form.Control type="search" placeholder="Buscar" className="me-2" aria-label="Buscar" />
          <Button variant="outline-success">Buscar</Button>
        </Form>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  );
}

export default NavBar;