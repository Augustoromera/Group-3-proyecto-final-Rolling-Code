import React from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import '../styles/LoginRegistro.css'
import Header from '../../components/Header';
import { Footer } from '../../components/Footer';


function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signIn, errors: signInErrors, isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const regex = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;

  const onSubmit = handleSubmit(async (data) => {
    const emailValido = regex.test(data.email);
    if (!emailValido) {
      Swal.fire({
        icon: 'error',
        title: 'Login incorrecto',
        text: 'El correo electrónico no es válido',
      });
      return;
    }

    try {
      await signIn(data);
    } catch (error) {
      // Maneja los errores de inicio de sesión si es necesario
      console.log(error);
    }
  });

  useEffect(() => {
    if (isAuthenticated) {
      if (user.role === 'admin') {
        console.log('Redirecting to admin page');
        navigate('/admin-page'); 
      } else {
        console.log('Redirecting to home page');
        navigate('/'); 
      }
    }
  }, [isAuthenticated, user, navigate]);

  return (
         
    <div className='contenedorTodo'>
      <Header />
    <div className='contenedor1'>
      <div>
        {Array.isArray(signInErrors) ? (
          signInErrors.map((error, i) => (
            <div className='error-usuario' key={i}>
              {error}
            </div>
          ))
        ) : (
          <div className='error-usuario'>
            {signInErrors}
          </div>
        )}

        <h1 className='titulo-lr'>Login</h1>

        <form onSubmit={onSubmit}>
          <label htmlFor="email" className='labels'>Correo electrónico ↓</label>
          <input
            type="email"
            {...register("email", { required: true })}
            className='inputs'
            placeholder='Ej: John@gmail.com'
            id='email'
            maxLength={60}
            onChange={(event) => setEmail(event.target.value)}
          />
          {errors.email && (
            <p className='texto-validacion'>El email es obligatorio</p>
          )}

          <label htmlFor="password" className='labels'>Contraseña ↓</label>
          <input
            type="password"
            {...register("password", { required: true, minLength: 4 })}
            className='inputs'
            placeholder='Contraseña'
            id='password'
            maxLength={30}
          />
          {errors.password && (
            <p className='texto-validacion'>La contraseña debe ser mayor a 4 caracteres</p>
          )}

          <button type="submit" className='boton-login'>
            Login
          </button>
        </form>

        <p className='texto-loginR'>
          No tienes una cuenta para ingresar? <Link to="/register" className='link-login'>Regístrate aquí</Link>
        </p>
      </div>
    </div>
    <Footer />
    </div>
    
  );
}

export default LoginPage;
