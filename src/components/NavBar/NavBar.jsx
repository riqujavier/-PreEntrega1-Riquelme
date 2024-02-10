import React from 'react';
import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import CartWidget from '../CartWidget/CartWidget';


function NavBar() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary"> 
      <Navbar.Brand href="#">ViendoPelis</Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse id="navbarScroll">
        <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
          <Nav.Link as={Link} to="/">Inicio</Nav.Link>
          <Nav.Link as={Link} to="/categoria/28">Acción</Nav.Link>
          <Nav.Link as={Link} to="/categoria/35">Comedia</Nav.Link>
          <Nav.Link as={Link} to="/categoria/18">Drama</Nav.Link>
          <Nav.Link as={Link} to="/categoria/27">Terror</Nav.Link>
          <Nav.Link as={Link} to="/categoria/10749">Romance</Nav.Link>
          <Nav.Link as={Link} to="/categoria/10770">Películas de TV</Nav.Link>
          {/* Agrega más enlaces según las categorías que necesites */}
          <NavDropdown title="Otras Categorías" id="navbarScrollingDropdown">
            <NavDropdown.Item as={Link} to="/categoria/53">Thriller</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/categoria/878">Ciencia Ficción</NavDropdown.Item>
            {/* Agrega más elementos según las categorías que necesites */}
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
