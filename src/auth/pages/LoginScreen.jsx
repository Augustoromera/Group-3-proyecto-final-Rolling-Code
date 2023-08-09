/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import '../css/auth.css';
import pruebaApi from '../../api/pruebaapi';
import { useNavigate } from 'react-router';
export const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const handleLogin = async (e) => {
        e.preventDefault();
        //validaciones para comprobar name email y password 

        //mandar datos al backend
        try {
            //respuesta que va a almacenar el backend almacenara el posteo
            const resp = await pruebaApi.post('/auth/login', {
                email, password,
            });
            navigate("/home");
            console.log(resp);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className='container'>
            <h2>Login</h2>
            <form onSubmit={handleLogin} className="form" >
                <input type="email" placeholder="Correo electronico" onChange={(e) => {
                    setEmail(e.target.value)
                }} />
                <input type="password" placeholder="Contraseña" onChange={(e) => {
                    setPassword(e.target.value)
                }} />
                <button type="submit"> Login</button>
            </form>

        </div>
    )
}
