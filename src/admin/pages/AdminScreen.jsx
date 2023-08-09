// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { FaPlus } from 'react-icons/fa';
import Table from 'react-bootstrap/Table';
import pruebaApi from '../../api/pruebaapi';
import '../../auth/css/adminscreen.css';


export const AdminScreen = () => {
    const [cargarUsuarios, setCargarUsuarios] = useState([]);
    const [cargarProducto, setCargarProducto] = useState([]);


    const cargarUserDB = async () => {
        try {
            const resp = await pruebaApi.get('/admin/listarUsuarios');
            setCargarUsuarios(resp.data.usuarios);
        } catch (error) {
            console.log(error);
        }
    };
    const cargarProductoDB = async () => {
        try {
            const resp = await pruebaApi.get('/admin/listarMenu');
            setCargarProducto(resp.data.menus);
        } catch (error) {
            console.log(error);
        }
    };



    useEffect(() => {
        cargarUserDB();
        cargarProductoDB();
    }, []);
    


    return (
        <>
            <h1 className="text-center p-3">Admin Page</h1>

            <h3>Usuarios</h3>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>#ID</th>
                        <th>Primer nombre</th>
                        <th>Email</th>
                    </tr>
                </thead>
                {cargarUsuarios.map((usuario) => {
                    return (
                        <tbody key={usuario._id}>
                            <tr>
                                <td>{usuario._id}</td>
                                <td>{usuario.name}</td>
                                <td>{usuario.email}</td>
                            </tr>

                        </tbody>
                    )
                }
                )
                }
            </Table>
            <h3>Menus</h3>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>#ID</th>
                        <th>Nombre</th>
                        <th>Estado</th>
                        <th>Precio</th>
                        <th>Detalle</th>
                        <th>Categoria</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                {cargarProducto.map((producto) => {
                    return (
                        <tbody key={producto._id}>
                            <tr>
                                <td>{producto._id}</td>
                                <td>{producto.nombre}</td>
                                <td>{producto.estado}</td>
                                <td>{producto.precio}</td>
                                <td>{producto.detalle}</td>
                                <td>{producto.categoria}</td>
                                <td>
                                    <button 
                                    >
                                        {/* onClick={() => editarProductoClick()} */}
                                        <i className="fa-solid fa-pen-to-square"

                                            style={{ color: '#000000' }}></i>
                                    </button>
                                    <button
                                    >
                                        <i className="fa-solid fa-trash"
                                            style={{ color: '#000000' }}></i>
                                    </button>
                                </td>
                            </tr>


                        </tbody>
                    )
                }
                )
                }
            </Table>

        </>
    );
};

