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
  console.log(navLinkClassWelcome)

  if (user === null) {
    return (
      <Navbar expand="lg" data-bs-theme="dark" className={navClass} >

        <Container>
          <Navbar.Brand as={Link} to="/">
            <img src={logoTipo} className="d-inline-block navbar-image " alt="Logo" />
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/aboutus" className={navLinkClass}>Sobre Nosotros</Nav.Link>
              <Nav.Link as={Link} to="/contact" className={navLinkClass}>Contacto</Nav.Link>
              <NavDropdown title="Ingresar" id="basic-nav-dropdown" className={navLinkClass}>
                <NavDropdown.Item as={Link} to="/login" >Iniciar Sesión</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/register" className={navLinkClass}>Registrarse</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
  return (
    <Navbar expand="lg" data-bs-theme="dark" className={navClass} style={{ backgroundColor: 'transparent' }}>
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
                <Nav.Link as={Link} to="/admin" className={navLinkClass}>
                  Administración
                </Nav.Link>
                <Nav.Link as={Link} to="/pedidos" className={navLinkClass}>Pedidos</Nav.Link>
                <Nav.Link as={Link} to="/aboutus" className={navLinkClass}>Sobre Nosotros</Nav.Link>
                <Nav.Link as={Link} to="/contact" className={navLinkClass}>Contacto</Nav.Link>
                <Nav.Link as={Link} className={navLinkClass} to="/" onClick={handleLogout}>Cerrar sesión</Nav.Link>
              </>
            )}
            {/* Mostrar elementos de usuario normal */}
            {(isAuthenticated && !(user.role === 'admin')) ? (
              <>
                <Nav.Link as={Link} to="/" className={`nav-welcome ${navLinkClass}`}>Bienvenid@ {user.username}!</Nav.Link>
                <Nav.Link as={Link} to="/pedidos" className={navLinkClass}>Pedidos</Nav.Link>
                <Nav.Link as={Link} to="/aboutus" className={navLinkClass}>Sobre Nosotros</Nav.Link>
                <Nav.Link as={Link} to="/contact" className={navLinkClass}>Contacto</Nav.Link>
                <Nav.Link as={Link} className={navLinkClass} to="/" onClick={handleLogout}>Cerrar sesión</Nav.Link>
              </>
            ) : ("")}

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;