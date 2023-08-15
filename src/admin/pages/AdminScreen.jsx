import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { FaPlus } from 'react-icons/fa';
import pruebaApi from '../../api/pruebaapi';
import Header from '../../home/components/Header';
import '../../auth/css/adminscreen.css';
import Swal from 'sweetalert2';
import AddMenuModal from '../componentes/AddMenuModal';
import EditMenuModal from '../componentes/EditMenuModal';
import AddUserModal from '../componentes/AddUserModal';
import EditUserModal from '../componentes/EditUserModal';



export const AdminScreen = () => {
    const [cargarUsuarios, setCargarUsuarios] = useState([]);
    const [cargarProducto, setCargarProducto] = useState([]);
    //se encarga de cerrar y abrir el modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpenUser, setIsModalOpenUser] = useState(false);
    const [isModalOpenEditar, setIsModalOpenEditar] = useState(false);
    const [isModalOpenUserEditar, setIsModalOpenUserEditar] = useState(false);
    //hook para almacenar los datos del formulario agregarProducto
    const [formDateEditar, setFormDateEditar] = useState({
        _id: '',
        nombre: '',
        imagen: '',
        estado: '',
        precio: '',
        detalle: '',
        categoria: ''
    });
    const [formDateUser, setFormDateUser] = useState({
        name: '',
        email: '',
        estado: '',
        password: '',
        rol: ''
    });
    const [formDateUserEditar, setFormDateUserEditar] = useState({
        _id: '',
        name: '',
        email: '',
        estado: '',
        password: '',
        rol: ''
    });
    //hook para almacenar los datos del formulario editarProducto
    const [formDate, setFormDate] = useState({
        nombre: '',
        estado: '',
        precio: '',
        detalle: '',
        categoria: ''
    });


    const handleChangeForm = (e) => {
        setFormDate({
            ...formDate,
            [e.target.name]: e.target.value,
        })
    }
    const handleChangeFormUser = (e) => {

        const value = e.target.type === "checkbox" ? (e.target.checked ? "Activo" : "No Activo") : e.target.value;
        setFormDateUser({
            ...formDateUser,
            [e.target.name]: value,
        })

    }
    const handleChangeFormUserEditar = (e) => {

        const value = e.target.type === "checkbox" ? (e.target.checked ? "Activo" : "No Activo") : e.target.value;
        setFormDateUserEditar({
            ...formDateUserEditar,
            [e.target.name]: value,
        })

    }
    const handleChangeFormEditar = (e) => {
        const value = e.target.type === "checkbox" ? (e.target.checked ? "Disponible" : "No Disponible") : e.target.value;

        setFormDateEditar({
            ...formDateEditar,
            [e.target.name]: value,
        });
    }
    const handleSubmitForm = (e) => {
        e.preventDefault();
        var { nombre, estado, precio, detalle, categoria } = formDate;
        estado = !estado ? "No disponible" : "Disponible";

        if (!nombre.trim() || !precio || !detalle.trim() || !categoria) {
            Swal.fire({
                icon: 'error',
                title: 'Campos incompletos',
                text: 'Por favor completa todos los campos.',
            });
            return;
        }

        if (isNaN(parseFloat(precio))) {
            Swal.fire({
                icon: 'error',
                title: 'Precio inválido',
                text: 'El precio debe ser un número válido.',
            });
            return;
        }

        Swal.fire({
            icon: 'success',
            title: 'Menu agregado!',
            text: 'El menu ha sido agregado exitosamente.',
        });

        setFormDate({
            nombre: '',
            estado: '',
            precio: '',
            detalle: '',
            categoria: '',
        });

        guardarProductoDb(nombre, estado, precio, detalle, categoria);
        recargarPagina();
    };
    const handleSubmitFormUser = (e) => {
        e.preventDefault();
        var { name, email, estado, password, rol } = formDateUser;
        rol = rol ? rol.toLocaleLowerCase : "user";
        estado = estado ? estado.toLocaleLowerCase : "inactive";
        if (!name.trim() || !email.trim() || !password.trim()) {
            Swal.fire({
                icon: 'error',
                title: 'Campos incompletos',
                text: 'Por favor completa todos los campos.',
            });
            return;
        }

        Swal.fire({
            icon: 'success',
            title: 'Usuario agregado!',
            text: 'El Usuario ha sido agregado exitosamente.',
        });

        setFormDateUser({
            name: '',
            email: '',
            estado: '',
            password: '',
            rol: ''
        });
        console.log(estado);
        guardarUsuarioDb(name, email, estado, password, rol);
        recargarPagina()
    };
    const handleSubmitFormUserEditar = (e) => {
        e.preventDefault();
        var { _id, name, email, estado, rol } = formDateUserEditar;
        estado = estado ? "Activo" : "No Activo";
        if (!_id) {
            return Swal.fire({
                icon: 'error',
                title: 'No se encontro el Menu',
                text: 'Por favor contactese con el administrador.',
            });
        }
        estado = estado ? "Activo" : "No Activo";
        if (!name.trim() || !email.trim() || !rol) {
            Swal.fire({
                icon: 'error',
                title: 'Campos incompletos',
                text: 'Por favor completa todos los campos.',
            });
            return;
        }

        Swal.fire({
            icon: 'success',
            title: 'Usuario editado!',
            text: 'El Usuario ha sido editado exitosamente.',
        });

        setFormDateUser({
            name: '',
            email: '',
            estado: '',
            password: '',
            rol: ''
        });
        editarUsuarioDb(_id, name, email, estado, rol);
        recargarPagina();
    };
    const handleSubmitFormEditar = (e) => {
        e.preventDefault();
        var { _id, nombre, imagen, estado, precio, detalle, categoria } = formDateEditar;
        if (!_id) {
            return Swal.fire({
                icon: 'error',
                title: 'No se encontro el Menu',
                text: 'Por favor contactese con el administrador.',
            });
        }
        if (!nombre.trim() || !precio | !imagen || !detalle.trim() || !categoria) {
            return Swal.fire({
                icon: 'error',
                title: 'Campos incompletos',
                text: 'Por favor completa todos los campos.',
            });
        }

        if (isNaN(parseFloat(precio))) {
            return Swal.fire({
                icon: 'error',
                title: 'Precio inválido',
                text: 'El precio debe ser un número válido.',
            });
        }

        Swal.fire({
            icon: 'success',
            title: 'Menu Editado!',
            text: 'El menu ha sido editado exitosamente.',
        });

        setFormDate({
            nombre: '',
            estado: '',
            precio: '',
            detalle: '',
            categoria: '',
        });
        editarProductoDb(_id, nombre, imagen, estado, precio, detalle, categoria);
        recargarPagina();
    };



    const editarProductoDb = async (_id, nombre, imagen, estado, precio, detalle, categoria) => {
        try {
            const resp = await pruebaApi.put('/admin/editarMenu', {
                _id,
                nombre,
                imagen,
                estado,
                precio,
                detalle,
                categoria
            });
            console.log(resp);
        } catch (error) {
            console.log(error)
        }
    }
    const editarUsuarioDb = async (_id, name, email, estado, rol) => {

        try {
            const resp = await pruebaApi.put('/admin/editarUsuario', {
                _id,
                name,
                email,
                estado,
                rol
            });

            console.log(resp);
        } catch (error) {
            console.log(error)
        }
    }

    const guardarProductoDb = async (nombre, estado, precio, detalle, categoria) => {
        try {
            const resp = await pruebaApi.post('/admin/nuevoMenu', {
                nombre,
                estado,
                precio,
                detalle,
                categoria
            });
            console.log(resp);
        } catch (error) {
            console.log(error)
        }
    }
    const guardarUsuarioDb = async (name, email, estado, password, rol) => {
        try {
            const resp = await pruebaApi.post('/admin/nuevoUsuario', {
                name,
                email,
                estado,
                password,
                rol
            });
            console.log(resp);
        } catch (error) {
            console.log(error)
        }
    }

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
    const eliminarProductoClick = async (id) => {
        Swal.fire({
            icon: 'warning',
            title: '¿Estás seguro?',
            text: 'Esta acción eliminará el producto permanentemente.',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const resp = await pruebaApi.delete(`/admin/eliminarMenu/${id}`);
                    console.log(resp);
                    Swal.fire({
                        icon: 'success',
                        title: '¡Producto Eliminado!',
                        text: 'El producto ha sido eliminado exitosamente.',
                    });
                    recargarPagina();
                } catch (error) {
                    console.log(error);
                }
            }
        });
    }
    const editarProductoClick = async (menu) => {
        setFormDateEditar(menu);
        setIsModalOpenEditar(true);
    }

    const editarUsuarioClick = async (usuario) => {
        setFormDateUserEditar(usuario);
        setIsModalOpenUserEditar(true);
    }
    const eliminarUsuarioClick = async () => {
        console.log("hola")
    }
    const inactivarUsuarioClick = async () => {
        console.log("hola")
    }


    const recargarPagina = () => {
        setTimeout(() => {
            window.location.reload();
        }, 2000);
    }
    function capitalizeFirstLetter(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }


    useEffect(() => {
        cargarUserDB();
        cargarProductoDB();
    }, []);

    return (
        <>
            <Header></Header>
            {/* codigo para tablas  */}
            <div className="">
                <h1 className="text-center p-3">Admin Page</h1>

                {/* tabla para usuarios */}
                <h3>Usuarios</h3>
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>#ID</th>
                            <th>Nombre y apellido</th>
                            <th>Email</th>
                            <th>Estado</th>
                            <th>Rol</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    {cargarUsuarios.map((usuario) => {
                        return (
                            <tbody key={usuario._id}>
                                <tr>
                                    <td>{usuario._id}</td>
                                    <td>{usuario.name}</td>
                                    <td>{usuario.email}</td>
                                    <td>{capitalizeFirstLetter(usuario.estado)}</td>
                                    <td>{capitalizeFirstLetter(usuario.rol)}</td>
                                    <td>
                                        <button onClick={() => editarUsuarioClick(usuario)}
                                            title={"Editar"}
                                        >
                                            <i className="fa-solid fa-pen-to-square fa-lg"

                                                style={{ color: '#000000' }}></i>
                                        </button>
                                        <button onClick={() => eliminarUsuarioClick()}
                                            title={"Eliminar"}
                                        >
                                            <i className="fa-solid fa-trash fa-lg"
                                                style={{ color: '#c43131' }}></i>
                                        </button>
                                        <button onClick={() => inactivarUsuarioClick()}
                                            title={usuario.estado === "inactive" ? "Activar" : "Inactivar"}
                                        >
                                            <i className="fa-solid fa-unlock fa-lg"
                                                style={{ color: usuario.estado === "inactive" ? '#ff0000' : '#3f9240' }}>
                                            </i>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        )
                    }
                    )
                    }
                </Table>
                <div className="d-flex justify-content-end me-5">
                    <button
                        className="add-product-button border rounded-circle p-3 bg-dark "
                        onClick={() => setIsModalOpenUser(true)}
                    >
                        <FaPlus className="add-product-icon text-white" />
                    </button>
                </div>

                {/* tabla para menús */}
                <h3>Menus</h3>
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>imagen</th>
                            <th>#ID</th>
                            <th>Nombre</th>
                            <th>Estado</th>
                            <th>Precio</th>
                            <th>Detalle</th>
                            <th>Categoria</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    {cargarProducto.map((menu) => {
                        let pesoModif = menu.precio % 1 === 0 ? `$ ${menu.precio}.00` : `$ ${menu.precio.toFixed(2)}`;

                        return (
                            <tbody key={menu._id}>
                                <tr>
                                    <td>
                                        <img src={menu.imagen} alt={`Imagen de ${menu.nombre}`} className="custom-imagen" />
                                    </td><td>{menu._id}</td>
                                    <td>{menu.nombre}</td>
                                    <td>{menu.estado}</td>
                                    <td>{pesoModif}</td>
                                    <td>{menu.detalle}</td>
                                    <td>{menu.categoria}</td>
                                    <td>
                                        <button onClick={() => editarProductoClick(menu)}
                                        >
                                            <i className="fa-solid fa-pen-to-square fa-lg"

                                                style={{ color: '#000000' }}></i>
                                        </button>
                                        <button onClick={() => eliminarProductoClick(menu._id)}
                                        >
                                            <i className="fa-solid fa-trash fa-lg"
                                                style={{ color: '#c43131' }}></i>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        )
                    }
                    )
                    }
                </Table>
            </div>
            {/* Botón con icono "+" */}
            <div className="d-flex justify-content-end me-5">
                <button
                    className="add-product-button border rounded-circle p-3 bg-dark "
                    onClick={() => setFormDateUser(true)}
                >
                    <FaPlus className="add-product-icon text-white" />
                </button>
            </div>

            {/* Modal para agregar usuarios */}
            <AddUserModal
                isOpen={isModalOpenUser}
                setIsOpen={setIsModalOpenUser}
                onRequestClose={() => setIsModalOpenUser(false)}
                handleChangeFormUser={handleChangeFormUser}
                handleSubmitFormUser={handleSubmitFormUser}
                formDateUser={formDateUser}
            />
            {/* Modal para agregar menús */}
            <AddMenuModal isOpen={isModalOpen}
                setIsOpen={setIsModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                handleChangeForm={handleChangeForm}
                handleSubmitForm={handleSubmitForm}
                formDate={formDate}
            />

            {/* Modal para editar menús */}
            <EditMenuModal
                isOpen={isModalOpenEditar}
                setIsOpen={setIsModalOpenEditar}
                handleChangeFormEditar={handleChangeFormEditar}
                handleSubmitFormEditar={handleSubmitFormEditar}
                formDateEditar={formDateEditar}
            />
            {/* Modal para editar usuarios */}
            <EditUserModal
                isOpen={isModalOpenUserEditar}
                setIsOpen={setIsModalOpenUserEditar}
                handleChangeFormUserEditar={handleChangeFormUserEditar}
                handleSubmitFormUserEditar={handleSubmitFormUserEditar}
                formDateUserEditar={formDateUserEditar}
            />
        </>
    );
};

