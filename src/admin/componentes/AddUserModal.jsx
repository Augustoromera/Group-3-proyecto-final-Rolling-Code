/* eslint-disable react/prop-types */
// AddMenuModal.js
import React from 'react';
import Modal from 'react-modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
// eslint-disable-next-line react/prop-types
const AddUserModal = ({ isOpen, setIsOpen, onRequestClose, handleChangeFormUser, handleSubmitFormUser, formDateUser }) => {
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
        <Modal isOpen={isOpen} ariaHideApp={false} style={customStyles} onRequestClose={onRequestClose}>
            <div className="modal-content">
                <div className="modal-header">
                    <h2 className="modal-title">Agregar un usuario</h2>
                    <button type="button" className="btn-close m-3" onClick={() => setIsOpen(false)}></button>
                </div>
                <div className="modal-body">
                    <Form onSubmit={handleSubmitFormUser}>
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={formDateUser.name}
                                onChange={handleChangeFormUser}
                                minLength="3"
                                maxLength="40"
                                pattern="[A-Za-z\s]+"
                                placeholder="Ingrese el nombre completo"
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={formDateUser.email}
                                onChange={handleChangeFormUser}
                                placeholder="Ingrese el email"
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                minLength="8"
                                maxLength="12"
                                value={formDateUser.password}
                                placeholder="Ingrese la contraseña"
                                onChange={handleChangeFormUser}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicRol">
                            <Form.Label></Form.Label>
                            <Form.Select
                                name="rol"
                                value={formDateUser.rol}
                                onChange={handleChangeFormUser}
                                style={{ width: '100%' }}
                            >
                                <option value="">Seleccionar Rol</option>
                                <option value="admin">Administrador</option>
                                <option value="user" >Usuario</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEstado">
                            <Form.Check
                                type="checkbox"
                                name="estado"
                                label="Activo"
                                checked={formDateUser.estado === "Activo"}
                                onChange={handleChangeFormUser}
                            />
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
    );
};

export default AddUserModal;
