import {Link} from 'react-router-dom';
import {useAuth} from '../context/AuthContext'

function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();

  return (
    <nav className="nav-lr">
      <Link to="/">
        <h1 className='titulo-nav'>Rapi Burguers</h1>
      </Link>
      <ul className='ul-lr'>
        {/* Mostrar enlace de administrador solo si el usuario es un administrador */}
        {isAuthenticated && user.role === 'admin' && (
          <li>
            <Link to="/admin-page" className='link-nav'>
              Página de Administrador
            </Link>
          </li>
        )}
        {/* Mostrar elementos de login/registro o bienvenida y logout */}
        {isAuthenticated ? (
          <>
            <li>Bienvenido {user.username}</li>
            <li>
              <Link className='link-nav' to="/" onClick={() => {
                logout();
              }}>Logout</Link>
            </li>
          </>
        ) : (
          <>
            <li><Link to="/" className='link-nav'>Login</Link></li>
            <li><Link to="/register" className='link-nav'>Registro</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
