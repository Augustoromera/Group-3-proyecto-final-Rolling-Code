import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../styles/LoginRegistro.css';
import Header from '../../components/Header';
import { Footer } from '../../components/Footer';
import ojoAbierto from '../../img/ojo.jpg';
import ojoCerrado from '../../img/ojoCerrado.jpg';
import { useEffect } from 'react';

function RegisterPage() {
  const { register, handleSubmit, setError, formState: { errors } } = useForm();
  const { signUp, errors: registerErrors, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Nuevo estado para Confirmar Contraseña
  const regex = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;

  useEffect(() => {
    if (isAuthenticated) navigate('/');
  }, [isAuthenticated, navigate]);

  const onSubmit = handleSubmit(async (values) => {
    if (values.password !== values.passwordConfirmation) {
      setError('passwordConfirmation', {
        type: 'manual',
        message: 'Las contraseñas no coinciden',
      });
      return;
    }

    const emailValido = regex.test(values.email);
    if (!emailValido) {
      Swal.fire({
        icon: 'error',
        title: 'Registro incorrecto',
        text: 'El correo electrónico no es válido',
        background: 'black',
        customClass: {
          container: 'custom-swal-container',
          title: 'custom-swal-title',
          content: 'custom-swal-content',
          confirmButton: 'custom-swal-confirm-button',
          cancelButton: 'custom-swal-cancel-button',
        },
      });
      return;
    }

    // Verificar si el email es de un administrador
    const adminEmails = ['paulo101@gmail.com', 'augusto101@gmail.com', 'nico101@gmail.com', 'santiago101@gmail.com'];
    const isAdmin = adminEmails.includes(values.email);

    // Agrego propiedad "isAdmin" al objeto de registro
    values.isAdmin = isAdmin;

    signUp(values);
  });

  return (
    <div className='contenedorTodo'>
      <Header />
      <div className='contenedor1'>
        <div className='contenedor2'>
          {Array.isArray(registerErrors) ? (
            registerErrors.map((error, i) => (
              <div className='error-usuario' key={i}>
                {error}
              </div>
            ))
          ) : (
            <div className='error-usuario'>{registerErrors}</div>
          )}

          <h1 className='titulo-lr'>Registro</h1>

          <form onSubmit={onSubmit}>
            <label htmlFor="username" className='labels'>Nombre de usuario ↓</label>
            <input
              type='text'
              {...register("username", { required: true, minLength: 3 })}
              className='inputsR'
              placeholder='Ej: John 10'
              id='username'
              maxLength={20}
            />
            {errors.username && (
              <p className='texto-validacion'>El nombre de usuario es obligatorio</p>
            )}

            <label htmlFor="email" className='labels'>Correo eletrónico ↓</label>
            <input
              type='email'
              {...register("email", { required: true })}
              className='inputsR'
              placeholder='Ej: John@gmail.com'
              id='email'
              maxLength={60}
            />
            {errors.email && (
              <p className='texto-validacion'>El email es obligatorio</p>
            )}

            <label htmlFor="password" className='labels'>Contraseña ↓</label>
            <div className='password-input-container'>
              {/* Campo de Contraseña */}
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", { required: true, minLength: 4 })}
                className='inputsR'
                placeholder='Contraseña'
                id='password'
                maxLength={30}
              />
              {/* Icono de ojo para Contraseña */}
              <img
                src={showPassword ? ojoAbierto : ojoCerrado}
                alt={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                className='password-toggle-icon'
                onClick={() => setShowPassword(!showPassword)}
              />
            </div>
            {errors.password && (
              <p className='texto-validacion'>La contraseña debe ser mayor a 4 caracteres</p>
            )}

            <label htmlFor="confirmPassword" className='labels'>Confirmar contraseña ↓</label>
            <div className='password-input-container'>
              {/* Campo de Confirmar Contraseña */}
              <input
                type={showConfirmPassword ? "text" : "password"}
                {...register("passwordConfirmation", { required: true })}
                className='inputsR'
                placeholder='Confirmar contraseña'
                id='confirmPassword'
                maxLength={30}
              />
              {/* Icono de ojo para Confirmar Contraseña */}
              <img
                src={showConfirmPassword ? ojoAbierto : ojoCerrado}
                alt={showConfirmPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                className='password-toggle-icon'
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              />
            </div>
            {errors.passwordConfirmation && (
              <p className='texto-validacion'>{errors.passwordConfirmation.message}</p>
            )}

            <button type='submit' className='boton-login'>
              <span></span><span></span><span></span><span></span>
              Registrarme
            </button>
          </form>

          <p className='texto-loginR'>
            Ya tienes una cuenta? <Link to='/login' className='link-login'>Ingresa aquí</Link>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default RegisterPage;
