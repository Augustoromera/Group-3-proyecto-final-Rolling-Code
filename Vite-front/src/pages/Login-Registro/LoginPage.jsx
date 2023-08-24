import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import Swal from 'sweetalert2';

function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signIn, errors: signInErrors, isAuthenticated } = useAuth();

  const navigate = useNavigate();


  //Validacion nueva de email porque la anterior no funciona
  const [email, setEmail] = useState('');
  const regex = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;


  const onSubmit = handleSubmit((data) => {
    const emailValido = regex.test(data.email);
    if (!emailValido) {
      Swal.fire({
        icon: 'error',
        title: 'Login incorrecto',
        text: 'El correo electrónico no es válido',
      });
      return;
    }
    signIn(data);
  });

  useEffect(() => {
    if (isAuthenticated) navigate('/');
  }, [isAuthenticated]);




  return (
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
            maxLength={60} // Agregamos el atributo maxLength
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
            maxLength={30} // Agregamos el atributo maxLength
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
  );
}

export default LoginPage;
