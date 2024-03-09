
import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import CartWidget from '../CartWidget/CartWidget';


function NavBar() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary"> 
      <Navbar.Brand  ><Link to={'/'}>ViendoPelis</Link> </Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse id="navbarScroll">
        <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
          <Nav.Link as={Link} to="/">Inicio</Nav.Link>
          <Nav.Link as={Link} to="/categoria/accion">Acción</Nav.Link>
          <Nav.Link as={Link} to="/categoria/comedia">Comedia</Nav.Link>
          <Nav.Link as={Link} to="/categoria/drama">Drama</Nav.Link>
          <Nav.Link as={Link} to="/categoria/terror">Terror</Nav.Link>
          <Nav.Link as={Link} to="/categoria/romance">Romance</Nav.Link>
          <Nav.Link as={Link} to="/categoria/peliculas-de-TV">Películas de TV</Nav.Link>
          
          <NavDropdown title="Otras Categorías" id="navbarScrollingDropdown">
            <NavDropdown.Item as={Link} to="/categoria/thriller">Thriller</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/categoria/ciencia-ficcion">Ciencia Ficción</NavDropdown.Item>
            
          </NavDropdown>
          <Nav.Link href="#" >
            <CartWidget />
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;
