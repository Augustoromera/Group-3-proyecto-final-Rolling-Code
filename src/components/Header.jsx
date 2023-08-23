import React from 'react';
import { NavDropdown } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import "../components/styles/header.css";

function Navbarproyect() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary navbarmain" bg="dark" data-bs-theme="dark">
      <Container  >
        <Navbar.Brand href="#home">
          <img src='src\assets\images\logo\logotipo.png'
            
            className="d-inline-block icon-burger "
          />Rapiburgers
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          
          <Nav className="ms-auto">
            <NavDropdown title="Ingresar" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/1"className="nav-link" >
                Iniciar Sesion
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/2" className="nav-link">
                Registrarse
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#link" className='nav-link'>Pedidos</Nav.Link>
            <Nav.Link href="#sobrenosotros"   className="nav-link" >
              Sobre Nosotros
            </Nav.Link>
            <Nav.Link href="#contacto" to="/contacto" className="nav-link" >
              Contacto
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navbarproyect;