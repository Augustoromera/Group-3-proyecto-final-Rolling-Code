
import React from 'react';
import { NavDropdown, Nav } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import "../pages/styles/header.css";
import logoTipo from '../assets/images/logo/logotipo.png'
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert2';

function Header() {
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    swal.fire({
      title: "Cerrando sesión...",
      timer: 2000, // Espera 2 segundos antes de redirigir
      buttons: false,
      icon: "success",
      position: "center",
    }).then(() => {
      logout();
      navigate("/"); // Navega al home ("/") después de cerrar sesión
    });
  };

  if (user === null) {
    return (
      <Navbar variant="dark" className="navbarmain" style={{ backgroundColor: 'black' }}>

        <Container>
          <Navbar.Brand as={Link} to="/">
            <img src={logoTipo} className="d-inline-block icon-burger navbar-image me-3" alt="Logo" />
            <span className="brand-text">Rapiburgers</span>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/aboutus" className="nav-link">Sobre Nosotros</Nav.Link>
              <Nav.Link as={Link} to="/contact" className="nav-link">Contacto</Nav.Link>
              <NavDropdown title="Ingresar" id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} to="/login" className="nav-link">Iniciar Sesión</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/register" className="nav-link">Registrarse</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
  return (
    <Navbar variant="dark" className="navbarmain" style={{ backgroundColor: 'black' }}>
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img src={logoTipo} className="d-inline-block icon-burger" alt="Logo" />
          <span className="brand-text">Rapiburgers</span>
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
                <Nav.Link as={Link} className='nav-link' to="/" onClick={handleLogout}>Cerrar sesión</Nav.Link>
              </>
            )}
            {/* Mostrar elementos de usuario normal */}
            {(isAuthenticated && !(user.role === 'admin')) ? (
              <>
                <Nav.Link as={Link} to="/pedidos" className='nav-link'>Pedidos</Nav.Link>
                <Nav.Link as={Link} to="/aboutus" className="nav-link">Sobre Nosotros</Nav.Link>
                <Nav.Link as={Link} to="/contact" className="nav-link">Contacto</Nav.Link>
                <Nav.Link as={Link} className='nav-link' to="/" onClick={handleLogout}>Cerrar sesión</Nav.Link>
              </>
            ) : ("")}

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;