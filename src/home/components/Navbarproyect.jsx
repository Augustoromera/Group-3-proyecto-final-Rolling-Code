import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
function Navbarproyect() {
    return (
        <Navbar bg="dark" data-bs-theme="dark">
            <Container>
                <Navbar.Brand href="#home">Mila que te como</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#home">Inicio</Nav.Link>
                        <Nav.Link href="#link">Pedidos</Nav.Link>
                        <NavDropdown title="Más" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Sobre Nosotros</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Contacto</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Registrarse</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Iniciar sesion</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Navbarproyect;