
import React from 'react';
import { NavDropdown, Nav } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import "../pages/styles/header.css";

function Header() {
  const { isAuthenticated, logout, user } = useAuth();

  return (
    <Navbar expand="lg" className="bg-body-tertiary navbarmain" bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img src='/src/assets/images/logo/logotipo.png' className="d-inline-block icon-burger" alt="Logo" />
          Rapiburgers
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {isAuthenticated ? (
              <>
                <Nav.Text>Bienvenido {user.username}</Nav.Text>
                <Nav.Link as={Link} to="/" onClick={() => logout()}>Cerrar Sesión</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/pedidos" className='nav-link'>Pedidos</Nav.Link>
                <Nav.Link as={Link} to="/aboutus" className="nav-link">Sobre Nosotros</Nav.Link>
                <Nav.Link as={Link} to="/contact" className="nav-link">Contacto</Nav.Link>
                <NavDropdown title="Ingresar" id="basic-nav-dropdown">
                  <NavDropdown.Item as={Link} to="/login" className="nav-link">Iniciar Sesión</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/register" className="nav-link">Registrarse</NavDropdown.Item>
                </NavDropdown>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;