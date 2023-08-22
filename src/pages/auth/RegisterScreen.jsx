// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import '../css/auth.css';
import pruebaApi from '../../../api/pruebaapi';
export const RegisterScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        //validaciones para comprobar name email y password 



        //mandar datos al backend
        try {
            //respuesta que va a almacenar el backend almacenara el posteo
            const resp = await pruebaApi.post('/auth/new', {
                name, email, password,
            });
            console.log(resp.data);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='container'>
            <h2>Registrarse</h2>
            <form onSubmit={handleRegister} className="form" >
                <input type="text" placeholder="Nombre" onChange={(e) => {
                    setName(e.target.value)
                }} />
                <input type="email" placeholder="Correo electronico" onChange={(e) => {
                    setEmail(e.target.value)
                }} />
                <input type="password" placeholder="Contraseña" onChange={(e) => {
                    setPassword(e.target.value)
                }} />
                <button type="submit"> Registrarse</button>
            </form>

        </div>
    )
}
