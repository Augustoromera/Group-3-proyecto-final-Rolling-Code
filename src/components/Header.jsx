
import React from 'react';
import { NavDropdown, Nav } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import "../pages/styles/header.css";
import logoTipo from '../assets/images/logo/logotipo.png'

function Header() {
  const { isAuthenticated, logout, user } = useAuth();

  return (
    <Navbar expand="lg" className="bg-body-tertiary navbarmain" bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img src={logoTipo} className="d-inline-block icon-burger" alt="Logo" />
          Rapiburgers
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">

            {/*Mostrar enlace de administrador solo si el usuario es un administrador */}
            {isAuthenticated && user.role === 'admin' && (
              <>
                <Nav.Link as={Link} to="/admin" className='nav-link'>
                  Página de Administrador
                </Nav.Link>
                <Nav.Link as={Link} to="/pedidos" className='nav-link'>Pedidos</Nav.Link>
                <Nav.Link as={Link} to="/aboutus" className="nav-link">Sobre Nosotros</Nav.Link>
                <Nav.Link as={Link} to="/contact" className="nav-link">Contacto</Nav.Link>
                <Nav.Link as={Link} className='link-nav' to="/" onClick={() => {
                  logout();
                }}>Cerrar sesión</Nav.Link>
              </>
            )}
            {/* Mostrar elementos de usuario normal */}
            {isAuthenticated ? (
              <>
                <Nav.Link as={Link} to="/pedidos" className='nav-link'>Pedidos</Nav.Link>
                <Nav.Link as={Link} to="/aboutus" className="nav-link">Sobre Nosotros</Nav.Link>
                <Nav.Link as={Link} to="/contact" className="nav-link">Contacto</Nav.Link>
                <Nav.Link as={Link} className='link-nav' to="/" onClick={() => {
                  logout();
                }}>Logout</Nav.Link>
              </>
            ) : (
              <>
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