import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import Table from 'react-bootstrap/Table';
import { FaPlus } from 'react-icons/fa';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import pruebaApi from '../../api/pruebaapi';
import Header from '../../home/components/Header';
import '../../auth/css/adminscreen.css';
import Swal from 'sweetalert2';



export const AdminScreen = () => {
    const [cargarUsuarios, setCargarUsuarios] = useState([]);
    const [cargarProducto, setCargarProducto] = useState([]);
    //se encarga de cerrar y abrir el modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpenEditar, setIsModalOpenEditar] = useState(false);
    //hook para almacenar los datos del formulario agregarProducto
    const [formDateEditar, setFormDateEditar] = useState({
        _id: '',
        nombre: '',
        estado: '',
        precio: '',
        detalle: '',
        categoria: ''
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
    const handleChangeFormEditar = (e) => {
        setFormDateEditar({
            ...formDateEditar,
            [e.target.name]: e.target.value,
        })
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
    const handleSubmitFormEditar = (e) => {
        e.preventDefault();
        var { _id, nombre, estado, precio, detalle, categoria } = formDateEditar;
        estado = !estado ? "No disponible" : "Disponible";
        if (!_id) {
            return Swal.fire({
                icon: 'error',
                title: 'No se encontro el Menu',
                text: 'Por favor contactese con el administrador.',
            });
        }
        if (!nombre.trim() || !precio || !detalle.trim() || !categoria) {
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
        console.log(formDateEditar)
        editarProductoDb(_id, nombre, estado, precio, detalle, categoria);
        recargarPagina();
    };



    const editarProductoDb = async (_id, nombre, estado, precio, detalle, categoria) => {
        try {
            const resp = await pruebaApi.put('/admin/editarMenu', {
                _id,
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

    const recargarPagina = () => {
        setTimeout(() => {
            window.location.reload();
        }, 2000);
    }


    useEffect(() => {
        cargarUserDB();
        cargarProductoDB();
    }, []);
    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };


    return (
        <>
            <Header></Header>
            <div className="">
                <h1 className="text-center p-3">Admin Page</h1>
                <h3>Usuarios</h3>
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>#ID</th>
                            <th>Nombre y apellido</th>
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
                    {cargarProducto.map((menu) => {
                        let pesoModif = menu.precio % 1 === 0 ? `$ ${menu.precio}.00` : `$ ${menu.precio.toFixed(2)}`;

                        return (
                            <tbody key={menu._id}>
                                <tr>
                                    <td>{menu._id}</td>
                                    <td>{menu.nombre}</td>
                                    <td>{menu.estado}</td>
                                    <td>{pesoModif}</td>
                                    <td>{menu.detalle}</td>
                                    <td>{menu.categoria}</td>
                                    <td>
                                        <button onClick={() => editarProductoClick(menu)}
                                        >
                                            <i className="fa-solid fa-pen-to-square"

                                                style={{ color: '#000000' }}></i>
                                        </button>
                                        <button onClick={() => eliminarProductoClick(menu._id)}
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
            </div>
            {/* Botón con icono "+" */}
            <div className="d-flex justify-content-end me-5">
                <button
                    className="add-product-button border rounded-circle p-3 bg-dark "
                    onClick={() => setIsModalOpen(true)}
                >
                    <FaPlus className="add-product-icon text-white" />
                </button>
            </div>


            {/* Modal para agregar menús */}
            <Modal isOpen={isModalOpen} style={customStyles} ariaHideApp={false} onRequestClose={() => setIsModalOpen(false)}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h2 className="modal-title">Agregar producto</h2>
                        <button type="button" className="btn-close m-3" onClick={() => setIsModalOpen(false)}></button>
                    </div>
                    <div className="modal-body">
                        <Form onSubmit={handleSubmitForm}>
                            <Form.Group className="mb-3" controlId="formBasicCategoria">
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="nombre"
                                    value={formDate.nombre}
                                    onChange={handleChangeForm}
                                    placeholder="Ingrese el nombre del producto"
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicCategoria">
                                <Form.Label>Precio</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="precio"
                                    value={formDate.precio}
                                    onChange={handleChangeForm}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicCategoria">
                                <Form.Label>Categoría</Form.Label>
                                <Form.Select
                                    name="categoria"
                                    value={formDate.categoria}
                                    onChange={handleChangeForm}
                                    style={{ width: '100%' }}
                                    required
                                >
                                    <option value="">Seleccionar</option>
                                    <option value="parrilla">Parrilla</option>
                                    <option value="empanadas">Empanadas</option>
                                    <option value="milanesas">Milanesas</option>
                                    <option value="pastas">Pastas</option>
                                    <option value="asado">Asado</option>
                                    <option value="pizzas">Pizzas</option>
                                    <option value="empanadas">Empanadas</option>
                                    <option value="comida criolla">Comida Criolla</option>
                                    <option value="mariscos">Mariscos</option>
                                    <option value="comida vegetariana">Comida Vegetariana</option>
                                    <option value="comida vegana">Comida Vegana</option>
                                    <option value="comida regional">Comida Regional</option>
                                    <option value="postres argentinos">Postres Argentinos</option>
                                    <option value="vinos argentinos">Vinos Argentinos</option>

                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicCategoria">

                                <Form.Check
                                    type="checkbox"
                                    name="estado"
                                    label="Disponible"
                                    checked={formDate.activo}
                                    onChange={handleChangeForm}

                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicCategoria">
                                <Form.Label>Detalle</Form.Label>
                                <textarea
                                    name="detalle"
                                    className="form-control"
                                    rows="3"
                                    value={formDate.detalle}
                                    onChange={handleChangeForm}
                                    required
                                ></textarea>
                            </Form.Group>
                            <div className="d-flex justify-content-end">
                                <Button type="submit" variant="success" className="custom-button" >
                                    Dar de alta
                                </Button>

                            </div>
                        </Form>
                    </div>
                </div >
            </Modal >

            {/* Modal para editar menus */}
            <Modal isOpen={isModalOpenEditar} style={customStyles} ariaHideApp={false} onRequestClose={() => setIsModalOpenEditar(false)}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h2 className="modal-title">Editar producto</h2>
                        <button type="button" className="btn-close m-3" onClick={() => setIsModalOpenEditar(false)}></button>
                    </div>
                    <div className="modal-body">
                        <Form onSubmit={handleSubmitFormEditar}>
                            <Form.Group className="mb-3" controlId="formBasicCategoria">
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="nombre"
                                    value={formDateEditar.nombre}
                                    onChange={handleChangeFormEditar}
                                    placeholder="Ingrese el nombre del producto"
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicCategoria">
                                <Form.Label>Precio</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="precio"
                                    value={formDateEditar.precio}
                                    onChange={handleChangeFormEditar}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicCategoria">
                                <Form.Label>Categoría</Form.Label>
                                <Form.Select
                                    name="categoria"
                                    value={formDateEditar.categoria}
                                    onChange={handleChangeFormEditar}
                                    style={{ width: '100%' }}
                                    required
                                >
                                    <option value="">Seleccionar</option>
                                    <option value="parrilla">Parrilla</option>
                                    <option value="empanadas">Empanadas</option>
                                    <option value="milanesas">Milanesas</option>
                                    <option value="pastas">Pastas</option>
                                    <option value="asado">Asado</option>
                                    <option value="pizzas">Pizzas</option>
                                    <option value="empanadas">Empanadas</option>
                                    <option value="comida criolla">Comida Criolla</option>
                                    <option value="mariscos">Mariscos</option>
                                    <option value="comida vegetariana">Comida Vegetariana</option>
                                    <option value="comida vegana">Comida Vegana</option>
                                    <option value="comida regional">Comida Regional</option>
                                    <option value="postres argentinos">Postres Argentinos</option>
                                    <option value="vinos argentinos">Vinos Argentinos</option>

                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicCategoria">

                                <Form.Check
                                    type="checkbox"
                                    name="estado"
                                    label="Disponible"
                                    checked={formDateEditar.activo}
                                    onChange={handleChangeFormEditar}

                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicCategoria">
                                <Form.Label>Detalle</Form.Label>
                                <textarea
                                    name="detalle"
                                    className="form-control"
                                    rows="3"
                                    value={formDateEditar.detalle}
                                    onChange={handleChangeFormEditar}
                                    required
                                ></textarea>
                            </Form.Group>
                            <div className="d-flex justify-content-end">
                                <Button type="submit" variant="success" className="custom-button" >
                                    Editar menú
                                </Button>

                            </div>
                        </Form>
                    </div>
                </div >
            </Modal >
        </>
    );
};

