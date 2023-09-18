import { NavDropdown, Nav } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import "../pages/styles/header.css";
import logoTipo from '../assets/images/logo/logorapiburgeramarillo.png'
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert2';

// eslint-disable-next-line react/prop-types
function Header({ navBarClass }) {
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();
  const navClass = location.pathname === '/' ? 'navbarhome' : 'navbarmain';

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
  const navLinkClass = navBarClass;
  let navLinkClassWelcome;
  if (navLinkClass === "none-class") {
    navLinkClassWelcome = "inline-block-class";
  } else {
    navLinkClassWelcome = "none-class";
  }
  const dinamicNav = location.pathname === '/' ? 'navbarhome' : 'navbarmain';

  if (user === null) {
    return (
      <Navbar expand="lg" data-bs-theme="dark" className={`navbarhome ${dinamicNav} ${navLinkClass}`} >

        <Container>
          <Navbar.Brand as={Link} to="/">
            <img src={logoTipo} className="d-inline-block navbar-image " alt="Logo" />
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/aboutus" >Sobre Nosotros</Nav.Link>
              <Nav.Link as={Link} to="/contact">Contacto</Nav.Link>
              <NavDropdown title="Ingresar" id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} to="/login" >Iniciar Sesión</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/register">Registrarse</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
  return (
    <Navbar expand="lg" data-bs-theme="dark" className={`navbarhome ${dinamicNav} ${navLinkClass}`} >
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img src={logoTipo} className="d-inline-block navbar-image " alt="Logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">

            {/*Mostrar enlace de administrador solo si el usuario es un administrador */}
            {isAuthenticated && user.role === 'admin' && (
              <>
                <Nav.Link as={Link} to="/" className={`nav-welcome ${navLinkClassWelcome}`}>Bienvenid@ {user.username}!</Nav.Link>
                <Nav.Link as={Link} to="/admin">
                  Administración
                </Nav.Link>
                <Nav.Link as={Link} to="/pedidos">Pedidos</Nav.Link>
                <Nav.Link as={Link} to="/aboutus">Sobre Nosotros</Nav.Link>
                <Nav.Link as={Link} to="/contact">Contacto</Nav.Link>
                <Nav.Link as={Link} to="/" onClick={handleLogout}>Cerrar sesión</Nav.Link>
              </>
            )}
            {/* Mostrar elementos de usuario normal */}
            {(isAuthenticated && !(user.role === 'admin')) ? (
              <>
                <Nav.Link as={Link} to="/" className={`nav-welcome ${navLinkClass}`}>Bienvenid@ {user.username}!</Nav.Link>
                <Nav.Link as={Link} to="/pedidos">Pedidos</Nav.Link>
                <Nav.Link as={Link} to="/aboutus">Sobre Nosotros</Nav.Link>
                <Nav.Link as={Link} to="/contact">Contacto</Nav.Link>
                <Nav.Link as={Link} to="/" onClick={handleLogout}>Cerrar sesión</Nav.Link>
              </>
            ) : ("")}

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;