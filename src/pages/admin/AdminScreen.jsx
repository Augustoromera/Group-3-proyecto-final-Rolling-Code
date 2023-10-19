import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { FaPlus } from 'react-icons/fa';
import pruebaApi from '../../api/pruebaApi';
import Header from '../../components/Header';
import '../styles/adminscreen.css';
import Swal from 'sweetalert2';
import EditMenuModal from '../../components/admin-components/EditMenuModal';
import AddUserModal from '../../components/admin-components/AddUserModal';
import AddMenuModal from '../../components/admin-components/AddMenuModal';
import EditUserModal from '../../components/admin-components/EditUserModal';
import { useAuth } from '../../context/AuthContext';
import { getAuthToken } from '../../api/auth';
import { Footer } from '../../components/Footer';


export const AdminScreen = () => {
    const { user } = useAuth();
    // Variables de estado
    const [cargarUsuarios, setCargarUsuarios] = useState([]);
    const [cargarPedidos, setCargarPedidos] = useState([]);
    const [cargarProducto, setCargarProducto] = useState([]);
    // Estados para controlear la apertura de los modales
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpenUser, setIsModalOpenUser] = useState(false);
    const [isModalOpenEditar, setIsModalOpenEditar] = useState(false);
    const [isModalOpenUserEditar, setIsModalOpenUserEditar] = useState(false);
    const [estadoCheckbox, setEstadoCheckbox] = useState(false);
    const [favoritoCheckbox, setFavoritoCheckbox] = useState(false);

    // Estados para almacenar los datos de los formularios de agregar/editar productos y usuarios
    const [formDateEditar, setFormDateEditar] = useState({
        nombre: '',
        estado: '',
        favorito: false,
        precio: '',
        detalle: '',
        imagen: '',
        categoria: ''
    });
    const [formDateUser, setFormDateUser] = useState({
        username: '',
        email: '',
        status: '',
        password: '',
        role: ''
    });
    const [formDateUserEditar, setFormDateUserEditar] = useState({
        _id: '',
        username: '',
        email: '',
        status: '',
        password: '',
        role: ''
    });
    const [formDate, setFormDate] = useState({
        nombre: '',
        estado: '',
        favorito: false,
        precio: '',
        detalle: '',
        imagen: '',
        categoria: ''
    });

    // Función para manejar cambios en los inputs de los formularios de agregar y editar (usuarios y menus)
    const handleChangeForm = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === "checkbox") {
            setFormDate({
                ...formDate,
                [name]: checked,
            });
        } else {
            setFormDate({
                ...formDate,
                [name]: value,
            });
        }
    };
    const handleChangeFormUser = (e) => {

        const value = e.target.type === "checkbox" ? (e.target.checked ? "active" : "inactive") : e.target.value;
        setFormDateUser({
            ...formDateUser,
            [e.target.name]: value,
        })

    }
    const handleChangeFormUserEditar = (e) => {
        const { value, type, checked } = e.target;
        if (type === "checkbox") {
            setFormDateUserEditar({
                ...formDateUserEditar,
                [e.target.name]: checked,
            })
        } else {
            // Si es otro tipo de elemento de entrada (por ejemplo, un campo de texto), actualiza el estado normalmente
            setFormDateUserEditar({
                ...formDateUserEditar,
                [e.target.name]: value,
            });
        }
        console.log(formDateUserEditar);
    }
    const handleChangeFormEditar = (e) => {
        const { value, type, checked } = e.target;
        // Si el elemento es un checkbox, actualiza el estado correspondiente según el nombre
        if (type === "checkbox") {
            setFormDate({
                ...formDateEditar,
                [e.target.name]: checked,
            });
        } else {
            // Si es otro tipo de elemento de entrada (por ejemplo, un campo de texto), actualiza el estado normalmente
            setFormDateEditar({
                ...formDateEditar,
                [e.target.name]: value,
            });
        }
    }

    // Función para manejar el envío del formulario de agregar menu/producto
    const handleSubmitForm = async (e) => {
        e.preventDefault();
        var { nombre, precio, detalle, categoria, imagen } = formDate;
        let estado = estadoCheckbox;
        let favorito = favoritoCheckbox;
        estado = !estado ? "No disponible" : "Disponible";
        favorito = favorito ? true : false;
        imagen = imagen ? imagen : '../assets/images/imagenDefault.png';

        if (!nombre.trim() || !precio || !detalle.trim() || !categoria) {
            Swal.fire({
                icon: 'error',
                title: 'Campos incompletos',
                text: 'Por favor completa todos los campos.',
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

        if (isNaN(parseFloat(precio))) {
            Swal.fire({
                icon: 'error',
                title: 'Precio inválido',
                text: 'El precio debe ser un número válido.',
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
        if (!comprobarImagenText(imagen)) {
            await Swal.fire({
                icon: 'warning',
                title: 'Se recomienda otro formato de imagen',
                text: 'Por motivos de seguridad, la imagen debería ser en base 64 (png o jpeg)',
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
        }

        Swal.fire({
            icon: 'success',
            title: 'Menu Editado!',
            text: 'El menu ha sido editado exitosamente.',
            background: 'black',
            color: 'white', customClass: {
                container: 'custom-swal-container',
                title: 'custom-swal-title',
                content: 'custom-swal-content',
                confirmButton: 'custom-swal-confirm-button',
                cancelButton: 'custom-swal-cancel-button',
            }, 
        });

        setFormDate({
            nombre: '',
            estado: '',
            precio: '',
            detalle: '',
            categoria: '',
        });
        guardarProductoDb(nombre, estado, favorito, precio, detalle, categoria, imagen);
        recargarPagina();
    };
    // Función para manejar el envío del formulario de agregar usuario
    const handleSubmitFormUser = (e) => {
        e.preventDefault();
        var { username, email, status, password, role } = formDateUser;
        //username=username.trim;
        const regexPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
        role = role ? role.toLowerCase() : "user";
        status = status ? status.toLowerCase() : "inactive";
        if (!username.trim() || !email.trim() || !password.trim()) {
            Swal.fire({
                icon: 'error',
                title: 'Campos incompletos',
                text: 'Por favor completa todos los campos.',
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
        if (!verificarFormatoEmail(email)) {
            Swal.fire({
                icon: 'error',
                title: 'Formato de correo incorrecto',
                text: 'Por favor ingresa un correo electrónico válido.', background: 'black',
                color: 'white',
                customClass: {
                    container: 'custom-swal-container',
                    title: 'custom-swal-title',
                    content: 'custom-swal-content',
                    confirmButton: 'custom-swal-confirm-button',
                    cancelButton: 'custom-swal-cancel-button',
                },
            });
            return
        }
        if (!regexPass.test(password)) {
            Swal.fire({
                icon: 'error',
                title: 'Formato de contraseña incorrecto',
                text: 'Debe contener al menos una mayuscula, minusculas y al menos 8 caracteres',
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
            return
        }


        Swal.fire({
            icon: 'success',
            title: 'Usuario agregado!',
            text: 'El Usuario ha sido agregado exitosamente.',
            background: 'black',
            color: 'white', customClass: {
                container: 'custom-swal-container',
                title: 'custom-swal-title',
                content: 'custom-swal-content',
                confirmButton: 'custom-swal-confirm-button',
                cancelButton: 'custom-swal-cancel-button',
            },
        });

        setFormDateUser({
            username: '',
            email: '',
            status: '',
            password: '',
            role: ''
        });
        guardarUsuarioDb(username, email, status, password, role);

        recargarPagina()
    };
    // Función para manejar el envío del formulario de editar usuario
    const handleSubmitFormUserEditar = async (e) => {
        e.preventDefault();
        var { _id, username, email, status, role } = formDateUserEditar;
        role = role ? role.toLowerCase() : "user";
        let statusModif = status ? "active" : "inactive";
        if (!_id) {
            return Swal.fire({
                icon: 'error',
                title: 'No se encontro el Menu',
                text: 'Por favor contactese con el administrador.',
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
        }
        if (!username.trim() || !email.trim() || !role) {
            Swal.fire({
                icon: 'error',
                title: 'Campos incompletos',
                text: 'Por favor completa todos los campos.',
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
        if (!verificarFormatoEmail(email)) {
            Swal.fire({
                icon: 'error',
                title: 'Formato de correo incorrecto',
                text: 'Por favor ingresa un correo electrónico válido.',
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
            return
        }

        Swal.fire({
            icon: 'success',
            title: 'Usuario editado!',
            text: 'El Usuario ha sido editado exitosamente.',
            background: 'black',
            color: 'white', customClass: {
                container: 'custom-swal-container',
                title: 'custom-swal-title',
                content: 'custom-swal-content',
                confirmButton: 'custom-swal-confirm-button',
                cancelButton: 'custom-swal-cancel-button',
            },
        });

        setFormDateUser({
            username: '',
            email: '',
            status: '',
            password: '',
            role: ''
        });
        editarUsuarioDb(_id, username, email, statusModif, role);
        recargarPagina();
    };
    // Función para manejar el envío del formulario de editar menu/producto
    const handleSubmitFormEditar = async (e) => {
        e.preventDefault();
        var { _id, nombre, imagen, precio, detalle, categoria } = formDateEditar;
        let estado = estadoCheckbox;
        let favorito = favoritoCheckbox;
        estado = !estado ? "No disponible" : "Disponible";
        favorito = !favorito ? false : true;
        imagen = imagen ? imagen : '../assets/images/imagenDefault.png';
        if (!_id) {
            return Swal.fire({
                icon: 'error',
                title: 'No se encontro el Menu',
                text: 'Por favor contactese con el administrador.',
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
        }
        if (!nombre.trim() || !precio | !imagen || !detalle.trim() || !categoria) {
            return Swal.fire({
                icon: 'error',
                title: 'Campos incompletos',
                text: 'Por favor completa todos los campos.',
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
        }

        if (isNaN(parseFloat(precio))) {
            return Swal.fire({
                icon: 'error',
                title: 'Precio inválido',
                text: 'El precio debe ser un número válido.',
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
        }
        if (!comprobarImagenText(imagen)) {
            await Swal.fire({
                icon: 'warning',
                title: 'Se recomienda otro formato de imagen',
                text: 'Por motivos de seguridad, la imagen debería ser en base 64 (png o jpeg)',
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
        }

        Swal.fire({
            icon: 'success',
            title: 'Menu Editado!',
            text: 'El menu ha sido editado exitosamente.',
            background: 'black',
            color: 'white', customClass: {
                container: 'custom-swal-container',
                title: 'custom-swal-title',
                content: 'custom-swal-content',
                confirmButton: 'custom-swal-confirm-button',
                cancelButton: 'custom-swal-cancel-button',
            },
        });

        setFormDate({
            nombre: '',
            estado: '',
            precio: '',
            detalle: '',
            categoria: '',
        });
        editarProductoDb(_id, nombre, imagen, estado, favorito, precio, detalle, categoria);
        recargarPagina();
    };



    // Funciones para interactuar con la API que permiten operaciones CRUD (Crear, Leer, Actualizar, Eliminar) 
    const editarProductoDb = async (_id, nombre, imagen, estado, favorito, precio, detalle, categoria) => {
        try {
            const resp = await pruebaApi.put('/api/admin-page/editarMenu', {
                _id,
                nombre,
                imagen,
                estado,
                precio,
                favorito,
                detalle,
                categoria,
            }, {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${getAuthToken()}`,
                    User: JSON.stringify(user),
                },
            });
            console.log(resp);
        } catch (error) {
            console.log(error)
        }
    }
    const editarUsuarioDb = async (_id, username, email, status, role) => {

        try {
            const resp = await pruebaApi.put('/api/admin-page/editarUsuario', {
                _id,
                username,
                email,
                status,
                role
            }, {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${getAuthToken()}`,
                    User: JSON.stringify(user),
                },
            });
            console.log(resp);
        } catch (error) {
            console.log(error)
        }
    }
    const editarPedidoDb = async (_id, status) => {

        try {
            const resp = await pruebaApi.put('/api/admin-page/completarPedido', {
                _id: _id,
                estado: status
            }, {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${getAuthToken()}`,
                    User: JSON.stringify(user),
                },
            });
            console.log(resp);
        } catch (error) {
            console.log(error)
        }
    }

    const guardarProductoDb = async (nombre, estado, favorito, precio, detalle, categoria, imagen) => {
        try {
            const resp = await pruebaApi.post('/api/admin-page/nuevoMenu', {
                nombre,
                estado,
                favorito,
                precio,
                detalle,
                categoria,
                imagen
            }, {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${getAuthToken()}`,
                    User: JSON.stringify(user),
                },
            });
            console.log(resp);
        } catch (error) {
            console.log(error)
        }
    }
    const guardarUsuarioDb = async (username, email, status, password, role) => {
        try {
            const resp = await pruebaApi.post('api/admin-page/nuevoUsuario', {
                username,
                email,
                status,
                password,
                role
            }, {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${getAuthToken()}`,
                    User: JSON.stringify(user),
                },
            });
            console.log(resp);
        } catch (error) {
            console.log(error)
        }
    }

    const cargarUserDB = async () => {
        try {
            const resp = await pruebaApi.get('/api/admin-page/listarUsuarios', {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${getAuthToken()}`,
                    User: JSON.stringify(user),
                },
            });
            setCargarUsuarios(resp.data.usuarios);
        } catch (error) {
            console.log(error);
        }
    };


    const cargarPedidosDB = async () => {
        try {
            const resp = await pruebaApi.get('/api/admin-page/listarPedido', {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${getAuthToken()}`,
                    User: JSON.stringify(user),
                },
            });
            setCargarPedidos(resp.data.pedidos);
        } catch (error) {
            console.log(error);
        }
    };
    const cargarProductoDB = async () => {
        try {
            const resp = await pruebaApi.get('/api/admin-page/listarMenu', {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${getAuthToken()}`,
                    User: JSON.stringify(user),
                },
            });
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
            background: 'black',
            color: 'white', customClass: {
                container: 'custom-swal-container',
                title: 'custom-swal-title',
                content: 'custom-swal-content',
                confirmButton: 'custom-swal-confirm-button',
                cancelButton: 'custom-swal-cancel-button',
            },
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const resp = await pruebaApi.delete(`/api/admin-page/eliminarMenu/${id}`, {
                        withCredentials: true,
                        headers: {
                            Authorization: `Bearer ${getAuthToken()}`,
                            User: JSON.stringify(user),
                        },
                    });
                    console.log(resp);
                    Swal.fire({
                        icon: 'success',
                        title: '¡Producto Eliminado!',
                        text: 'El producto ha sido eliminado exitosamente.',
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
    const destacarMenuClick = async (menu) => {
        let { _id, nombre, estado, favorito, precio, detalle, categoria, imagen } = menu;
        favorito = !favorito;
        if (!_id) {
            return Swal.fire({
                icon: 'error',
                title: 'No se encontró el Usuario',
                text: 'Por favor contacte al administrador.',
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
        }

        if (menu.favorito === false) {
            Swal.fire({
                icon: 'warning',
                title: '¿Mostrar en el home entre los 6 destacados?',
                text: 'Esta acción cambiará el estado del menú a favorito. Solo pueden haber 6 menús destacados; en caso de haber más, se mostrarán los 6 primeros menús destacados. En caso contrario, se mostrarán los primeros menús encontrados. Asegúrese de elegir productos disponibles.',
                showCancelButton: true,
                confirmButtonText: 'Sí, destacar',
                cancelButtonText: 'Cancelar',
                background: 'black',
                color: 'white',
                customClass: {
                    container: 'custom-swal-container',
                    title: 'custom-swal-title',
                    content: 'custom-swal-content',
                    confirmButton: 'custom-swal-confirm-button',
                    cancelButton: 'custom-swal-cancel-button',
                },
            }).then((result) => {
                if (result.isConfirmed) {
                    setFormDateEditar({
                        _id: '',
                        nombre: '',
                        estado: '',
                        favorito: '',
                        precio: '',
                        detalle: '',
                        categoria: '',
                        imagen: '',
                    });
                    editarProductoDb(_id, nombre, imagen, estado, favorito, precio, detalle, categoria);
                    recargarPagina();
                }
            });
        } else {
            Swal.fire({
                icon: 'warning',
                title: '¿Quitar del menú home destacado?',
                text: 'Esta acción cambiará el estado del menú a no favorito. Ya no se mostrará en el menú home destacado.',
                showCancelButton: true,
                confirmButtonText: 'Sí, quitar destacado',
                cancelButtonText: 'Cancelar',
                background: 'black',
                color: 'white',
                customClass: {
                    container: 'custom-swal-container',
                    title: 'custom-swal-title',
                    content: 'custom-swal-content',
                    confirmButton: 'custom-swal-confirm-button',
                    cancelButton: 'custom-swal-cancel-button',
                },
            }).then((result) => {
                if (result.isConfirmed) {
                    setFormDateEditar({
                        _id: '',
                        nombre: '',
                        estado: '',
                        favorito: '',
                        precio: '',
                        detalle: '',
                        categoria: '',
                        imagen: '',
                    });
                    editarProductoDb(_id, nombre, imagen, estado, favorito, precio, detalle, categoria);
                    recargarPagina();
                }
            });
        }
    };


    const editarUsuarioClick = async (usuario) => {
        setFormDateUserEditar(usuario);
        setIsModalOpenUserEditar(true);
    }
    const eliminarUsuarioClick = async (id) => {
        Swal.fire({
            icon: 'warning',
            title: '¿Estás seguro?',
            text: 'Esta acción eliminará el usuario permanentemente.',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
            background: 'black',
            color: 'white', customClass: {
                container: 'custom-swal-container',
                title: 'custom-swal-title',
                content: 'custom-swal-content',
                confirmButton: 'custom-swal-confirm-button',
                cancelButton: 'custom-swal-cancel-button',
            },
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const resp = await pruebaApi.delete(`/api/admin-page/eliminarUsuario/${id}`, {
                        withCredentials: true,
                        headers: {
                            Authorization: `Bearer ${getAuthToken()}`,
                            User: JSON.stringify(user),
                        },
                    });
                    console.log(resp);
                    Swal.fire({
                        icon: 'success',
                        title: '¡Usuario Eliminado!',
                        text: 'El usuario ha sido eliminado exitosamente.',
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
                    recargarPagina();
                } catch (error) {
                    console.log(error);
                }
            }
        });
    }


    const inactivarUsuarioClick = async (usuario) => {
        const { _id, username, email, status, role } = usuario;
        const lowerCaserole = role ? role.toLowerCase() : "user";
        const lowerCasestatus = status ? status.toLowerCase() : "inactive";
        const newstatus = lowerCasestatus === "active" ? "inactive" : "active";

        if (!_id) {
            return Swal.fire({
                icon: 'error',
                title: 'No se encontró el Usuario',
                text: 'Por favor contacte al administrador.',
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
        }

        Swal.fire({
            icon: 'warning',
            title: '¿Estás seguro?',
            text: 'Esta acción cambiará el estado del usuario, luego podrá modificarlo.',
            showCancelButton: true,
            confirmButtonText: 'Sí, cambiar',
            cancelButtonText: 'Cancelar',
            background: 'black',
            color: 'white', customClass: {
                container: 'custom-swal-container',
                title: 'custom-swal-title',
                content: 'custom-swal-content',
                confirmButton: 'custom-swal-confirm-button',
                cancelButton: 'custom-swal-cancel-button',
            },
        }).then((result) => {
            if (result.isConfirmed) {
                setFormDateUser({
                    username: '',
                    email: '',
                    status: '',
                    password: '',
                    role: ''
                });
                editarUsuarioDb(_id, username, email, newstatus, lowerCaserole);
                recargarPagina();
            }
        });
    };
    const cambiarEstadoCick = async (pedido) => {
        const { _id, estado } = pedido;
        const lowerCasestatus = estado ? estado.toLowerCase() : "completado";
        const newstatus = lowerCasestatus === "pendiente" ? "completado" : "pendiente";

        if (!_id) {
            return Swal.fire({
                icon: 'error',
                title: 'No se encontró el Usuario',
                text: 'Por favor contacte al administrador.',
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
        }

        Swal.fire({
            icon: 'warning',
            title: '¿Estás seguro?',
            text: 'Esta acción cambiará el estado del pedido, luego podrá modificarlo.',
            showCancelButton: true,
            confirmButtonText: 'Sí, cambiar',
            cancelButtonText: 'Cancelar',
            background: 'black',
            color: 'white', customClass: {
                container: 'custom-swal-container',
                title: 'custom-swal-title',
                content: 'custom-swal-content',
                confirmButton: 'custom-swal-confirm-button',
                cancelButton: 'custom-swal-cancel-button',
            },
        }).then((result) => {
            if (result.isConfirmed) {
                editarPedidoDb(_id, newstatus);
                recargarPagina();
            }
        });
    };


    //funcion para recargar pagina
    const recargarPagina = () => {
        setTimeout(() => {
            window.location.reload();
        }, 2000);
    }
    //funcion para capitalizar la primera letra a mayuscula
    function capitalizeFirstLetter(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    // Verificar formato de correo electrónico utilizando una expresión regular
    function verificarFormatoEmail(email) {
        // eslint-disable-next-line no-useless-escape
        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        if (!emailRegex.test(email)) {
            return false;

        }
        return true;
    }
    function comprobarImagenText(image) {
        if (/^data:image\/(jpeg|png);base64,/.test(image)) {
            return true;
        }
        return false;
    }





    // Cargar datos iniciales al montar el componente
    useEffect(() => {
        // Cargar usuarios desde la base de datos
        cargarUserDB();

        // Cargar productos desde la base de datos
        cargarProductoDB();

        // Cargar pedidos desde la base de datos
        cargarPedidosDB();

    }, []);
    useEffect(() => {
        // Aquí actualizas `formDate` con el nuevo valor de `estadoCheckbox`
        setFormDateEditar((prevFormDate) => ({
            ...prevFormDate,
            estado: estadoCheckbox ? 'Disponible' : 'No disponible',
        }));
        setFormDateEditar((prevFormDate) => ({
            ...prevFormDate,
            favorito: favoritoCheckbox ? false : true,
        }));
    }, [estadoCheckbox, favoritoCheckbox]);
    //renderizado de componentes y elementos de la interfaz
    return (
        <>
            <Header></Header>
            {/* codigo para tablas  */}
            <div className="pt-5">
                <div className="text-center mt-4 p-5">
                    <h1>Bienvenido al Panel de Administración</h1>
                    <p>¡Aquí puedes gestionar usuarios, productos y pedidos de manera fácil y eficiente!</p>
                </div>


                <div className="table-container">
                    {/* Tabla para usuarios */}
                    <h3>Usuarios</h3>
                    <div className="table-responsive">
                        <Table className="custom-table" striped bordered hover variant="dark">
                            <thead>
                                <tr>
                                    <th>#ID</th>
                                    <th>Nombre y apellido</th>
                                    <th>Email</th>
                                    <th>Estado</th>
                                    <th>role</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            {cargarUsuarios.map((usuario) => {
                                return (
                                    <tbody key={usuario._id}>
                                        <tr>
                                            <td>{usuario._id}</td>
                                            <td>{usuario.username}</td>
                                            <td>{usuario.email}</td>
                                            <td>{capitalizeFirstLetter(usuario.status)}</td>
                                            <td>{capitalizeFirstLetter(usuario.role)}</td>
                                            <td>
                                                <button onClick={() => editarUsuarioClick(usuario)}
                                                    title={"Editar usuario"}
                                                >
                                                    <i className="fa-solid fa-pen-to-square fa-lg"
                                                        style={{ color: '#000000' }}></i>
                                                </button>
                                                <button onClick={() => eliminarUsuarioClick(usuario._id)}
                                                    title={"Eliminar usuario"}
                                                >
                                                    <i className="fa-solid fa-trash fa-lg"
                                                        style={{ color: '#c43131' }}></i>
                                                </button>
                                                <button onClick={() => inactivarUsuarioClick(usuario)}
                                                    title={usuario.status === "inactive" ? "Activar usuario" : "Inactivar usuario"}
                                                >
                                                    <i className="fa-solid fa-unlock fa-lg"
                                                        style={{ color: usuario.status === "inactive" ? '#ff0000' : '#3f9240' }}>
                                                    </i>
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                );
                            })}
                        </Table>
                    </div>
                </div>



                {/* Boton para agregar usuarios */}
                <div className="d-flex justify-content-end me-5">
                    <button
                        className="add-product-button border rounded-circle p-3 bg-dark "
                        onClick={() => setIsModalOpenUser(true)}
                        title='Agregar Usuario'
                    >
                        <FaPlus className="add-product-icon text-white" />
                    </button>
                </div>

                <div className="table-container">
                    {/* Tabla para menús */}
                    <h3>Menús</h3>
                    <div className="table-responsive">
                        <Table className="custom-table" striped bordered hover variant="dark">
                            <thead>
                                <tr>
                                    <th>Imagen</th>
                                    <th>#ID</th>
                                    <th>Nombre</th>
                                    <th>Estado</th>
                                    <th>Precio</th>
                                    <th>Detalle</th>
                                    <th>Categoría</th>
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
                                            </td>
                                            <td>{menu._id}</td>
                                            <td>{menu.nombre}</td>
                                            <td>{menu.estado}</td>
                                            <td>{pesoModif}</td>
                                            <td>{menu.detalle}</td>
                                            <td>{menu.categoria}</td>
                                            <td className='align-middle' >
                                                <button className='m-1' onClick={() => editarProductoClick(menu)}
                                                    title='Editar menú'
                                                >
                                                    <i className="fa-solid fa-pen-to-square fa-lg"
                                                        style={{ color: '#000000' }}></i>
                                                </button>
                                                <button className='m-1' onClick={() => eliminarProductoClick(menu._id)}
                                                    title='Eliminar menú'
                                                >
                                                    <i className="fa-solid fa-trash fa-lg"
                                                        style={{ color: '#c43131' }}></i>
                                                </button>
                                                <button className='m-1' onClick={() => destacarMenuClick(menu)}
                                                    title={menu.favorito ? "Mostrar en el inicio" : "No mostrar en el inicio"}
                                                >
                                                    <i className="fa-solid fa-star fa-lg "
                                                        style={{ color: menu.favorito ? '#3f9240' : '#ff0000' }}>
                                                    </i>
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                );
                            })}
                        </Table>
                    </div>
                </div>

                {/* Botón con icono "+" */}
                <div className="d-flex justify-content-end me-5">
                    <button
                        className="add-product-button border rounded-circle p-3 bg-dark "
                        onClick={() => setIsModalOpen(true)}
                        title='Agregar menu'
                    >
                        <FaPlus className="add-product-icon text-white" />
                    </button>
                </div>
                <div className="table-container">
                    {/* Tabla para pedidos */}
                    <h3>Pedidos</h3>
                    <div className="table-responsive">
                        <Table className="custom-table" striped bordered hover variant="dark">
                            <thead>
                                <tr>
                                    <th>#ID</th>
                                    <th>Usuario</th>
                                    <th>Fecha</th>
                                    <th>Menús Agregados</th>
                                    <th>Estado</th>
                                    <th>Total</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            {cargarPedidos.map((pedido) => {
                                let pesoModif = pedido.importeTotal % 1 === 0 ? `$ ${pedido.importeTotal}.00` : `$ ${pedido.importeTotal.toFixed(2)}`;
                                return (
                                    <tbody key={pedido._id}>
                                        <tr>
                                            <td>{pedido._id}</td>
                                            <td>
                                                {cargarUsuarios.find(usuario => usuario._id === pedido.usuario)?.username || "Usuario con ese ID no encontrado"}
                                            </td>
                                            <td>
                                                {new Intl.DateTimeFormat('es-AR', {
                                                    timeZone: 'America/Argentina/Buenos_Aires',
                                                    year: 'numeric',
                                                    month: '2-digit',
                                                    day: '2-digit',
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                    second: '2-digit'
                                                }).format(new Date(pedido.fecha))}
                                            </td>
                                            <td>
                                                <ul>
                                                    {pedido.menus.map((menuId) => {
                                                        const menuEncontrado = cargarProducto.find(menu => menu._id === menuId);
                                                        return (
                                                            <li key={menuId}>{menuEncontrado ? menuEncontrado.nombre : "Menú no encontrado"}</li>
                                                        );
                                                    })}
                                                </ul>
                                            </td>
                                            <td>
                                                {pedido.estado}
                                            </td>
                                            <td>{pesoModif}</td>
                                            <td>
                                                <button onClick={() => cambiarEstadoCick(pedido)}
                                                    title={pedido.estado === "pendiente" ? "Cambiar a pedido" : "Cambiar a pendiente"}>
                                                    <i
                                                        className={`fa-solid ${pedido.estado === "pendiente" ? 'fa-circle-xmark fa-xl' : 'fa-circle-check fa-xl'}`}
                                                        style={{ color: pedido.estado === "pendiente" ? '#ff0000' : '#3f9240' }}
                                                    ></i>
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                );
                            })}
                        </Table>
                    </div>
                </div>

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
                setEstadoCheckbox={setEstadoCheckbox}
                setFavoritoCheckbox={setFavoritoCheckbox}
            />

            {/* Modal para editar menús */}
            <EditMenuModal
                isOpen={isModalOpenEditar}
                setIsOpen={setIsModalOpenEditar}
                formDateEditar={formDateEditar}
                handleChangeFormEditar={handleChangeFormEditar}
                handleSubmitFormEditar={handleSubmitFormEditar}
                estadoCheckbox={estadoCheckbox}
                setEstadoCheckbox={setEstadoCheckbox}
                favoritoCheckbox={favoritoCheckbox}
                setFavoritoCheckbox={setFavoritoCheckbox}
            />
            {/* Modal para editar usuarios */}
            <EditUserModal
                isOpen={isModalOpenUserEditar}
                setIsOpen={setIsModalOpenUserEditar}
                handleChangeFormUserEditar={handleChangeFormUserEditar}
                handleSubmitFormUserEditar={handleSubmitFormUserEditar}
                formDateUserEditar={formDateUserEditar}
            />
            <Footer></Footer>
        </>
    );
};

