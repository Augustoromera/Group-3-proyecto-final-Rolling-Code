import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../styles/LoginRegistro.css';
import { Footer } from '../../components/Footer';
import Header from '../../components/Header';
import ojoAbierto from '../../img/ojo.jpg';
import ojoCerrado from '../../img/ojoCerrado.jpg';
import { useEffect } from 'react';

function LoginPage() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { signIn, errors: signInErrors, isAuthenticated, user } = useAuth();
    const [email, setEmail] = useState('');

    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const regex = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;

    const onSubmit = handleSubmit(async (data) => {
        const emailValido = regex.test(data.email);
        if (!emailValido) {
            Swal.fire({
                icon: 'error',
                title: 'Login incorrecto',
                text: 'El correo electrónico no es válido',
                background: 'black',
                color: 'white',
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

        try {
            await signIn(data);
        } catch (error) {
            console.log(error);
        }
    });

    useEffect(() => {
        if (isAuthenticated) {
            if (user) {
                if (user.role === 'admin') {
                    navigate('/admin');
                }
            } else {
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
                        {/* Campo de Email */}
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
                        <div className='password-input-container'>
                            {/* Campo de Contraseña */}
                            <input
                                type={showPassword ? "text" : "password"}
                                {...register("password", { required: true, minLength: 4 })}
                                className='inputs'
                                placeholder='Contraseña'
                                id='password'
                                maxLength={30}
                            />
                            {/* Icono de ojo */}
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

                        <button type="submit" className='boton-login'>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            Ingresar
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
